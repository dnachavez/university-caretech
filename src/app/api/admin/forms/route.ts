import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
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

    // Fetch all forms with user information
    const forms = await prisma.uploadedForm.findMany({
      include: {
        user: {
          select: {
            id: true,
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
      forms
    });

  } catch (error) {
    console.error("Error fetching forms:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error fetching forms'
      },
      { status: 500 }
    );
  }
} 