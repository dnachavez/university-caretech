import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from 'next/cache'

// GET /api/admin/users - Get all users
export async function GET(req: NextRequest) {
  try {
    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 100))
    
    const users = await prisma.user.findMany({
      include: {
        healthForm: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const response = NextResponse.json({ users }, { status: 200 })
    return setCacheHeaders(response)
  } catch (error) {
    return handlePrismaError(error)
  }
}

// Helper function for error handling
const handlePrismaError = (error: any) => {
  console.error('Error in users API:', error)
  return NextResponse.json({ error: 'Database connection error. Please try again.' }, { status: 500 })
}

// Set cache control headers
const setCacheHeaders = (response: NextResponse) => {
  response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  return response
}

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

    // Validate input
    if (!body.email || !body.username || !body.firstName || !body.lastName || !body.role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 100))

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: body.username },
          { email: body.email }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json({ 
        error: `A user with this ${existingUser.username === body.username ? 'username' : 'email'} already exists` 
      }, { status: 400 })
    }

    // Create user
    const user = await prisma.user.create({
      data: {
        username: body.username,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
        role: body.role,
        password: body.password, // In a real app, this should be hashed
        emailVerified: true,
        status: 'ACTIVE'
      }
    })

    // Revalidate path to update cache
    revalidatePath('/api/admin/users')

    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    return handlePrismaError(error)
  }
} 