import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Cancel an appointment
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = req.headers.get('x-user-id')
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const appointmentId = params.id
    
    // Find the appointment and verify ownership
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
        userId
      },
      include: {
        timeSlot: true
      }
    })
    
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found or you do not have permission to cancel it' }, { status: 404 })
    }
    
    // Can only cancel if status is SCHEDULED
    if (appointment.status !== 'SCHEDULED') {
      return NextResponse.json({ error: 'Only pending appointments can be cancelled' }, { status: 400 })
    }

    // Start a transaction to ensure data consistency
    const result = await prisma.$transaction(async (tx) => {
      // Update the appointment status to CANCELLED
      const cancelledAppointment = await tx.appointment.update({
        where: {
          id: appointmentId
        },
        data: {
          status: 'CANCELLED'
        },
        include: {
          timeSlot: {
            include: {
              consultationDate: true
            }
          }
        }
      })

      // Make the time slot available again
      await tx.timeSlot.update({
        where: {
          id: appointment.timeSlotId
        },
        data: {
          isAvailable: true
        }
      })
      
      return cancelledAppointment
    })

    return NextResponse.json({ appointment: result }, { status: 200 })
  } catch (error) {
    console.error('Error cancelling appointment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 