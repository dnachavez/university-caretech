import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Helper function for error handling
const handlePrismaError = (error: any) => {
  console.error('Login error:', error)
  return NextResponse.json({ error: 'Database connection error. Please try again.' }, { status: 500 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { username, password } = body

    // Validate input
    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 })
    }

    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 50))

    // Find user with a single query to reduce connection load
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email: username } // Allow login with either username or email
        ]
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        email: true,
        password: true,
        role: true,
        status: true,
        emailVerified: true
      }
    })

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check account status
    if (!user.emailVerified) {
      return NextResponse.json({ 
        error: "Email not verified", 
        status: "UNVERIFIED" 
      }, { status: 403 })
    }

    if (user.status === 'PENDING_APPROVAL') {
      return NextResponse.json({ 
        error: "Your account is awaiting administrator approval", 
        status: "PENDING_APPROVAL" 
      }, { status: 403 })
    }

    if (user.status === 'SUSPENDED') {
      return NextResponse.json({ 
        error: "Your account has been suspended", 
        status: "SUSPENDED" 
      }, { status: 403 })
    }

    if (user.status !== 'ACTIVE') {
      return NextResponse.json({ 
        error: "Your account is not active", 
        status: user.status 
      }, { status: 403 })
    }

    // Prepare user data for client (excluding sensitive fields)
    const userData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      role: user.role,
      status: user.status
    }

    return NextResponse.json({ 
      success: true, 
      user: userData
    }, { status: 200 })

  } catch (error) {
    return handlePrismaError(error)
  }
} 