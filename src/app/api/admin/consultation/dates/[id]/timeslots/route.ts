import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/admin/consultation/dates/[id]/timeslots - Add time slots to a consultation date
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dateId = params.id;
    const body = await req.json();
    const { timeSlots } = body;
    
    if (!timeSlots || !Array.isArray(timeSlots) || timeSlots.length === 0) {
      return NextResponse.json(
        { error: "Time slots are required" },
        { status: 400 }
      );
    }
    
    // Check if the consultation date exists
    const consultationDate = await prisma.consultationDate.findUnique({
      where: {
        id: dateId
      }
    });
    
    if (!consultationDate) {
      return NextResponse.json(
        { error: "Consultation date not found" },
        { status: 404 }
      );
    }
    
    // Create the time slots
    const newTimeSlots = await prisma.timeSlot.createMany({
      data: timeSlots.map((slot: { startTime: string, endTime: string }) => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
        isAvailable: true,
        consultationDateId: dateId
      }))
    });

    // Get the updated consultation date with all time slots
    const updatedDate = await prisma.consultationDate.findUnique({
      where: {
        id: dateId
      },
      include: {
        timeSlots: true
      }
    });

    return NextResponse.json({ consultationDate: updatedDate }, { status: 201 });
  } catch (error) {
    console.error("Error adding time slots:", error);
    return NextResponse.json(
      { error: "Failed to add time slots" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/consultation/dates/[id]/timeslots - Remove time slots from a consultation date
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const dateId = params.id;
    const body = await req.json();
    const { timeSlotIds } = body;
    
    if (!timeSlotIds || !Array.isArray(timeSlotIds) || timeSlotIds.length === 0) {
      return NextResponse.json(
        { error: "Time slot IDs are required" },
        { status: 400 }
      );
    }
    
    // Check if the consultation date exists
    const consultationDate = await prisma.consultationDate.findUnique({
      where: {
        id: dateId
      }
    });
    
    if (!consultationDate) {
      return NextResponse.json(
        { error: "Consultation date not found" },
        { status: 404 }
      );
    }
    
    // Check if any of the time slots have appointments
    const timeSlots = await prisma.timeSlot.findMany({
      where: {
        id: {
          in: timeSlotIds
        },
        appointment: {
          isNot: null
        }
      }
    });
    
    if (timeSlots.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete time slots with appointments" },
        { status: 400 }
      );
    }
    
    // Delete the time slots
    await prisma.timeSlot.deleteMany({
      where: {
        id: {
          in: timeSlotIds
        },
        consultationDateId: dateId
      }
    });

    // Get the updated consultation date with remaining time slots
    const updatedDate = await prisma.consultationDate.findUnique({
      where: {
        id: dateId
      },
      include: {
        timeSlots: true
      }
    });

    return NextResponse.json({ consultationDate: updatedDate }, { status: 200 });
  } catch (error) {
    console.error("Error removing time slots:", error);
    return NextResponse.json(
      { error: "Failed to remove time slots" },
      { status: 500 }
    );
  }
} 