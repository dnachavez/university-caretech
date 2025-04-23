import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'
import bcrypt from 'bcryptjs'

// Helper function for error handling
const handlePrismaError = (error: any) => {
  console.error('Reset password error:', error)
  return NextResponse.json({ error: 'Database connection error. Please try again.' }, { status: 500 })
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { password, confirmPassword, token } = body

    if (!password || !confirmPassword || !token) {
      return NextResponse.json({ 
        error: "Password, confirmation password, and token are required" 
      }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return NextResponse.json({ 
        error: "Passwords do not match" 
      }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ 
        error: "Password must be at least 8 characters long" 
      }, { status: 400 })
    }

    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 50))

    // Hash the token to compare with the stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    // Find the token in the database
    const storedToken = await prisma.passwordResetToken.findFirst({
      where: {
        token: hashedToken,
        expires: { gt: new Date() }
      }
    })

    if (!storedToken) {
      return NextResponse.json({ 
        error: "Invalid or expired token" 
      }, { status: 400 })
    }

    // Find the user with this email
    const user = await prisma.user.findUnique({
      where: { email: storedToken.email },
      select: {
        id: true,
        email: true
      }
    })

    if (!user) {
      return NextResponse.json({ 
        error: "User not found" 
      }, { status: 404 })
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10)

    try {
      // Use transaction to ensure data consistency
      await prisma.$transaction(async (tx) => {
        // Update the user's password
        await tx.user.update({
          where: { id: user.id },
          data: { password: hashedPassword }
        })

        // Delete the reset token
        await tx.passwordResetToken.delete({
          where: { id: storedToken.id }
        })
      })

      return NextResponse.json({ 
        success: true, 
        message: "Password has been reset successfully" 
      })
    } catch (txError) {
      console.error('Transaction error during password reset:', txError)
      return NextResponse.json(
        { error: "Failed to reset password" }, 
        { status: 500 }
      )
    }
  } catch (error) {
    return handlePrismaError(error)
  }
} 