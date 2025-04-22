import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const userId = params.userId

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      )
    }

    try {
      // Fetch the user health form data
      const healthForm = await prisma.userHealthForm.findUnique({
        where: {
          userId: userId
        },
        include: {
          user: {
            select: {
              username: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true
            }
          }
        }
      })

      if (!healthForm) {
        return NextResponse.json(
          { error: "Health form not found for this user" },
          { status: 404 }
        )
      }

      try {
        // Transform dates to ISO strings for serialization
        const formattedHealthForm = {
          id: healthForm.id,
          userId: healthForm.userId,
          lastName: healthForm.lastName,
          firstName: healthForm.firstName,
          middleInitial: healthForm.middleInitial,
          birthdate: healthForm.birthdate.toISOString(),
          gender: healthForm.gender,
          birthPlace: healthForm.birthPlace,
          addressLine1: healthForm.addressLine1,
          addressLine2: healthForm.addressLine2,
          city: healthForm.city,
          state: healthForm.state,
          postalCode: healthForm.postalCode,
          guardianName: healthForm.guardianName,
          guardianContact: healthForm.guardianContact,
          emergencyContact: healthForm.emergencyContact,
          relationship: healthForm.relationship,
          emergencyNumber: healthForm.emergencyNumber,
          bloodType: healthForm.bloodType,
          signaturePath: healthForm.signaturePath,
          dateSigned: healthForm.dateSigned.toISOString(),
          pastIllnesses: healthForm.pastIllnesses,
          hospitalization: healthForm.hospitalization,
          medications: healthForm.medications,
          allergies: healthForm.allergies,
          immunized: healthForm.immunized,
          communicableDisease: healthForm.communicableDisease,
          asthmatic: healthForm.asthmatic,
          chronicIllness: healthForm.chronicIllness,
          hiking: healthForm.hiking,
          dancing: healthForm.dancing,
          swimming: healthForm.swimming,
          basketball: healthForm.basketball,
          ballgames: healthForm.ballgames,
          jogging: healthForm.jogging,
          football: healthForm.football,
          badminton: healthForm.badminton,
          calisthenics: healthForm.calisthenics,
          wallclimbing: healthForm.wallclimbing,
          notFitActivities: healthForm.notFitActivities,
          medicationPermission: healthForm.medicationPermission,
          user: {
            username: healthForm.user.username,
            email: healthForm.user.email,
            firstName: healthForm.user.firstName,
            lastName: healthForm.user.lastName,
            role: healthForm.user.role
          }
        }

        return NextResponse.json(formattedHealthForm)
      } catch (formatError: any) {
        console.error("Error formatting health form data:", formatError)
        return NextResponse.json(
          { error: "Error formatting health form data: " + (formatError.message || "Unknown error") },
          { status: 500 }
        )
      }
    } catch (dbError: any) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Database error: " + (dbError.message || "Unknown database error") },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error("Error fetching student health form:", error)
    return NextResponse.json(
      { error: "Failed to fetch student health form: " + (error.message || "Unknown error") },
      { status: 500 }
    )
  }
} 