import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE /api/admin/users/[id]/delete - Delete a user account
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
} 