import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/users/[id] - Get detailed user information
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id;
    
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        healthForm: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json(
      { error: "Failed to fetch user details" },
      { status: 500 }
    );
  }
} 