import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

// Helper function for error handling
const handlePrismaError = (error: any) => {
  console.error('Verification error:', error)
  return NextResponse.json({ error: 'Database connection error. Please try again.' }, { status: 500 })
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const token = url.searchParams.get('token')

    if (!token) {
      return NextResponse.json({ error: "Missing verification token" }, { status: 400 })
    }

    // Add a slight delay to prevent connection flood
    await new Promise(resolve => setTimeout(resolve, 50))

    // Hash the token to compare with the stored hash
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex')

    // Find the token in the database
    const storedToken = await prisma.verificationToken.findFirst({
      where: {
        token: hashedToken,
        expires: { gt: new Date() }
      }
    })

    if (!storedToken) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 })
    }

    // Find the user with this token
    const user = await prisma.user.findFirst({
      where: {
        email: storedToken.email,
        verificationToken: hashedToken
      }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    try {
      // Use transaction to ensure all operations succeed or fail together
      await prisma.$transaction(async (tx) => {
        // Update user status based on role
        if (user.role === 'FACULTY' || user.role === 'STAFF') {
          // For faculty/staff, set status to pending approval
          await tx.user.update({
            where: { id: user.id },
            data: {
              status: 'PENDING_APPROVAL',
              emailVerified: true,
              verificationToken: null
            }
          })
        } else {
          // For students and admins, set status to active
          await tx.user.update({
            where: { id: user.id },
            data: {
              status: 'ACTIVE',
              emailVerified: true,
              verificationToken: null
            }
          })
        }

        // Delete the verification token
        await tx.verificationToken.delete({
          where: { id: storedToken.id }
        })
      })

      // Redirect to auth page with verification status and role
      const needsApproval = user.role === 'FACULTY' || user.role === 'STAFF'
      const statusMessage = needsApproval ? 'approval_required' : 'verified'
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/auth?verification=${statusMessage}&role=${user.role.toLowerCase()}`
      )
    } catch (txError) {
      console.error('Transaction error during verification:', txError)
      return NextResponse.json({ error: "Failed to verify email" }, { status: 500 })
    }
  } catch (error) {
    return handlePrismaError(error)
  }
} 