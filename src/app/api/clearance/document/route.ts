import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// POST /api/clearance/document - Upload document for a clearance request
export async function POST(req: NextRequest) {
  try {
    // Check for admin privileges (can be modified based on your auth system)
    const url = new URL(req.url);
    const role = url.searchParams.get('role');
    
    if (role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const requestId = formData.get('requestId') as string;
    const status = formData.get('status') as string;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    if (!requestId) {
      return NextResponse.json({ error: 'Clearance request ID is required' }, { status: 400 });
    }
    
    if (!status || !['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return NextResponse.json({ error: 'Valid status is required (APPROVED, REJECTED, PENDING)' }, { status: 400 });
    }
    
    // Ensure the clearance request exists
    const clearanceRequest = await prisma.clearanceRequest.findUnique({
      where: { id: requestId }
    });
    
    if (!clearanceRequest) {
      return NextResponse.json({ error: 'Clearance request not found' }, { status: 404 });
    }
    
    // Check file type
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Only PDF and image files are allowed' }, { status: 400 });
    }
    
    // Create directory if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'clearance');
    
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }
    
    // Generate unique filename
    const fileExtension = file.name.split('.').pop() || 'pdf';
    const fileName = `clearance_${requestId}_${Date.now()}.${fileExtension}`;
    const filePath = path.join(uploadDir, fileName);
    
    // Save file
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, buffer);
    
    // Update the clearance request with document URL and status
    const publicUrl = `/uploads/clearance/${fileName}`;
    
    const updatedRequest = await prisma.clearanceRequest.update({
      where: { id: requestId },
      data: {
        documentUrl: publicUrl,
        status,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({
      success: true,
      clearanceRequest: updatedRequest
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error uploading clearance document:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 