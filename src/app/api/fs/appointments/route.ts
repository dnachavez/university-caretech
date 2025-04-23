import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/fs/appointments - Get all appointments with users and time slots info (excluding faculty appointments)
export async function GET(req: NextRequest) {
  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        user: {
          role: {
            not: 'FACULTY' // Exclude faculty appointments
          }
        }
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
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ appointments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
} 