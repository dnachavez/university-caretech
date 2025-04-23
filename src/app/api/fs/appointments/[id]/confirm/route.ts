import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/fs/appointments/[id]/confirm - Confirm an appointment (staff only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const appointmentId = params.id;

  try {
    const updatedAppointment = await prisma.$transaction(async (tx) => {
      // Update the appointment status
      const appointment = await tx.appointment.update({
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
      
      // Format date and time for notification
      const appointmentDate = new Date(appointment.timeSlot.consultationDate.date);
      const formattedDate = appointmentDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      // Create notification for the student
      await tx.notification.create({
        data: {
          userId: appointment.user.id,
          title: "Appointment Confirmed",
          description: `Your appointment on ${formattedDate} at ${appointment.timeSlot.startTime} has been confirmed.`,
          type: "APPOINTMENT",
          icon: "✅",
          linkTo: "/student/dashboard",
          relatedId: appointmentId
        }
      });
      
      return appointment;
    });

    return NextResponse.json(
      { message: "Appointment confirmed successfully", appointment: updatedAppointment },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error confirming appointment:", error);
    return NextResponse.json(
      { error: "Failed to confirm appointment" },
      { status: 500 }
    );
  }
} 