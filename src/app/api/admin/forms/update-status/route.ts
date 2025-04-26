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
    const { formId, status, message } = body;
    
    if (!formId || !status) {
      return NextResponse.json(
        { success: false, message: 'Form ID and status are required' },
        { status: 400 }
      );
    }
    
    // Validate status values
    if (!['PENDING', 'APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }
    
    // Find the form
    const form = await prisma.uploadedForm.findUnique({
      where: { id: formId },
      include: { user: true }
    });
    
    if (!form) {
      return NextResponse.json(
        { success: false, message: 'Form not found' },
        { status: 404 }
      );
    }
    
    // Update status
    const updatedForm = await prisma.uploadedForm.update({
      where: { id: formId },
      data: { status }
    });
    
    // Create notification for the user
    let notificationTitle;
    let notificationDescription;
    
    if (status === 'APPROVED') {
      notificationTitle = 'Form Approved';
      notificationDescription = 'Your health form has been approved.';
    } else if (status === 'REJECTED') {
      notificationTitle = 'Form Rejected';
      notificationDescription = message 
        ? `Your health form has been rejected: ${message}`
        : 'Your health form has been rejected.';
    } else {
      notificationTitle = 'Form Status Update';
      notificationDescription = 'Your health form status has been updated.';
    }
    
    await prisma.notification.create({
      data: {
        userId: form.userId,
        title: notificationTitle,
        description: notificationDescription,
        type: 'FORM',
        icon: status === 'APPROVED' ? '✅' : status === 'REJECTED' ? '❌' : '📄',
        linkTo: form.user.role === 'STUDENT' ? '/student/forms' : '/fs/forms',
        relatedId: formId
      }
    });
    
    return NextResponse.json({
      success: true,
      message: `Form status updated to ${status}`,
      form: updatedForm
    });
  } catch (error) {
    console.error("Error updating form status:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error updating form status'
      },
      { status: 500 }
    );
  }
} 