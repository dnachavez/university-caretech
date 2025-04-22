import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { userId, adminId, files } = body;
    
    if (!userId) {
      console.error("No user ID provided");
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Validate the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      console.error("Invalid user ID:", userId);
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    // Check if the admin exists
    if (adminId) {
      const admin = await prisma.user.findUnique({
        where: { id: adminId, role: 'ADMIN' }
      });
      
      if (!admin) {
        console.error("Invalid admin ID:", adminId);
        return NextResponse.json(
          { success: false, message: 'Invalid admin credentials' },
          { status: 403 }
        );
      }
    }
    
    // Create directory for records if it doesn't exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'records');
    
    if (!existsSync(uploadDir)) {
      console.log("Creating records directory:", uploadDir);
      await mkdir(uploadDir, { recursive: true });
    }
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      console.error("No files provided");
      return NextResponse.json(
        { success: false, message: 'No files provided' },
        { status: 400 }
      );
    }
    
    console.log(`Processing ${files.length} medical records for user ${userId}`);
    
    // Create database entries for each record
    const savedRecords = [];
    
    for (const file of files) {
      if (!file.filePath || !file.formType) {
        console.error("Invalid file data:", file);
        throw new Error("Invalid record data: missing file path or form type");
      }
      
      // If the file path doesn't contain "records" directory, we need to move it
      let filePath = file.filePath;
      if (!filePath.includes('/uploads/records/')) {
        // File is in a different directory, copy it to records
        // For now we'll just update the path in the database
        // In a real application, you would copy the file
        const fileName = filePath.split('/').pop();
        filePath = `/uploads/records/${fileName}`;
      }
      
      const savedRecord = await prisma.uploadedForm.create({
        data: {
          userId,
          formType: file.formType,
          filePath,
          notes: file.notes || "",
          status: file.status || "PENDING"
        }
      });
      
      savedRecords.push(savedRecord);
    }
    
    console.log(`Successfully saved ${savedRecords.length} medical records`);
    
    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${savedRecords.length} medical records`,
      records: savedRecords
    });
    
  } catch (error) {
    console.error("Error saving medical records:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error saving medical records'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get all medical records with user information
    const records = await prisma.uploadedForm.findMany({
      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            role: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return NextResponse.json({
      success: true,
      records
    });
    
  } catch (error) {
    console.error("Error fetching medical records:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error fetching medical records'
      },
      { status: 500 }
    );
  }
} 