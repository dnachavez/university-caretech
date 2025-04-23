import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/notifications/[id]/read - Mark a specific notification as read
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const notificationId = params.id
    
    if (!notificationId) {
      return NextResponse.json({ error: 'Notification ID is required' }, { status: 400 })
    }
    
    const updatedNotification = await prisma.notification.update({
      where: { id: notificationId },
      data: { read: true }
    })
    
    return NextResponse.json({ notification: updatedNotification, success: true }, { status: 200 })
  } catch (error) {
    console.error('Error marking notification as read:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 