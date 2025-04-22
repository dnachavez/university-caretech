import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/consultation/dates - Get all consultation dates (including past dates)
export async function GET(req: NextRequest) {
  try {
    const consultationDates = await prisma.consultationDate.findMany({
      include: {
        timeSlots: true
      },
      orderBy: {
        date: 'desc'
      }
    });

    return NextResponse.json({ consultationDates }, { status: 200 });
  } catch (error) {
    console.error("Error fetching consultation dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch consultation dates" },
      { status: 500 }
    );
  }
}

// POST /api/admin/consultation/dates - Create a new consultation date with time slots
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { date, timeSlots } = body;
    
    if (!date || !timeSlots || !Array.isArray(timeSlots) || timeSlots.length === 0) {
      return NextResponse.json(
        { error: "Date and time slots are required" },
        { status: 400 }
      );
    }
    
    // Check if date already exists
    const existingDate = await prisma.consultationDate.findFirst({
      where: {
        date: new Date(date)
      }
    });
    
    if (existingDate) {
      return NextResponse.json(
        { error: "A consultation date already exists for this date" },
        { status: 400 }
      );
    }
    
    // Create the consultation date with time slots
    const consultationDate = await prisma.consultationDate.create({
      data: {
        date: new Date(date),
        timeSlots: {
          create: timeSlots.map((slot: { startTime: string, endTime: string }) => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: true
          }))
        }
      },
      include: {
        timeSlots: true
      }
    });

    return NextResponse.json({ consultationDate }, { status: 201 });
  } catch (error) {
    console.error("Error creating consultation date:", error);
    return NextResponse.json(
      { error: "Failed to create consultation date" },
      { status: 500 }
    );
  }
} 