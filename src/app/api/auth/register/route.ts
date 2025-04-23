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
    const body = await req.json()
    const { firstName, lastName, username, email, password, role, departmentId, yearLevel } = body

    // Validate input
    if (!firstName || !lastName || !username || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 })
    }

    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 50))

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      },
      select: {
        email: true,
        username: true
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

    try {
      // Use transaction to ensure all operations succeed or fail together
      const result = await prisma.$transaction(async (tx) => {
        // Create verification token in DB
        await tx.verificationToken.create({
          data: {
            token: hashedToken,
            email,
            expires: tokenExpiry
          }
        })

        // Create user
        const user = await tx.user.create({
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

        // Create health form if departmentId is provided
        if (departmentId) {
          // Get current date for defaults
          const defaultDate = new Date()
          
          // Create a basic health form entry with the provided data
          await tx.userHealthForm.create({
            data: {
              userId: user.id,
              firstName,
              lastName,
              birthdate: defaultDate,
              gender: "Not Specified",
              birthPlace: "Not Specified",
              addressLine1: "Not Specified",
              city: "Not Specified",
              state: "Not Specified",
              postalCode: "00000",
              emergencyContact: "Not Specified",
              relationship: "Not Specified",
              emergencyNumber: "Not Specified",
              signaturePath: "",
              dateSigned: defaultDate,
              departmentId: departmentId,
              yearLevel: yearLevel || undefined,
              allergies: false,
              immunized: false,
              communicableDisease: false,
              asthmatic: false,
              chronicIllness: false,
              hiking: false,
              dancing: false,
              swimming: false,
              basketball: false,
              ballgames: false,
              jogging: false,
              football: false,
              badminton: false,
              calisthenics: false,
              wallclimbing: false,
              medicationPermission: false
            }
          })
        }
        
        // Create notifications for admins if a faculty or staff account is registered
        if (role.toUpperCase() === 'FACULTY' || role.toUpperCase() === 'STAFF') {
          // Find all admin users
          const adminUsers = await tx.user.findMany({
            where: {
              role: 'ADMIN',
              status: 'ACTIVE'
            },
            select: {
              id: true
            }
          })
          
          // Create notifications for each admin
          const notificationPromises = adminUsers.map(admin => 
            tx.notification.create({
              data: {
                userId: admin.id,
                title: "New Account Approval Required",
                description: `${firstName} ${lastName} (${role}) has registered and requires approval.`,
                type: "ACCOUNT_APPROVAL",
                icon: "👤",
                linkTo: "/admin/users",
                relatedId: user.id
              }
            })
          )
          
          // Execute all notification creation promises
          await Promise.all(notificationPromises)
        }

        return user
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
    } catch (txError) {
      console.error('Transaction error during registration:', txError)
      return NextResponse.json({ error: "Failed to register user" }, { status: 500 })
    }
  } catch (error) {
    return handlePrismaError(error)
  }
} 