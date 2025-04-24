import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

// PATCH /api/admin/users/[id]/reject - Reject a user (mark as REJECTED, not delete)
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
    
    // Update the user's status to REJECTED
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        status: "REJECTED", // Mark as REJECTED instead of deleting
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
    
    // Revalidate the users list to update the cache immediately
    revalidatePath('/api/admin/users');
    
    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error rejecting user:", error);
    return NextResponse.json(
      { error: "Failed to reject user" },
      { status: 500 }
    );
  }
} 