import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/users - Get all users
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany({
      include: {
        healthForm: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
} 