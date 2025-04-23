import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

// Helper function for error handling
const handlePrismaError = (error: any) => {
  console.error('Error in appointments API:', error)
  return NextResponse.json({ error: 'Database connection error. Please try again.' }, { status: 500 })
}

// Set cache control headers
const setCacheHeaders = (response: NextResponse) => {
  response.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  return response
}

// GET /api/admin/appointments - Get all appointments with users and time slots info
export async function GET(req: NextRequest) {
  try {
    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const appointments = await prisma.appointment.findMany({
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            username: true
          }
        },
        timeSlot: {
          include: {
            consultationDate: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const response = NextResponse.json({ appointments }, { status: 200 });
    return setCacheHeaders(response);
  } catch (error) {
    return handlePrismaError(error);
  }
} 