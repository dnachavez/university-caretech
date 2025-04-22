import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/appointments/[id]/reschedule - Reschedule an appointment
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointmentId = params.id;
    const body = await req.json();
    const { newTimeSlotId } = body;
    
    if (!newTimeSlotId) {
      return NextResponse.json(
        { error: "New time slot ID is required" },
        { status: 400 }
      );
    }
    
    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Get the current appointment with the time slot
      const currentAppointment = await tx.appointment.findUnique({
        where: {
          id: appointmentId,
        },
        include: {
          timeSlot: true
        }
      });

      if (!currentAppointment) {
        throw new Error("Appointment not found");
      }

      // Check if the appointment is eligible for rescheduling
      if (currentAppointment.status === "ONGOING" || currentAppointment.status === "CANCELLED" || currentAppointment.status === "COMPLETED") {
        throw new Error(`Cannot reschedule an appointment with status: ${currentAppointment.status}`);
      }

      // Check if the new time slot exists and is available
      const newTimeSlot = await tx.timeSlot.findUnique({
        where: {
          id: newTimeSlotId,
          isAvailable: true
        }
      });

      if (!newTimeSlot) {
        throw new Error("New time slot not available or does not exist");
      }

      // Free up the old time slot
      await tx.timeSlot.update({
        where: {
          id: currentAppointment.timeSlotId,
        },
        data: {
          isAvailable: true,
        },
      });

      // Mark the new time slot as unavailable
      await tx.timeSlot.update({
        where: {
          id: newTimeSlotId,
        },
        data: {
          isAvailable: false,
        },
      });

      // Update the appointment with the new time slot
      const updatedAppointment = await tx.appointment.update({
        where: {
          id: appointmentId,
        },
        data: {
          timeSlotId: newTimeSlotId,
          status: "CONFIRMED", // Automatically confirm the rescheduled appointment
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
    console.error("Error rescheduling appointment:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to reschedule appointment" },
      { status: 500 }
    );
  }
} 