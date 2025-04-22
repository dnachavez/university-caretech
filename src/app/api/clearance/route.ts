import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST /api/clearance - Submit a new clearance request
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { reason, otherReason, departmentId, purpose, dateNeeded, additionalInfo } = body;
    
    // Get user ID from the body or query params
    const url = new URL(req.url);
    const userId = body.userId || url.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - User ID is required' }, { status: 401 });
    }
    
    // Validate the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Validate required fields
    if (!reason) {
      return NextResponse.json({ error: 'Reason is required' }, { status: 400 });
    }
    
    if (reason === 'other' && !otherReason) {
      return NextResponse.json({ error: 'Other reason is required when reason is "other"' }, { status: 400 });
    }
    
    if (!departmentId) {
      return NextResponse.json({ error: 'Department is required' }, { status: 400 });
    }

    if (!purpose || purpose.trim().length < 10) {
      return NextResponse.json({ error: 'Purpose must be at least 10 characters' }, { status: 400 });
    }

    if (!dateNeeded) {
      return NextResponse.json({ error: 'Date needed is required' }, { status: 400 });
    }

    // Create the clearance request
    const clearanceRequest = await prisma.clearanceRequest.create({
      data: {
        userId,
        reason,
        otherReason: reason === 'other' ? otherReason : null,
        departmentId,
        purpose: purpose.trim(),
        dateNeeded: new Date(dateNeeded),
        additionalInfo: additionalInfo ? additionalInfo.trim() : null,
        status: 'PENDING'
      }
    });

    return NextResponse.json({ clearanceRequest }, { status: 201 });
  } catch (error) {
    console.error('Error creating clearance request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET /api/clearance - Get clearance requests for a user
export async function GET(req: NextRequest) {
  try {
    // Get user ID from the cookies set by the auth store
    const url = new URL(req.url);
    const userId = url.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized - User ID is required' }, { status: 401 });
    }

    // Validate the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Get the user's clearance requests
    const clearanceRequests = await prisma.clearanceRequest.findMany({
      where: {
        userId
      },
      include: {
        department: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ clearanceRequests }, { status: 200 });
  } catch (error) {
    console.error('Error fetching clearance requests:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 