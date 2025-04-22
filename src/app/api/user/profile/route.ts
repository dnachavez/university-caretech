import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, firstName, lastName, currentPassword, newPassword } = body

    // Validate required fields
    if (!userId || !firstName || !lastName) {
      return NextResponse.json({ error: "User ID, first name, and last name are required" }, { status: 400 })
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Prepare update data
    const updateData: any = {
      firstName,
      lastName
    }

    // If attempting to change password, validate current password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ 
          error: "Current password is required to change password" 
        }, { status: 400 })
      }

      // Verify current password
      const isValidPassword = await bcrypt.compare(currentPassword, user.password)
      if (!isValidPassword) {
        return NextResponse.json({ 
          error: "Current password is incorrect" 
        }, { status: 401 })
      }

      // Hash new password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)
      updateData.password = hashedPassword
    }

    // Update user data
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        status: true
      }
    })

    return NextResponse.json({
      success: true,
      user: updatedUser,
      message: "Profile updated successfully"
    }, { status: 200 })

  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 })
  }
} 