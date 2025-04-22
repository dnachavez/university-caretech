import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, generateVerificationEmail } from '@/lib/email'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { firstName, lastName, username, email, password, role } = body

    // Validate input
    if (!firstName || !lastName || !username || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json({ 
        error: existingUser.email === email 
          ? "Email already in use" 
          : "Username already taken" 
      }, { status: 400 })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex')
    const hashedToken = crypto.createHash('sha256').update(verificationToken).digest('hex')

    // Set token expiry (24 hours)
    const tokenExpiry = new Date()
    tokenExpiry.setHours(tokenExpiry.getHours() + 24)

    // Create verification token in DB
    await prisma.verificationToken.create({
      data: {
        token: hashedToken,
        email,
        expires: tokenExpiry
      }
    })

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        role: role.toUpperCase(),
        status: 'UNVERIFIED',
        verificationToken: hashedToken
      }
    })

    // Generate verification URL
    const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify?token=${verificationToken}`

    // Send verification email
    await sendEmail({
      to: email,
      subject: "Verify your University CareTeam account",
      html: generateVerificationEmail(`${firstName} ${lastName}`, verificationUrl)
    })

    return NextResponse.json({ 
      success: true, 
      message: "Registration successful. Please check your email to verify your account." 
    }, { status: 201 })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
  }
} 