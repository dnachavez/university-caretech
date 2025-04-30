import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

// Declare the global in-memory storage (we'll still use this for development)
declare global {
  var inMemoryFileStorage: Map<string, Buffer>;
}

// Initialize the global storage if it doesn't exist
// Using global allows it to persist between serverless function invocations
if (!global.inMemoryFileStorage) {
  global.inMemoryFileStorage = new Map<string, Buffer>();
}

export async function POST(request: NextRequest) {
  try {
    console.log("Upload API endpoint called");
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      console.error("No file found in form data");
      return NextResponse.json({ success: false, message: 'No file uploaded' }, { status: 400 });
    }
    
    console.log("Received file:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    
    if (!allowedTypes.includes(file.type)) {
      console.error("File type not allowed:", file.type);
      return NextResponse.json(
        { success: false, message: 'Only images, PDF, and document files are allowed' },
        { status: 400 }
      );
    }
    
    // Generate unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExt = file.name.split('.').pop() || getExtensionFromMimeType(file.type);
    const fileName = `${uniqueSuffix}.${fileExt}`;
    
    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());
    
    if (buffer.length === 0) {
      console.error("Empty file buffer");
      return NextResponse.json({ success: false, message: 'Empty file data' }, { status: 400 });
    }
    
    console.log("File buffer size:", buffer.length, "bytes");
    
    // Check if we're in production (Vercel)
    const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
    let fileUrl = '';
    
    if (isProduction) {
      // In production, use Vercel Blob Storage
      console.log("Using Vercel Blob Storage (production environment)");
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
          { success: false, message: 'Error uploading file to storage' },
          { status: 500 }
        );
      }
    } else {
      // In development, store on filesystem
      console.log("Using filesystem storage (development environment)");
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'forms');
      
      if (!existsSync(uploadDir)) {
        console.log("Creating upload directory:", uploadDir);
        await mkdir(uploadDir, { recursive: true });
      }
      
      const filePath = path.join(uploadDir, fileName);
      await writeFile(filePath, buffer);
      fileUrl = `/uploads/forms/${fileName}`;
    }
    
    console.log("File uploaded successfully:", fileUrl);
    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully',
      fileUrl
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { success: false, message: 'Error uploading file' },
      { status: 500 }
    );
  }
}

// Helper function to get file extension from MIME type
function getExtensionFromMimeType(mimeType: string): string {
  const mimeToExtension: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
  };
  
  return mimeToExtension[mimeType] || 'jpg';
} 