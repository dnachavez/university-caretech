import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    const formType = url.searchParams.get('formType');

    if (!userId) {
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
      return NextResponse.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    // Build query with optional formType filter
    const query: any = {
      where: {
        userId: userId
      }
    };

    // Add formType filter if provided
    if (formType) {
      query.where.formType = formType;
    }

    const forms = await prisma.uploadedForm.findMany(query);

    return NextResponse.json({
      success: true,
      forms
    });

  } catch (error) {
    console.error("Error fetching user forms:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error fetching user forms'
      },
      { status: 500 }
    );
  }
} 