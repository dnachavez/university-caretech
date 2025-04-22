import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/appointments/[id]/unreject - Unreject a previously rejected appointment
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointmentId = params.id;
    
    // First check if the appointment exists and was rejected
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    });
    
    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }
    
    if (appointment.status !== "CANCELLED") {
      return NextResponse.json(
        { error: "Only cancelled appointments can be unrejected" },
        { status: 400 }
      );
    }
    
    // Also check if the time slot is still available
    const timeSlot = await prisma.timeSlot.findUnique({
      where: { id: appointment.timeSlotId },
      include: {
        consultationDate: true
      }
    });
    
    if (!timeSlot) {
      return NextResponse.json(
        { error: "Time slot not found" },
        { status: 404 }
      );
    }
    
    if (!timeSlot.isAvailable) {
      return NextResponse.json(
        { error: "Time slot is no longer available" },
        { status: 400 }
      );
    }
    
    // Update the appointment's status to scheduled
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: "SCHEDULED",
      },
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
      }
    });
    
    // Mark the time slot as unavailable
    await prisma.timeSlot.update({
      where: { id: appointment.timeSlotId },
      data: { isAvailable: false }
    });

    return NextResponse.json({ appointment: updatedAppointment }, { status: 200 });
  } catch (error) {
    console.error("Error unrejecting appointment:", error);
    return NextResponse.json(
      { error: "Failed to unreject appointment" },
      { status: 500 }
    );
  }
} 