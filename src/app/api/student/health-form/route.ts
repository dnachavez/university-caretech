import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

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
      yearLevel,
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
      signaturePath
    } = body

    // Validate required fields
    if (!userId || !lastName || !firstName || !birthdate || !gender || !signaturePath) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
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
          yearLevel,
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
          signaturePath,
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
          yearLevel,
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
          signaturePath
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

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // Find the health form for the user
    const healthForm = await prisma.userHealthForm.findUnique({
      where: { userId }
    })

    if (!healthForm) {
      return NextResponse.json({ 
        success: true, 
        exists: false 
      })
    }

    return NextResponse.json({
      success: true,
      exists: true,
      healthForm
    })
  } catch (error) {
    console.error("Health form retrieval error:", error)
    return NextResponse.json({ error: "Failed to retrieve health form" }, { status: 500 })
  }
} 