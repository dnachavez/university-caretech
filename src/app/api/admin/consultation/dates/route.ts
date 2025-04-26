import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache'

// Helper function for error handling
const handlePrismaError = (error: any) => {
  console.error('Error in consultation dates API:', error)
  return NextResponse.json({ error: 'Database connection error. Please try again.' }, { status: 500 })
}

// Set cache control headers
const setCacheHeaders = (response: NextResponse) => {
  response.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  return response
}

// GET /api/admin/consultation/dates - Get all consultation dates (including past dates)
export async function GET(req: NextRequest) {
  try {
    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const consultationDates = await prisma.consultationDate.findMany({
      include: {
        timeSlots: {
          orderBy: {
            startTime: 'asc'
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    const response = NextResponse.json({ consultationDates }, { status: 200 })
    return setCacheHeaders(response)
  } catch (error) {
    return handlePrismaError(error)
  }
}

// POST /api/admin/consultation/dates - Create a new consultation date with time slots
export async function POST(req: NextRequest) {
  try {
    // Check authorization
    const url = new URL(req.url)
    const userRole = url.searchParams.get('role')
    
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json();
    const { date, timeSlots } = body;
    
    if (!date || !timeSlots || !Array.isArray(timeSlots) || timeSlots.length === 0) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 }
      );
    }
    
    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Check if date already exists
    const existingDate = await prisma.consultationDate.findFirst({
      where: {
        date: new Date(date)
      }
    });
    
    if (existingDate) {
      return NextResponse.json(
        { error: "Consultation date already exists" },
        { status: 400 }
      );
    }
    
    // Create consultation date with time slots in a transaction
    const consultationDate = await prisma.$transaction(async (tx) => {
      // Create the consultation date
      const newDate = await tx.consultationDate.create({
        data: {
          date: new Date(date)
        }
      });

      // Create all time slots
      for (const slot of timeSlots) {
        await tx.timeSlot.create({
      data: {
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: true,
            consultationDateId: newDate.id
          }
        });
        }

      // Return the created date with time slots
      return tx.consultationDate.findUnique({
        where: { id: newDate.id },
        include: { timeSlots: true }
    });
    });

    // Revalidate cache
    revalidatePath('/api/admin/consultation/dates')

    return NextResponse.json({ consultationDate }, { status: 201 });
  } catch (error) {
    return handlePrismaError(error)
  }
} 