import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/departments - Get all departments (public endpoint)
export async function GET(req: NextRequest) {
  try {
    const departments = await prisma.department.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json({ departments }, { status: 200 });
  } catch (error) {
    console.error('Error fetching departments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
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

    // Create a new department
    const department = await prisma.department.create({
      data: {
        name: name.trim()
      }
    });

    return NextResponse.json({ department }, { status: 201 });
  } catch (error) {
    console.error('Error creating department:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 