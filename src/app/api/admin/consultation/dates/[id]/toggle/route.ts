import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/consultation/dates/[id]/toggle - Toggle the active status of a consultation date
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authorization
    const url = new URL(req.url)
    const userRole = url.searchParams.get('role')
    
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const dateId = params.id;
    
    // Get the current consultation date
    const consultationDate = await prisma.consultationDate.findUnique({
      where: {
        id: dateId
      }
    });
    
    if (!consultationDate) {
      return NextResponse.json(
        { error: "Consultation date not found" },
        { status: 404 }
      );
    }
    
    // Toggle the active status
    const updatedDate = await prisma.consultationDate.update({
      where: {
        id: dateId
      },
      data: {
        isActive: !consultationDate.isActive
      },
      include: {
        timeSlots: true
      }
    });

    return NextResponse.json({ consultationDate: updatedDate }, { status: 200 });
  } catch (error) {
    console.error("Error toggling consultation date status:", error);
    return NextResponse.json(
      { error: "Failed to toggle consultation date status" },
      { status: 500 }
    );
  }
} 