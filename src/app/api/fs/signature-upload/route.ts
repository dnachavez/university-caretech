import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'
import path from 'path'
import { prisma } from '@/lib/prisma'

// Function to decode base64 data URI to Buffer
function decodeBase64Image(dataString: string) {
  const matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/)
  
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid input string')
  }
  
  return Buffer.from(matches[2], 'base64')
}

// Check if we're running in production (Vercel) or development
const isProduction = process.env.NODE_ENV === 'production'

export async function POST(req: NextRequest) {
  try {
    // Get signature data from request
    const body = await req.json()
    const { signature, userId } = body
    
    if (!signature) {
      return NextResponse.json({ error: "Signature is required" }, { status: 400 })
    }
    
    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }
    
    // Verify the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }
    
    // Check if the user has the appropriate role
    if (user.role !== 'FACULTY' && user.role !== 'STAFF') {
      return NextResponse.json({ error: "User is not a faculty or staff member" }, { status: 403 })
    }
    
    // Create a unique filename
    const uniqueId = uuidv4()
    const fileName = `signature-fs-${userId}-${uniqueId}.png`
    let publicPath = ''
    
    if (isProduction) {
      // For Vercel deployment, return a mock path without writing to filesystem
      publicPath = `/signatures/${fileName}`
    } else {
      // For local development, actually write the file to disk
      try {
        // Ensure directories exist
        const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'signatures')
        if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true })
        }
        
        const filePath = path.join(uploadDir, fileName)
        const imageBuffer = decodeBase64Image(signature)
        fs.writeFileSync(filePath, imageBuffer)
        
        // Return the public URL path for the signature
        publicPath = `/uploads/signatures/${fileName}`
      } catch (error) {
        console.error("Error processing image:", error)
        return NextResponse.json({ error: "Invalid signature format" }, { status: 400 })
      }
    }
    
    return NextResponse.json({ 
      success: true,
      signaturePath: publicPath
    })
    
  } catch (error) {
    console.error("Signature upload error:", error)
    return NextResponse.json({ error: "Failed to upload signature" }, { status: 500 })
  }
} 