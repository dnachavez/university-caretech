import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/appointments/[id]/reject - Reject an appointment
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointmentId = params.id;
    
    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Get the appointment with the time slot
      const appointment = await tx.appointment.findUnique({
        where: {
          id: appointmentId,
        },
        include: {
          timeSlot: true
        }
      });

      if (!appointment) {
        throw new Error("Appointment not found");
      }

      // Update the time slot to be available again
      await tx.timeSlot.update({
        where: {
          id: appointment.timeSlotId,
        },
        data: {
          isAvailable: true,
        },
      });

      // Update the appointment status to CANCELLED
      const updatedAppointment = await tx.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          status: "CANCELLED",
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

      return updatedAppointment;
    });

    return NextResponse.json({ appointment: result }, { status: 200 });
  } catch (error) {
    console.error("Error rejecting appointment:", error);
    return NextResponse.json(
      { error: "Failed to reject appointment" },
      { status: 500 }
    );
  }
} 