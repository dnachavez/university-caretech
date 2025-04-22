import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    // Get all active consultation dates
    const consultationDates = await prisma.consultationDate.findMany({
      where: {
        isActive: true,
        date: {
          gte: new Date() // Only return future dates
        }
      },
      include: {
        timeSlots: {
          where: {
            isAvailable: true
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    })

    return NextResponse.json({ consultationDates }, { status: 200 })
  } catch (error) {
    console.error('Error fetching consultation dates:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Admin only endpoint to create consultation dates
export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Check if the request includes the user role (done by middleware)
    const userRole = req.headers.get('x-user-role')
    if (userRole !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { date, timeSlots } = body

    if (!date || !timeSlots || !Array.isArray(timeSlots) || timeSlots.length === 0) {
      return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
    }

    // Create the consultation date with time slots
    const consultationDate = await prisma.consultationDate.create({
      data: {
        date: new Date(date),
        timeSlots: {
          create: timeSlots.map((slot: { startTime: string, endTime: string }) => ({
            startTime: slot.startTime,
            endTime: slot.endTime,
            isAvailable: true
          }))
        }
      },
      include: {
        timeSlots: true
      }
    })

    return NextResponse.json({ consultationDate }, { status: 201 })
  } catch (error) {
    console.error('Error creating consultation date:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 