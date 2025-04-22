import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/appointments/[id]/confirm - Confirm a pending appointment
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointmentId = params.id;
    
    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: "CONFIRMED",
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
    console.error("Error confirming appointment:", error);
    return NextResponse.json(
      { error: "Failed to confirm appointment" },
      { status: 500 }
    );
  }
} 