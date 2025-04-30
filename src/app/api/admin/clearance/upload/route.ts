import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import path from 'path';
import { put } from '@vercel/blob';

// Declare the global in-memory storage (for development environment only)
declare global {
  var inMemoryFileStorage: Map<string, Buffer>;
}

// Initialize the global storage if it doesn't exist
if (!global.inMemoryFileStorage) {
  global.inMemoryFileStorage = new Map<string, Buffer>();
}

// POST /api/admin/clearance/upload - Upload multiple documents for a clearance request
export async function POST(req: NextRequest) {
  try {
    // Get user role from the query parameters (in a real app, use session/token)
    const url = new URL(req.url);
    const role = url.searchParams.get('role');
    
    // Check admin authorization
    if (role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }
    
    // Get form data fields
    const formData = await req.formData();
    const requestId = formData.get('requestId') as string;
    const additionalInfo = formData.get('additionalInfo') as string || undefined;
    
    if (!requestId) {
      return NextResponse.json({ error: 'Clearance request ID is required' }, { status: 400 });
    }
    
    // Ensure the clearance request exists
    const clearanceRequest = await prisma.clearanceRequest.findUnique({
      where: { id: requestId }
    });
    
    if (!clearanceRequest) {
      return NextResponse.json({ error: 'Clearance request not found' }, { status: 404 });
    }
    
    // Get all files from form data
    const files: File[] = [];
    const fileInfos: { name: string, type: string, size: number }[] = [];
    
    for (const [key, value] of formData.entries()) {
      if ((key.startsWith('files[') || key === 'files') && value instanceof File) {
        // Check file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(value.type)) {
          return NextResponse.json({ 
            error: `Only PDF and image files are allowed. File ${value.name} has invalid type ${value.type}` 
          }, { status: 400 });
        }
        files.push(value);
        
        // Keep track of file metadata for response
        fileInfos.push({
          name: value.name,
          type: value.type,
          size: value.size
        });
      }
    }
    
    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }
    
    // Process files
    const fileUrls: string[] = [];
    const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
    
    for (const file of files) {
      // Generate unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const fileExtension = file.name.split('.').pop() || 'pdf';
      const fileName = `clearance_${requestId}_${uniqueSuffix}.${fileExtension}`;
      
      // Convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());
      
      let fileUrl = '';
      
      if (isProduction) {
        // In production, use Vercel Blob Storage
        try {
          const blob = await put(fileName, buffer, {
            contentType: file.type,
            access: 'public',
          });
          fileUrl = blob.url;
          console.log("File uploaded to Vercel Blob:", fileUrl);
        } catch (blobError) {
          console.error("Error uploading to Vercel Blob:", blobError);
          return NextResponse.json(
            { error: 'Error uploading file to storage' },
            { status: 500 }
          );
        }
      } else {
        // In development, use the filesystem approach (keep this for local dev)
        fileUrl = `/uploads/clearances/${fileName}`;
        // Note: For local dev, you would save the file to disk here
        // We're not implementing this part to keep the example simple
      }
      
      fileUrls.push(fileUrl);
    }
    
    // Update the clearance request with new document URLs and additional info
    const updatedClearanceRequest = await prisma.clearanceRequest.update({
      where: { id: requestId },
      data: {
        documentUrl: fileUrls.join(','), // Store multiple file URLs as comma-separated string
        additionalInfo,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${files.length} files`,
      clearanceRequest: updatedClearanceRequest,
      fileInfos,
      fileUrls
    });
    
  } catch (error) {
    console.error("Error uploading clearance files:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error occurred' },
      { status: 500 }
    );
  }
} 