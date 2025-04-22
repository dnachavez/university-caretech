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
      where: { id: userId }
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
    
    // Create database entries for each form
    const savedForms = [];
    
    for (const image of images) {
      if (!image.fileUrl || !image.formType) {
        console.error("Invalid image data:", image);
        throw new Error("Invalid form data: missing file URL or form type");
      }
      
      const savedForm = await prisma.uploadedForm.create({
        data: {
          userId,
          formType: image.formType,
          filePath: image.fileUrl,
          notes: image.notes || "",
          status: "PENDING"
        }
      });
      
      savedForms.push(savedForm);
    }
    
    console.log(`Successfully saved ${savedForms.length} forms`);
    
    return NextResponse.json({
      success: true,
      message: `Successfully submitted ${savedForms.length} forms`,
      forms: savedForms
    });
    
  } catch (error) {
    console.error("Error saving forms:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error saving forms'
      },
      { status: 500 }
    );
  }
} 