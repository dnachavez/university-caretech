import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, generateVerificationEmail } from '@/lib/email'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

// Helper function for error handling
const handlePrismaError = (error: any) => {
  console.error('Registration error:', error)
  return NextResponse.json({ error: 'Database connection error. Please try again.' }, { status: 500 })
}

export async function POST(req: NextRequest) {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      username, 
      password,
      idNumber,
      role,
      departmentId,
      yearLevel
    } = await req.json()

    // Validate required fields
    if (!firstName || !lastName || !email || !username || !password || !role) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    // Validate department for faculty, staff, and student
    if ((role === 'FACULTY' || role === 'STAFF' || role === 'STUDENT') && !departmentId) {
      return NextResponse.json({ error: "Department is required" }, { status: 400 })
    }

    // Validate year level for students
    if (role === 'STUDENT' && !yearLevel) {
      return NextResponse.json({ error: "Year level is required for students" }, { status: 400 })
    }

    // Check if email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUserByEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 })
    }

    // Check if username already exists
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username }
    })

    if (existingUserByUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')

    // Create user in the database
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
        idNumber,
        role,
        departmentId,
        yearLevel,
        verificationToken,
        status: 'UNVERIFIED'
      }
    })

    // Create verification token record
    await prisma.verificationToken.create({
      data: {
        token: verificationToken,
        email,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
      }
    })

    // Send verification email (implementation would be here)
    // For now, just log the token
    console.log(`Verification token for ${email}: ${verificationToken}`)

    return NextResponse.json({
      message: "User registered successfully. Please check your email to verify your account.",
      userId: user.id
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
} 