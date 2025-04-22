import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const searchParam = request.nextUrl.searchParams.get('q');
    
    if (!searchParam || searchParam.trim().length < 3) {
      return NextResponse.json(
        { success: false, message: 'Search query must be at least 3 characters' },
        { status: 400 }
      );
    }
    
    // Search for users by first name, last name, or email
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { firstName: { contains: searchParam } },
          { lastName: { contains: searchParam } },
          { email: { contains: searchParam } },
          { username: { contains: searchParam } }
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true
      },
      take: 10 // Limit to 10 results
    });
    
    return NextResponse.json({
      success: true,
      users
    });
    
  } catch (error) {
    console.error("Error searching users:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Error searching users'
      },
      { status: 500 }
    );
  }
} 