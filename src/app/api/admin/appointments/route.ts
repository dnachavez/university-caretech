import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/appointments - Get all appointments with users and time slots info
export async function GET(req: NextRequest) {
  try {
    const appointments = await prisma.appointment.findMany({
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