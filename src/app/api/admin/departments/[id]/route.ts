import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/departments/[id] - Get a specific department
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const departmentId = params.id;
    
    const department = await prisma.department.findUnique({
      where: { id: departmentId },
      include: {
        _count: {
          select: {
            clearanceRequests: true
          }
        }
      }
    });
    
    if (!department) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }
    
    // Transform the department to match the expected format
    const transformedDepartment = {
      id: department.id,
      name: department.name,
      code: department.name.split(' ').map(word => word[0]).join('').toUpperCase(),
      description: department.name,
      status: department.isActive ? 'ACTIVE' : 'INACTIVE',
      staff: 0 // Placeholder until staff-department relation is implemented
    };
    
    return NextResponse.json({ department: transformedDepartment }, { status: 200 });
  } catch (error) {
    console.error("Error fetching department:", error);
    return NextResponse.json(
      { error: "Failed to fetch department" },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/departments/[id] - Update a department
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const departmentId = params.id;
    const { name, code, description, status } = await req.json();
    
    // Check if the department exists
    const existingDepartment = await prisma.department.findUnique({
      where: { id: departmentId }
    });
    
    if (!existingDepartment) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }
    
    // Update the department
    const updatedDepartment = await prisma.department.update({
      where: { id: departmentId },
      data: {
        name: name || existingDepartment.name,
        isActive: status === 'ACTIVE'
      }
    });
    
    // Transform the updated department to match the expected format
    const transformedDepartment = {
      id: updatedDepartment.id,
      name: updatedDepartment.name,
      code: code || updatedDepartment.name.split(' ').map(word => word[0]).join('').toUpperCase(),
      description: description || updatedDepartment.name,
      status: updatedDepartment.isActive ? 'ACTIVE' : 'INACTIVE',
      staff: 0
    };
    
    return NextResponse.json({ department: transformedDepartment }, { status: 200 });
  } catch (error) {
    console.error("Error updating department:", error);
    return NextResponse.json(
      { error: "Failed to update department" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/departments/[id] - Delete a department
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const departmentId = params.id;
    
    // Check if the department exists
    const existingDepartment = await prisma.department.findUnique({
      where: { id: departmentId },
      include: {
        clearanceRequests: true
      }
    });
    
    if (!existingDepartment) {
      return NextResponse.json(
        { error: "Department not found" },
        { status: 404 }
      );
    }
    
    // Check if there are any clearance requests associated with this department
    if (existingDepartment.clearanceRequests.length > 0) {
      return NextResponse.json(
        { 
          error: "Cannot delete department with associated clearance requests",
          count: existingDepartment.clearanceRequests.length
        },
        { status: 400 }
      );
    }
    
    // Delete the department
    await prisma.department.delete({
      where: { id: departmentId }
    });
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting department:", error);
    return NextResponse.json(
      { error: "Failed to delete department" },
      { status: 500 }
    );
  }
} 