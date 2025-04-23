import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/fs/appointments/[id]/reschedule - Reschedule an appointment to a different time slot (staff only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const appointmentId = params.id;
  
  try {
    const body = await req.json();
    const { timeSlotId } = body;
    
    if (!timeSlotId) {
      return NextResponse.json(
        { error: "Time slot ID is required" },
        { status: 400 }
      );
    }
    
    // Check if the time slot exists and is available
    const timeSlot = await prisma.timeSlot.findUnique({
      where: {
        id: timeSlotId,
        isAvailable: true
      }
    });
    
    if (!timeSlot) {
      return NextResponse.json(
        { error: "Time slot not found or is not available" },
        { status: 404 }
      );
    }
    
    // Get original appointment to mark its time slot as available again
    const originalAppointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { timeSlot: true }
    });
    
    if (!originalAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }
    
    // Start a transaction to update everything
    const result = await prisma.$transaction(async (prisma) => {
      // 1. Mark the original time slot as available
      await prisma.timeSlot.update({
        where: { id: originalAppointment.timeSlotId },
        data: { isAvailable: true }
      });
      
      // 2. Mark the new time slot as unavailable
      await prisma.timeSlot.update({
        where: { id: timeSlotId },
        data: { isAvailable: false }
      });
      
      // 3. Update the appointment with the new time slot
      return await prisma.appointment.update({
        where: { id: appointmentId },
        data: {
          timeSlotId: timeSlotId,
          // Keep the same status
          status: originalAppointment.status
        },
        include: {
          user: {
            select: {
              email: true,
              firstName: true,
              lastName: true
            }
          },
          timeSlot: {
            include: {
              consultationDate: true
            }
          }
        }
      });
    });
    
    return NextResponse.json(
      { message: "Appointment rescheduled successfully", appointment: result },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error rescheduling appointment:", error);
    return NextResponse.json(
      { error: "Failed to reschedule appointment" },
      { status: 500 }
    );
  }
} 