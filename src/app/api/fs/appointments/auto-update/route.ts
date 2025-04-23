import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/fs/appointments/auto-update - Auto-update appointment statuses based on time
export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    let updatedCount = 0;
    
    // Find appointments that should be ONGOING
    // Scheduled and confirmed appointments with a time slot that has started
    const shouldBeOngoing = await prisma.appointment.findMany({
      where: {
        OR: [
          { status: "SCHEDULED" },
          { status: "CONFIRMED" }
        ],
        timeSlot: {
          consultationDate: {
            date: {
              lte: now.toISOString().split('T')[0] // Today or earlier
            }
          }
        }
      },
      include: {
        timeSlot: {
          include: {
            consultationDate: true
          }
        }
      }
    });
    
    // Update appointments that should be ONGOING
    for (const appointment of shouldBeOngoing) {
      const appointmentDate = new Date(appointment.timeSlot.consultationDate.date);
      appointmentDate.setHours(
        parseInt(appointment.timeSlot.startTime.split(':')[0]),
        parseInt(appointment.timeSlot.startTime.split(':')[1])
      );
      
      const appointmentEndDate = new Date(appointment.timeSlot.consultationDate.date);
      appointmentEndDate.setHours(
        parseInt(appointment.timeSlot.endTime.split(':')[0]),
        parseInt(appointment.timeSlot.endTime.split(':')[1])
      );
      
      // If appointment start time has passed but still before end time
      if (now >= appointmentDate && now < appointmentEndDate) {
        await prisma.appointment.update({
          where: { id: appointment.id },
          data: { status: "ONGOING" }
        });
        updatedCount++;
      }
    }
    
    // Find appointments that should be COMPLETED
    // ONGOING appointments with a time slot that has ended
    const shouldBeCompleted = await prisma.appointment.findMany({
      where: {
        status: "ONGOING"
      },
      include: {
        timeSlot: {
          include: {
            consultationDate: true
          }
        }
      }
    });
    
    // Update appointments that should be COMPLETED
    for (const appointment of shouldBeCompleted) {
      const appointmentEndDate = new Date(appointment.timeSlot.consultationDate.date);
      appointmentEndDate.setHours(
        parseInt(appointment.timeSlot.endTime.split(':')[0]),
        parseInt(appointment.timeSlot.endTime.split(':')[1])
      );
      
      // If appointment end time has passed
      if (now >= appointmentEndDate) {
        await prisma.appointment.update({
          where: { id: appointment.id },
          data: { status: "COMPLETED" }
        });
        updatedCount++;
      }
    }
    
    return NextResponse.json({ updatedCount }, { status: 200 });
  } catch (error) {
    console.error("Error auto-updating appointment statuses:", error);
    return NextResponse.json(
      { error: "Failed to auto-update appointment statuses" },
      { status: 500 }
    );
  }
} 