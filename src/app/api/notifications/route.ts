import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/notifications - Get all notifications for a specific user with filters
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const userId = searchParams.get('userId')
    const type = searchParams.get('type')
    const unreadOnly = searchParams.get('unreadOnly') === 'true'
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }
    
    // Build query filters
    const filters: any = { userId }
    
    if (type) {
      filters.type = type
    }
    
    if (unreadOnly) {
      filters.read = false
    }
    
    const notifications = await prisma.notification.findMany({
      where: filters,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({ notifications }, { status: 200 })
  } catch (error) {
    console.error('Error fetching notifications:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/notifications - Create a new notification
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, title, description, type, icon, linkTo, relatedId } = body
    
    if (!userId || !title || !description || !type) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        description,
        type,
        icon,
        linkTo,
        relatedId
      }
    })
    
    return NextResponse.json({ notification }, { status: 201 })
  } catch (error) {
    console.error('Error creating notification:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 