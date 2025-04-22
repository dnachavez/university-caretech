import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Get appointments for the authenticated user
export async function GET(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId
      },
      include: {
        timeSlot: {
          include: {
            consultationDate: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({ appointments }, { status: 200 })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Create a new appointment
export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { timeSlotId, consultationType, reasonForVisit, additionalNotes } = body

    if (!timeSlotId || !consultationType || !reasonForVisit) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if the time slot exists and is available
    const timeSlot = await prisma.timeSlot.findUnique({
      where: {
        id: timeSlotId,
        isAvailable: true
      }
    })

    if (!timeSlot) {
      return NextResponse.json({ error: 'Time slot not available or does not exist' }, { status: 400 })
    }

    // Start a transaction to ensure data consistency
    const appointment = await prisma.$transaction(async (tx) => {
      // Mark the time slot as unavailable
      await tx.timeSlot.update({
        where: {
          id: timeSlotId
        },
        data: {
          isAvailable: false
        }
      })

      // Create the appointment
      return await tx.appointment.create({
        data: {
          userId,
          timeSlotId,
          consultationType,
          reasonForVisit,
          additionalNotes: additionalNotes || null
        },
        include: {
          timeSlot: {
            include: {
              consultationDate: true
            }
          }
        }
      })
    })

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 