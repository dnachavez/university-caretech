import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache'

// Helper function for error handling
const handlePrismaError = (error: any) => {
  console.error('Error in departments API:', error)
  return NextResponse.json({ error: 'Database connection error. Please try again.' }, { status: 500 })
}

// Set cache control headers
const setCacheHeaders = (response: NextResponse) => {
  response.headers.set('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59')
  return response
}

// GET /api/admin/departments - Get all departments
export async function GET(req: NextRequest) {
  try {
    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 50))
    
    const departments = await prisma.department.findMany({
      where: {
        isActive: true
      },
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

    const response = NextResponse.json({ departments: transformedDepartments }, { status: 200 })
    return setCacheHeaders(response)
  } catch (error) {
    return handlePrismaError(error)
  }
}

// POST /api/admin/departments - Create a new department
export async function POST(req: NextRequest) {
  try {
    // Check authorization
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userRole = req.headers.get('x-user-role')
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { name } = body

    if (!name) {
      return NextResponse.json({ error: 'Department name is required' }, { status: 400 })
    }

    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 50))

    // Check if department already exists
    const existingDepartment = await prisma.department.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    })

    if (existingDepartment) {
      return NextResponse.json({ error: 'Department already exists' }, { status: 400 })
    }

    // Create new department
    const department = await prisma.department.create({
      data: {
        name,
        isActive: true
      }
    })

    // Revalidate the departments path to update cached data
    revalidatePath('/api/admin/departments')

    // Transform the department to match the expected format
    const transformedDepartment = {
      id: department.id,
      name: department.name,
      code: body.code || department.name.split(' ').map(word => word[0]).join('').toUpperCase(),
      description: body.description || department.name,
      status: department.isActive ? 'ACTIVE' : 'INACTIVE',
      staff: 0
    };

    return NextResponse.json({ department: transformedDepartment }, { status: 201 })
  } catch (error) {
    return handlePrismaError(error)
  }
} 