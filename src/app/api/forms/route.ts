import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    console.log("Form submission API called");
    
    // Parse request body
    const body = await request.json();
    const { images, userId } = body;
    
    if (!userId) {
      console.error("No user ID provided");
      return NextResponse.json(
        { success: false, message: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Validate the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true
      }
    });
    
    if (!user) {
      console.error("Invalid user ID:", userId);
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }
    
    console.log("User ID:", userId);
    
    // Validate images data
    if (!images || !Array.isArray(images) || images.length === 0) {
      console.error("Invalid request data - no images");
      return NextResponse.json(
        { success: false, message: 'No form images provided' },
        { status: 400 }
      );
    }
    
    console.log(`Processing ${images.length} forms`);
    
    // Create database entries for each form with notifications
    const savedForms = await prisma.$transaction(async (tx) => {
      // Create forms
      const forms: any[] = [];
      
      for (const image of images) {
        if (!image.fileUrl || !image.formType) {
          console.error("Invalid image data:", image);
          throw new Error("Invalid form data: missing file URL or form type");
        }
        
        const savedForm = await tx.uploadedForm.create({
          data: {
            userId,
            formType: image.formType,
            filePath: image.fileUrl,
            notes: image.notes || "",
            status: "PENDING"
          }
        });
        
        forms.push(savedForm);
      }
      
      // Get staff and admin users to notify
      const staffAdminUsers = await tx.user.findMany({
        where: {
          OR: [
            { role: "STAFF" },
            { role: "ADMIN" }
          ]
        },
        select: {
          id: true,
          role: true
        }
      });
      
      // Create notifications for staff and admin users
      const studentName = `${user.firstName} ${user.lastName}`;
      const formTypes = [...new Set(images.map(img => img.formType))].join(", ");
      
      const notificationPromises = staffAdminUsers.map(staffUser => 
        tx.notification.create({
          data: {
            userId: staffUser.id,
            title: "New Form Submission",
            description: `${studentName} has submitted ${images.length} form(s) of type: ${formTypes}. Requires review.`,
            type: "FORM",
            icon: "📄",
            linkTo: staffUser.role === "ADMIN" ? "/admin/medical-records" : "/fs/forms",
            relatedId: forms[0].id // Use the first form as related ID
          }
        })
      );
      
      // Also create a notification for the student
      await tx.notification.create({
        data: {
          userId,
          title: "Form Submitted",
          description: `Your form(s) have been submitted and are pending review.`,
          type: "FORM",
          icon: "📄",
          linkTo: "/student/forms",
          relatedId: forms[0].id
        }
      });
      
      // Execute all notification creation promises
      await Promise.all(notificationPromises);
      
      return forms;
    });
    
    console.log(`Successfully saved ${savedForms.length} forms`);
    
    return NextResponse.json({
      success: true,
      message: 'Forms uploaded successfully',
      forms: savedForms
    });
  } catch (error) {
    console.error("Error processing forms:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : 'Failed to process forms' },
      { status: 500 }
    );
  }
} 