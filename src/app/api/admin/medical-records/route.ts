import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import path from 'path';

// NOTE: File system operations are removed as they're not compatible with Vercel production

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
      
      // Use the original filePath as is - no need to modify for Vercel Blob URLs
      // Vercel Blob URLs are already properly formatted for direct access
      const filePath = file.filePath;
      
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