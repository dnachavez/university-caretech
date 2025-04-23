import { NextRequest, NextResponse } from 'next/server';

// Reference to the in-memory storage from the upload route
// This is a simplified approach - in a real app you might use Redis or another shared storage
declare global {
  var inMemoryFileStorage: Map<string, Buffer>;
}

// Initialize the global storage if it doesn't exist
// Using global allows it to persist between serverless function invocations
if (!global.inMemoryFileStorage) {
  global.inMemoryFileStorage = new Map<string, Buffer>();
}

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const filename = params.filename;
    
    if (!filename) {
      return new NextResponse('Filename is required', { status: 400 });
    }
    
    console.log("Trying to serve file:", filename);
    
    // Get file from in-memory storage
    const fileData = global.inMemoryFileStorage.get(filename);
    
    if (!fileData) {
      console.error("File not found in memory:", filename);
      return new NextResponse('File not found', { status: 404 });
    }
    
    // Determine content type based on file extension
    const contentType = getContentTypeFromFilename(filename);
    
    // Return the file
    return new NextResponse(fileData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error("Error serving file:", error);
    return new NextResponse('Error serving file', { status: 500 });
  }
}

function getContentTypeFromFilename(filename: string): string {
  const extension = filename.split('.').pop()?.toLowerCase() || '';
  
  const contentTypes: Record<string, string> = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  };
  
  return contentTypes[extension] || 'application/octet-stream';
} 