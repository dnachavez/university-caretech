import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import crypto from 'crypto'

// Helper function for error handling
const handlePrismaError = (error: any) => {
  console.error('Forgot password error:', error)
  return NextResponse.json({ error: 'Database connection error. Please try again.' }, { status: 500 })
}

// Generate password reset email HTML
function generatePasswordResetEmail(name: string, resetLink: string) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #166cbb;">Reset Your University CareTeam Password</h2>
      <p>Hello ${name},</p>
      <p>We received a request to reset your password for your University CareTeam account. Click the button below to reset your password.</p>
      
      <div style="text-align: center; margin: 25px 0;">
        <a href="${resetLink}" style="background-color: #166cbb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          Reset Password
        </a>
      </div>
      
      <p>If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
      <p style="word-break: break-all; color: #666;">${resetLink}</p>
      
      <p>This link will expire in 1 hour. If you did not request a password reset, you can safely ignore this email.</p>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
        <p>This is an automated email. Please do not reply.</p>
      </div>
    </div>
  `
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 50))

    // Find the user by email
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true
      }
    })

    if (!user) {
      // We don't want to reveal if a user exists or not for security reasons
      // So we return success even if the user doesn't exist
      return NextResponse.json({ success: true })
    }

    // Generate a random token
    const resetToken = crypto.randomBytes(32).toString('hex')
    
    // Hash token for storage
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    
    // Set expiry (1 hour from now)
    const expires = new Date(Date.now() + 3600000)
    
    try {
      // Use transaction to ensure data consistency
      await prisma.$transaction(async (tx) => {
        // Check if there's an existing token for this email
        const existingToken = await tx.passwordResetToken.findUnique({
          where: { email }
        })

        // Delete existing token if it exists
        if (existingToken) {
          await tx.passwordResetToken.delete({
            where: { id: existingToken.id }
          })
        }
        
        // Create a new token
        await tx.passwordResetToken.create({
          data: {
            email,
            token: hashedToken,
            expires
          }
        })
      })
      
      // Create reset URL with the unhashed token
      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`

      // Send email
      await sendEmail({
        to: email,
        subject: "Reset Your University CareTeam Password",
        html: generatePasswordResetEmail(`${user.firstName} ${user.lastName}`, resetUrl)
      })

      return NextResponse.json({ success: true })
    } catch (txError) {
      console.error('Transaction error during password reset:', txError)
      return NextResponse.json(
        { error: "Failed to process forgot password request" }, 
        { status: 500 }
      )
    }
  } catch (error) {
    return handlePrismaError(error)
  }
} 