import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// PATCH /api/admin/departments/[id]/toggle - Toggle a department's active status
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const departmentId = params.id;
    
    // Check if the department exists
    const department = await prisma.department.findUnique({
      where: { id: departmentId }
    });
    
    if (!department) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }
    
    // Toggle the active status
    const updatedDepartment = await prisma.department.update({
      where: { id: departmentId },
      data: {
        isActive: !department.isActive
      }
    });
    
    // Transform the updated department to match the expected format
    const transformedDepartment = {
      id: updatedDepartment.id,
      name: updatedDepartment.name,
      code: updatedDepartment.name.split(' ').map(word => word[0]).join('').toUpperCase(),
      description: updatedDepartment.name,
      status: updatedDepartment.isActive ? 'ACTIVE' : 'INACTIVE',
      staff: 0
    };
    
    return NextResponse.json({ department: transformedDepartment }, { status: 200 });
  } catch (error) {
    console.error("Error toggling department status:", error);
    return NextResponse.json(
      { error: "Failed to toggle department status" },
      { status: 500 }
    );
  }
} 