import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/users/[id]/approve - Approve a pending user
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
        status: "ACTIVE",
      },
    });

    return NextResponse.json({ user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error approving user:", error);
    return NextResponse.json(
      { error: "Failed to approve user" },
      { status: 500 }
    );
  }
} 