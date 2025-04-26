import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Check if we're running in production (Vercel) or development
const isProduction = process.env.NODE_ENV === 'production'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }
    
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Check if user is faculty or staff
    if (user.role !== 'FACULTY' && user.role !== 'STAFF') {
      return NextResponse.json({ error: 'User is not a faculty or staff member' }, { status: 403 })
    }
    
    // Check if health form exists for this user
    const healthForm = await prisma.userHealthForm.findUnique({
      where: { userId }
    })
    
    if (!healthForm) {
      return NextResponse.json({ 
        success: true, 
        exists: false,
        message: 'No health form found for this user' 
      })
    }
    
    return NextResponse.json({
      success: true,
      exists: true,
      healthForm
    })
    
  } catch (error) {
    console.error('Error fetching health form:', error)
    return NextResponse.json({ error: 'Failed to retrieve health form' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { 
      userId,
      lastName,
      firstName,
      middleInitial,
      birthdate,
      gender,
      birthPlace,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      departmentId,
      guardianName,
      guardianContact,
      emergencyContact,
      relationship,
      emergencyNumber,
      pastIllnesses,
      hospitalization,
      bloodType,
      allergies,
      immunized,
      communicableDisease,
      asthmatic,
      chronicIllness,
      hiking,
      dancing,
      swimming,
      basketball,
      ballgames,
      jogging,
      football,
      badminton,
      calisthenics,
      wallclimbing,
      notFitActivities,
      medicationPermission,
      signature,
      signaturePath
    } = body

    // Validate required fields
    if (!userId || !lastName || !firstName || !birthdate || !gender || !signature) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Use the provided signature path or create a new one if not provided
    let finalSignaturePath = signaturePath
    if (!finalSignaturePath) {
      const uniqueId = new Date().getTime().toString()
      finalSignaturePath = `/signatures/faculty-${userId}-${uniqueId}.png`
    }

    // In production, you might want to store the actual signature data too 
    // (but this would require a schema change)
    if (isProduction) {
      // Future feature: Store the signature data in a dedicated table
      // For now, just using the path reference
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    // Check if user is faculty or staff
    if (user.role !== 'FACULTY' && user.role !== 'STAFF') {
      return NextResponse.json({ error: 'User is not a faculty or staff member' }, { status: 403 })
    }

    // Check if health form already exists for this user
    const existingForm = await prisma.userHealthForm.findUnique({
      where: { userId }
    })

    let healthForm
    if (existingForm) {
      // Update existing form
      healthForm = await prisma.userHealthForm.update({
        where: { userId },
        data: {
          lastName,
          firstName,
          middleInitial,
          birthdate: new Date(birthdate),
          gender,
          birthPlace,
          addressLine1,
          addressLine2,
          city,
          state,
          postalCode,
          departmentId,
          guardianName,
          guardianContact,
          emergencyContact,
          relationship,
          emergencyNumber,
          pastIllnesses,
          hospitalization,
          bloodType,
          allergies,
          immunized,
          communicableDisease,
          asthmatic,
          chronicIllness,
          hiking,
          dancing,
          swimming,
          basketball,
          ballgames,
          jogging,
          football,
          badminton,
          calisthenics,
          wallclimbing,
          notFitActivities,
          medicationPermission,
          signaturePath: finalSignaturePath,
          dateSigned: new Date()
        }
      })
    } else {
      // Create new form
      healthForm = await prisma.userHealthForm.create({
        data: {
          userId,
          lastName,
          firstName,
          middleInitial,
          birthdate: new Date(birthdate),
          gender,
          birthPlace,
          addressLine1,
          addressLine2,
          city,
          state,
          postalCode,
          departmentId,
          guardianName,
          guardianContact,
          emergencyContact,
          relationship,
          emergencyNumber,
          pastIllnesses,
          hospitalization,
          bloodType,
          allergies,
          immunized,
          communicableDisease,
          asthmatic,
          chronicIllness,
          hiking,
          dancing,
          swimming,
          basketball,
          ballgames,
          jogging,
          football,
          badminton,
          calisthenics,
          wallclimbing,
          notFitActivities,
          medicationPermission,
          signaturePath: finalSignaturePath
        }
      })
    }

    return NextResponse.json({
      success: true,
      healthForm
    })
  } catch (error) {
    console.error("Health form submission error:", error)
    return NextResponse.json({ error: "Failed to save health form" }, { status: 500 })
  }
} 