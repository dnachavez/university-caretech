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
      // Fetch the user's uploaded medical records
      const uploadedForms = await prisma.uploadedForm.findMany({
        where: {
          userId: userId
        },
        select: {
          id: true,
          userId: true,
          formType: true,
          filePath: true,
          notes: true,
          status: true,
          createdAt: true,
          updatedAt: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      })

      try {
        // Transform the records to ensure dates are serialized properly
        const formattedRecords = uploadedForms.map(record => {
          try {
            return {
              ...record,
              createdAt: record.createdAt.toISOString(),
              updatedAt: record.updatedAt.toISOString()
            }
          } catch (recordError: any) {
            console.error("Error formatting record:", recordError, record)
            // Skip this record if there's an error
            return null
          }
        }).filter(Boolean) // Remove any null entries

        return NextResponse.json(formattedRecords)
      } catch (formatError: any) {
        console.error("Error formatting records:", formatError)
        return NextResponse.json(
          { error: "Error formatting medical records: " + (formatError.message || "Unknown error") },
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
    console.error("Error fetching student medical records:", error)
    return NextResponse.json(
      { error: "Failed to fetch student medical records: " + (error.message || "Unknown error") },
      { status: 500 }
    )
  }
} 