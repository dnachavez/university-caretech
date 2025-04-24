import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache';

// PATCH /api/admin/users/[id]/approve - Approve a pending user
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    // Use transaction to update user and create notification
    const result = await prisma.$transaction(async (tx) => {
      // Update user status
      const user = await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          status: "ACTIVE",
        },
      });
      
      // Create notification for the user
      await tx.notification.create({
        data: {
          userId: user.id,
          title: "Account Approved",
          description: "Your account has been approved. You now have full access to all features.",
          type: "ACCOUNT_APPROVAL",
          icon: "✅",
          linkTo: user.role.toUpperCase() === "STUDENT" 
            ? "/student/dashboard" 
            : user.role.toUpperCase() === "ADMIN" 
              ? "/admin/dashboard" 
              : "/fs/dashboard"
        }
      });
      
      return user;
    });

    // Revalidate the users list to update the cache immediately
    revalidatePath('/api/admin/users');

    return NextResponse.json({ user: result }, { status: 200 });
  } catch (error) {
    console.error("Error approving user:", error);
    return NextResponse.json(
      { error: "Failed to approve user" },
      { status: 500 }
    );
  }
} 