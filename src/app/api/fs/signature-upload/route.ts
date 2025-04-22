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
    
    // Ensure directories exist
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'signatures')
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    
    // Create a unique filename
    const uniqueId = uuidv4()
    const fileName = `signature-fs-${userId}-${uniqueId}.png`
    const filePath = path.join(uploadDir, fileName)
    
    // Extract and save the image
    try {
      const imageBuffer = decodeBase64Image(signature)
      fs.writeFileSync(filePath, imageBuffer)
    } catch (error) {
      console.error("Error processing image:", error)
      return NextResponse.json({ error: "Invalid signature format" }, { status: 400 })
    }
    
    // Return the public URL path for the signature
    const publicPath = `/uploads/signatures/${fileName}`
    
    return NextResponse.json({ 
      success: true,
      signaturePath: publicPath
    })
    
  } catch (error) {
    console.error("Signature upload error:", error)
    return NextResponse.json({ error: "Failed to upload signature" }, { status: 500 })
  }
} 