import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

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
    
    // Create directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'clearances');
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Get all files from form data
    const files: File[] = [];
    
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
      }
    }
    
    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 });
    }
    
    // Process each file and store their public URLs
    const fileUrls: string[] = [];
    
    for (const file of files) {
      // Generate unique filename
      const fileExtension = file.name.split('.').pop() || 'pdf';
      const fileName = `clearance_${requestId}_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;
      const filePath = path.join(uploadDir, fileName);
      
      // Save file
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      
      // Record the public URL
      const publicUrl = `/uploads/clearances/${fileName}`;
      fileUrls.push(publicUrl);
    }
    
    // Create a comma-separated string of document URLs or append to existing
    let documentUrl = clearanceRequest.documentUrl || '';
    
    if (documentUrl && fileUrls.length > 0) {
      documentUrl += ',' + fileUrls.join(',');
    } else if (fileUrls.length > 0) {
      documentUrl = fileUrls.join(',');
    }
    
    // Update the clearance request with document URLs and status
    const updatedRequest = await prisma.clearanceRequest.update({
      where: { id: requestId },
      data: {
        documentUrl: documentUrl,
        status: 'APPROVED', // Automatically set to approved upon document upload
        additionalInfo: additionalInfo || undefined,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({
      success: true,
      clearanceRequest: updatedRequest,
      uploadedFiles: fileUrls
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error uploading clearance documents:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 