import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import path from 'path';
import fs from 'fs';

interface RouteParams {
  params: {
    id: string
  }
}

// Update a medical record
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Record ID is required' },
        { status: 400 }
      );
    }
    
    // Get the record to make sure it exists
    const record = await prisma.uploadedForm.findUnique({
      where: { id }
    });
    
    if (!record) {
      return NextResponse.json(
        { success: false, message: 'Record not found' },
        { status: 404 }
      );
    }
    
    // Get the update data
    const body = await request.json();
    const { status, notes } = body;
    
    // Update the record
    const updatedRecord = await prisma.uploadedForm.update({
      where: { id },
      data: {
        status: status || record.status,
        notes: notes !== undefined ? notes : record.notes
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Record updated successfully',
      record: updatedRecord
    });
    
  } catch (error) {
    console.error("Error updating medical record:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error updating medical record'
      },
      { status: 500 }
    );
  }
}

// Delete a medical record
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Record ID is required' },
        { status: 400 }
      );
    }
    
    // Get the record to make sure it exists and to get the file path
    const record = await prisma.uploadedForm.findUnique({
      where: { id }
    });
    
    if (!record) {
      return NextResponse.json(
        { success: false, message: 'Record not found' },
        { status: 404 }
      );
    }
    
    // Delete the record from the database
    await prisma.uploadedForm.delete({
      where: { id }
    });
    
    // Optionally: Delete the file from the filesystem
    // Note: Uncomment this if you want to delete the actual file
    /*
    if (record.filePath) {
      const filePath = path.join(process.cwd(), 'public', record.filePath.replace(/^\//, ''));
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    */
    
    return NextResponse.json({
      success: true,
      message: 'Record deleted successfully'
    });
    
  } catch (error) {
    console.error("Error deleting medical record:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error deleting medical record'
      },
      { status: 500 }
    );
  }
} 