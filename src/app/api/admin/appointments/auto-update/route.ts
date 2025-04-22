import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper function to parse time strings like "08:00 AM" into minutes since midnight
function timeStringToMinutes(timeStr: string): number {
  const [timePart, ampm] = timeStr.split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);
  
  if (ampm === "PM" && hours !== 12) {
    hours += 12;
  } else if (ampm === "AM" && hours === 12) {
    hours = 0;
  }
  
  return hours * 60 + minutes;
}

// GET /api/admin/appointments/auto-update - Auto update appointment statuses based on time
export async function GET(req: NextRequest) {
  try {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Calculate current time in minutes past midnight
    const currentHours = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTimeInMinutes = currentHours * 60 + currentMinutes;
    
    // 1. Find all confirmed appointments for today
    const todaysAppointments = await prisma.appointment.findMany({
      where: {
        status: "CONFIRMED",
        timeSlot: {
          consultationDate: {
            date: {
              gte: new Date(currentDate),
              lt: new Date(new Date(currentDate).getTime() + 24 * 60 * 60 * 1000), // +1 day
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
    
    const updatedAppointments = [];
    
    // 2. Process each appointment
    for (const appointment of todaysAppointments) {
      const startTimeInMinutes = timeStringToMinutes(appointment.timeSlot.startTime);
      const endTimeInMinutes = timeStringToMinutes(appointment.timeSlot.endTime);
      
      // If current time is within the appointment slot, mark as ONGOING
      if (currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes < endTimeInMinutes) {
        const updated = await prisma.appointment.update({
          where: { id: appointment.id },
          data: { status: "ONGOING" },
          include: {
            timeSlot: {
              include: {
                consultationDate: true
              }
            }
          }
        });
        updatedAppointments.push(updated);
      }
      // If current time is past the end time, mark as COMPLETED
      else if (currentTimeInMinutes >= endTimeInMinutes) {
        const updated = await prisma.appointment.update({
          where: { id: appointment.id },
          data: { status: "COMPLETED" },
          include: {
            timeSlot: {
              include: {
                consultationDate: true
              }
            }
          }
        });
        updatedAppointments.push(updated);
      }
    }
    
    return NextResponse.json({ 
      message: "Appointment statuses updated successfully",
      updatedCount: updatedAppointments.length,
      updatedAppointments 
    }, { status: 200 });
    
  } catch (error) {
    console.error("Error auto-updating appointment statuses:", error);
    return NextResponse.json(
      { error: "Failed to update appointment statuses" },
      { status: 500 }
    );
  }
} 