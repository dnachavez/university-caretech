import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    // Try to get the first consultation date
    const firstDate = await prisma.consultationDate.findFirst()
    
    // Get count of consultation dates
    const countDates = await prisma.consultationDate.count()
    
    // Check if the prisma client is properly initialized
    const allModels = Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$'))
    
    return NextResponse.json({
      firstDate,
      countDates,
      availableModels: allModels,
      prismaEntityStatus: {
        hasConsultationDate: !!prisma.consultationDate,
        hasTimeSlot: !!prisma.timeSlot,
        hasAppointment: !!prisma.appointment
      }
    }, { status: 200 })
  } catch (error) {
    console.error('Debug error:', error)
    return NextResponse.json({ error: 'Internal server error', details: String(error) }, { status: 500 })
  }
} 