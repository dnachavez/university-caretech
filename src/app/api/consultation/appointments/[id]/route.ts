import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Update an appointment by ID
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
      return NextResponse.json({ error: 'Appointment not found or you do not have permission to update it' }, { status: 404 })
    }
    
    // Can only update if status is SCHEDULED
    if (appointment.status !== 'SCHEDULED') {
      return NextResponse.json({ error: 'Only pending appointments can be updated' }, { status: 400 })
    }

    // Get data from request body
    const body = await req.json()
    const { consultationType, reasonForVisit, additionalNotes, timeSlotId } = body

    // Validate required fields
    if (!consultationType || !reasonForVisit) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // If timeSlotId is provided, check if it's available
    let newTimeSlot
    if (timeSlotId) {
      newTimeSlot = await prisma.timeSlot.findUnique({
        where: {
          id: timeSlotId,
          isAvailable: true
        }
      })
      
      if (!newTimeSlot) {
        return NextResponse.json({ error: 'Selected time slot is not available' }, { status: 400 })
      }
    }
    
    // Start a transaction to ensure data consistency when changing time slots
    if (timeSlotId) {
      const result = await prisma.$transaction(async (tx) => {
        // First, free up the old time slot
        await tx.timeSlot.update({
          where: {
            id: appointment.timeSlotId
          },
          data: {
            isAvailable: true
          }
        })
        
        // Then, reserve the new time slot
        await tx.timeSlot.update({
          where: {
            id: timeSlotId
          },
          data: {
            isAvailable: false
          }
        })
        
        // Finally, update the appointment with new time slot and details
        const updatedAppointment = await tx.appointment.update({
          where: {
            id: appointmentId
          },
          data: {
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
        
        return updatedAppointment
      })
      
      return NextResponse.json({ appointment: result }, { status: 200 })
    } else {
      // Just update appointment details without changing the time slot
      const updatedAppointment = await prisma.appointment.update({
        where: {
          id: appointmentId
        },
        data: {
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

      return NextResponse.json({ appointment: updatedAppointment }, { status: 200 })
    }
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
} 