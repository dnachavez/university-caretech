import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/admin/departments - Get all departments
export async function GET(req: NextRequest) {
  try {
    const departments = await prisma.department.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        // Count staff (will be implemented when staff-department relation is added)
        // For now, return a placeholder count
        _count: {
          select: {
            clearanceRequests: true
          }
        }
      }
    });

    // Transform the departments to match the expected format
    const transformedDepartments = departments.map(dept => ({
      id: dept.id,
      name: dept.name,
      code: dept.name.split(' ').map(word => word[0]).join('').toUpperCase(),
      description: dept.name,
      status: dept.isActive ? 'ACTIVE' : 'INACTIVE',
      staff: 0 // Placeholder count until staff-department relation is implemented
    }));

    return NextResponse.json({ departments: transformedDepartments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching departments:", error);
    return NextResponse.json(
      { error: "Failed to fetch departments" },
      { status: 500 }
    );
  }
}

// POST /api/admin/departments - Create a new department
export async function POST(req: NextRequest) {
  try {
    const { name, code, description, status } = await req.json();

    if (!name) {
      return NextResponse.json(
        { error: "Department name is required" },
        { status: 400 }
      );
    }

    const newDepartment = await prisma.department.create({
      data: {
        name: name,
        isActive: status === 'ACTIVE'
      }
    });

    // Transform the department to match the expected format
    const transformedDepartment = {
      id: newDepartment.id,
      name: newDepartment.name,
      code: code || newDepartment.name.split(' ').map(word => word[0]).join('').toUpperCase(),
      description: description || newDepartment.name,
      status: newDepartment.isActive ? 'ACTIVE' : 'INACTIVE',
      staff: 0
    };

    return NextResponse.json({ department: transformedDepartment }, { status: 201 });
  } catch (error) {
    console.error("Error creating department:", error);
    return NextResponse.json(
      { error: "Failed to create department" },
      { status: 500 }
    );
  }
} 