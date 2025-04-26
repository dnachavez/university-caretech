import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Get user ID from query params
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const userRole = url.searchParams.get('role');
    
    if (!userId || !userRole) {
      return NextResponse.json({ 
        success: false, 
        message: 'Unauthorized - User ID and role are required' 
      }, { status: 401 });
    }
    
    // Verify the user exists and is an admin
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ 
        success: false, 
        message: 'Forbidden - Admin access required' 
      }, { status: 403 });
    }

    // Parse request body
    const body = await request.json();
    const { formId, notes } = body;
    
    if (!formId) {
      return NextResponse.json(
        { success: false, message: 'Form ID is required' },
        { status: 400 }
      );
    }
    
    // Find the form
    const form = await prisma.uploadedForm.findUnique({
      where: { id: formId }
    });
    
    if (!form) {
      return NextResponse.json(
        { success: false, message: 'Form not found' },
        { status: 404 }
      );
    }
    
    // Update notes
    const updatedForm = await prisma.uploadedForm.update({
      where: { id: formId },
      data: { 
        notes: notes || '',
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({
      success: true,
      message: 'Form updated successfully',
      form: updatedForm
    });
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error updating form'
      },
      { status: 500 }
    );
  }
} 