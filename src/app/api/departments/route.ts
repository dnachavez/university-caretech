import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

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

// GET /api/departments - Get all departments (public endpoint)
export async function GET(req: NextRequest) {
  try {
    // Fetch all departments (active ones only)
    const departments = await prisma.department.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({ departments })
  } catch (error) {
    console.error('Error fetching departments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch departments' },
      { status: 500 }
    )
  }
}

// POST /api/departments - Create a new department (protected for admin use)
export async function POST(req: NextRequest) {
  try {
    // Check if the request is from an admin
    const url = new URL(req.url);
    const userRole = url.searchParams.get('role');
    
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }

    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Department name is required' }, { status: 400 });
    }

    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 50))

    // Check if department already exists
    const existingDepartment = await prisma.department.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: 'insensitive'
        }
      }
    })

    if (existingDepartment) {
      return NextResponse.json({ error: 'Department already exists' }, { status: 400 })
    }

    // Create a new department
    const department = await prisma.department.create({
      data: {
        name: name.trim(),
        isActive: true
      }
    });

    // Revalidate the departments path to update cached data
    revalidatePath('/api/departments');

    return NextResponse.json({ department }, { status: 201 });
  } catch (error) {
    return handlePrismaError(error);
  }
} 