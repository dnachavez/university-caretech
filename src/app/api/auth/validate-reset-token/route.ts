import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import crypto from 'crypto'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const token = url.searchParams.get('token')

    if (!token) {
      return NextResponse.json({ 
        valid: false, 
        error: "Missing token" 
      }, { status: 400 })
    }

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
        valid: false, 
        error: "Invalid or expired token" 
      })
    }

    return NextResponse.json({ 
      valid: true, 
      email: storedToken.email 
    })

  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json({ 
      valid: false, 
      error: "Failed to validate token" 
    }, { status: 500 })
  }
} 