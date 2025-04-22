import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/appointments/[id]/unconfirm - Unconfirm a confirmed appointment back to scheduled
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointmentId = params.id;
    
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId }
    });
    
    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }
    
    if (appointment.status !== "CONFIRMED") {
      return NextResponse.json(
        { error: "Only confirmed appointments can be unconfirmed" },
        { status: 400 }
      );
    }
    
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
            email: true
          }
        },
        timeSlot: {
          include: {
            consultationDate: true
          }
        }
      }
    });

    return NextResponse.json({ appointment: updatedAppointment }, { status: 200 });
  } catch (error) {
    console.error("Error unconfirming appointment:", error);
    return NextResponse.json(
      { error: "Failed to unconfirm appointment" },
      { status: 500 }
    );
  }
} 