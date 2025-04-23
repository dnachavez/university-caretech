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
      },
      include: {
        consultationDate: true
      }
    })

    if (!timeSlot) {
      return NextResponse.json({ error: 'Time slot not available or does not exist' }, { status: 400 })
    }

    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Mark the time slot as unavailable
      await tx.timeSlot.update({
        where: {
          id: timeSlotId
        },
        data: {
          isAvailable: false
        }
      })

      // Get user information for notifications
      const user = await tx.user.findUnique({
        where: { id: userId },
        select: { firstName: true, lastName: true }
      })

      const studentName = user ? `${user.firstName} ${user.lastName}` : 'A student'

      // Create the appointment
      const appointment = await tx.appointment.create({
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

      // Format date for notifications
      const appointmentDate = new Date(timeSlot.consultationDate.date)
      const formattedDate = appointmentDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      // Get staff and admin users to notify
      const staffAdminUsers = await tx.user.findMany({
        where: {
          OR: [
            { role: "STAFF" },
            { role: "ADMIN" }
          ]
        },
        select: {
          id: true
        }
      })

      // Create notifications for staff and admin users
      const notificationPromises = staffAdminUsers.map((user) =>
        tx.notification.create({
          data: {
            userId: user.id,
            title: "New Appointment Request",
            description: `${studentName} has requested an appointment on ${formattedDate} at ${timeSlot.startTime} for ${consultationType}.`,
            type: "APPOINTMENT",
            icon: "🔔",
            linkTo: user.id === userId ? "/admin/appointments" : "/fs/appointments",
            relatedId: appointment.id
          }
        })
      )

      // Create confirmation notification for student
      await tx.notification.create({
        data: {
          userId,
          title: "Appointment Scheduled",
          description: `Your appointment has been scheduled for ${formattedDate} at ${timeSlot.startTime}. Waiting for confirmation.`,
          type: "APPOINTMENT",
          icon: "📅",
          linkTo: "/student/dashboard",
          relatedId: appointment.id
        }
      })

      // Execute all notification creation promises
      await Promise.all(notificationPromises)

      return appointment
    })

    return NextResponse.json({ appointment: result }, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 