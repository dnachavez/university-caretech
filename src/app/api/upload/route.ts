import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

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
    
    // Create directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'forms');
    
    if (!existsSync(uploadDir)) {
      console.log("Creating upload directory:", uploadDir);
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Generate unique filename
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExt = file.name.split('.').pop() || getExtensionFromMimeType(file.type);
    const fileName = `${uniqueSuffix}.${fileExt}`;
    const filePath = path.join(uploadDir, fileName);
    
    console.log("Saving file as:", fileName);
    
    try {
      // Write file to disk
      const buffer = Buffer.from(await file.arrayBuffer());
      
      if (buffer.length === 0) {
        console.error("Empty file buffer");
        return NextResponse.json({ success: false, message: 'Empty file data' }, { status: 400 });
      }
      
      console.log("File buffer size:", buffer.length, "bytes");
      await writeFile(filePath, buffer);
      
      // Return the public URL
      const fileUrl = `/uploads/forms/${fileName}`;
      
      console.log("File uploaded successfully:", fileUrl);
      return NextResponse.json({ 
        success: true, 
        message: 'File uploaded successfully',
        fileUrl
      });
    } catch (writeError) {
      console.error("Error writing file:", writeError);
      return NextResponse.json(
        { success: false, message: 'Error writing file to disk' },
        { status: 500 }
      );
    }
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