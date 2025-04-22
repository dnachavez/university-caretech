import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/users/[id]/unreject - Unreject a previously rejected user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }
    
    // Update the user's status from rejected to pending
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        // Set appropriate status based on role
        status: (user.role === 'FACULTY' || user.role === 'STAFF') ? "PENDING_APPROVAL" : "PENDING",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        status: true,
        emailVerified: true,
        createdAt: true,
        updatedAt: true
      }
    });
    
    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error unrejecting user:", error);
    return NextResponse.json(
      { error: "Failed to unreject user" },
      { status: 500 }
    );
  }
} 