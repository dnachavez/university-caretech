import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/users/[id]/suspend - Suspend a user account
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        status: "SUSPENDED",
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error suspending user:", error);
    return NextResponse.json(
      { error: "Failed to suspend user" },
      { status: 500 }
    );
  }
} 