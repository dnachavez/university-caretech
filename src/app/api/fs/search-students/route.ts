import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const lastName = searchParams.get("lastName") || ""
    const firstName = searchParams.get("firstName") || ""
    const middleInitial = searchParams.get("middleInitial") || ""

    // If no search parameters are provided, return an empty array
    if (!lastName && !firstName && !middleInitial) {
      return NextResponse.json([])
    }

    try {
      // Fetch all student health forms with user info to filter by role
      const students = await prisma.userHealthForm.findMany({
        select: {
          id: true,
          userId: true,
          lastName: true,
          firstName: true,
          middleInitial: true,
          gender: true,
          birthdate: true,
          user: {
            select: {
              username: true,
              role: true,
            }
          }
        },
        orderBy: {
          lastName: 'asc'
        },
        // Limit to 100 records maximum to prevent overloading
        take: 100
      })

      // Filter in memory for case-insensitive search and only student role
      const filteredStudents = students.filter(student => {
        try {
          // First check if this is a student record
          if (student.user.role !== 'STUDENT') {
            return false
          }
          
          const lastNameMatch = !lastName || student.lastName.toLowerCase().includes(lastName.toLowerCase())
          const firstNameMatch = !firstName || student.firstName.toLowerCase().includes(firstName.toLowerCase())
          const middleInitialMatch = !middleInitial || (student.middleInitial && student.middleInitial.toLowerCase().includes(middleInitial.toLowerCase()))
          
          return lastNameMatch && firstNameMatch && middleInitialMatch
        } catch (filterError) {
          console.error("Error filtering student:", filterError, student)
          // Skip this student if there's an error
          return false
        }
      })

      // Limit the results to 50 after filtering
      const limitedResults = filteredStudents.slice(0, 50)

      // Transform the data to include only the necessary fields
      // Format it to match the medical record table
      const formattedStudents = limitedResults.map((student) => {
        try {
          // Format birthdate
          const birthdate = new Date(student.birthdate)
          const formattedBirthdate = birthdate.toISOString().split('T')[0]
          
          return {
            id: student.userId, // Use userId as ID
            lastName: student.lastName,
            firstName: student.firstName,
            middleInitial: student.middleInitial || "",
            birthdate: formattedBirthdate,
            gender: student.gender
          }
        } catch (mapError) {
          console.error("Error formatting student:", mapError, student)
          // Skip this student if there's an error
          return null
        }
      }).filter(Boolean) // Remove any null entries

      return NextResponse.json(formattedStudents)
    } catch (dbError: any) {
      console.error("Database error:", dbError)
      return NextResponse.json(
        { error: "Database error: " + (dbError.message || "Unknown database error") },
        { status: 500 }
      )
    }
  } catch (error: any) {
    console.error("Error searching students:", error)
    return NextResponse.json(
      { error: "Failed to search students: " + (error.message || "Unknown error") },
      { status: 500 }
    )
  }
} 