import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/fs/appointments/[id]/unreject - Unreject (restore) a cancelled appointment (staff only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const appointmentId = params.id;

  try {
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
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        timeSlot: {
          include: {
            consultationDate: true,
          },
        },
      },
    });

    return NextResponse.json(
      { message: "Appointment unrejected successfully", appointment: updatedAppointment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error unrejecting appointment:", error);
    return NextResponse.json(
      { error: "Failed to unreject appointment" },
      { status: 500 }
    );
  }
} 