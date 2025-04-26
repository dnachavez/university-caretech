import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// DELETE /api/admin/users/[id]/delete - Delete a user account
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // First delete related records with foreign key constraints
    // Delete related notifications
    await prisma.notification.deleteMany({
      where: {
        userId: userId,
      },
    });
    
    // Delete related clearance requests
    await prisma.clearanceRequest.deleteMany({
      where: {
        userId: userId,
      },
    });
    
    // Delete related appointments
    await prisma.appointment.deleteMany({
      where: {
        userId: userId,
      },
    });
    
    // Delete related uploaded forms
    await prisma.uploadedForm.deleteMany({
      where: {
        userId: userId,
      },
    });
    
    // Health form has onDelete: Cascade so it will be automatically deleted
    
    // Finally delete the user
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