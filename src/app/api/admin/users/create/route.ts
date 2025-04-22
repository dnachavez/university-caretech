import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"
import bcrypt from "bcryptjs"

const userCreateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  username: z.string().min(3),
  role: z.enum(['STUDENT', 'FACULTY', 'STAFF']),
  departmentId: z.string().optional(),
  yearLevel: z.string().optional()
})

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request body
    const body = await req.json()
    const validationResult = userCreateSchema.safeParse(body)
    
    if (!validationResult.success) {
      return NextResponse.json({ error: "Invalid input", details: validationResult.error.format() }, { status: 400 })
    }
    
    const { firstName, lastName, email, username, role, departmentId, yearLevel } = validationResult.data
    
    // Check if user with email or username already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })
    
    if (existingUser) {
      return NextResponse.json({ 
        error: existingUser.email === email ? "Email already in use" : "Username already taken" 
      }, { status: 400 })
    }
    
    // Generate a temporary password
    const temporaryPassword = `${firstName.toLowerCase()}123`
    const hashedPassword = await bcrypt.hash(temporaryPassword, 10)
    
    // We'll use a transaction to ensure both user creation and health form creation succeed together
    const result = await prisma.$transaction(async (tx) => {
      // Create user first
      const user = await tx.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
          role: role.toUpperCase(),
          status: 'ACTIVE',
          emailVerified: true
        }
      });
      
      // Get current date for defaults
      const defaultDate = new Date();
      
      // Create health form if departmentId is provided using the proper model name
      if (departmentId) {
        await tx.userHealthForm.create({
          data: {
            userId: user.id,
            firstName,
            lastName,
            birthdate: defaultDate,
            gender: "Not Specified",
            birthPlace: "Not Specified",
            addressLine1: "Not Specified",
            city: "Not Specified",
            state: "Not Specified",
            postalCode: "00000",
            emergencyContact: "Not Specified",
            relationship: "Not Specified",
            emergencyNumber: "Not Specified",
            signaturePath: "",
            dateSigned: defaultDate,
            departmentId: departmentId,
            yearLevel: yearLevel || undefined,
            allergies: false,
            immunized: false,
            communicableDisease: false,
            asthmatic: false,
            chronicIllness: false,
            hiking: false,
            dancing: false,
            swimming: false,
            basketball: false,
            ballgames: false,
            jogging: false,
            football: false,
            badminton: false,
            calisthenics: false,
            wallclimbing: false,
            medicationPermission: false
          }
        });
      }
      
      return user;
    });
    
    return NextResponse.json({ 
      success: true, 
      message: "User created successfully with temporary health form data. User needs to complete their health form.",
      user: {
        id: result.id,
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        username: result.username,
        role: result.role,
        status: result.status,
        departmentId: departmentId || null,
        yearLevel: yearLevel || null
      },
      temporaryPassword,
      notes: "The user has been provisioned with a minimal health form. They should be instructed to complete their health form information as soon as possible."
    })
    
  } catch (error) {
    console.error("Error creating user:", error)
    // More specific error message
    const errorMessage = error instanceof Error ? error.message : "Failed to create user"
    return NextResponse.json({ 
      error: "Failed to create user and assign to department", 
      details: errorMessage 
    }, { status: 500 })
  }
} 