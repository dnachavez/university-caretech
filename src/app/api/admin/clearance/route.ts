import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/admin/clearance - Get all clearance requests (admin only)
export async function GET(req: NextRequest) {
  try {
    // Get user role from the URL parameters (in a real app, use session/token)
    const url = new URL(req.url);
    const role = url.searchParams.get('role');
    
    // Check admin authorization
    if (role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }
    
    // Get query parameters for filtering
    const status = url.searchParams.get('status') || undefined;
    const departmentId = url.searchParams.get('departmentId') || undefined;
    
    // Build where clause for filtering
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (departmentId) {
      where.departmentId = departmentId;
    }
    
    // Get all clearance requests with user details
    const clearanceRequests = await prisma.clearanceRequest.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            username: true,
            email: true,
            role: true
          }
        },
        department: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    // Return the clearance requests
    return NextResponse.json({ clearanceRequests }, { status: 200 });
  } catch (error) {
    console.error('Error fetching clearance requests:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/admin/clearance - Update a clearance request status
export async function PATCH(req: NextRequest) {
  try {
    // Get user role from the URL parameters (in a real app, use session/token)
    const url = new URL(req.url);
    const role = url.searchParams.get('role');
    
    // Check admin authorization
    if (role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized - Admin access required' }, { status: 401 });
    }
    
    // Parse request body
    const body = await req.json();
    const { id, status, additionalInfo } = body;
    
    if (!id) {
      return NextResponse.json({ error: 'Clearance request ID is required' }, { status: 400 });
    }
    
    if (!status || !['APPROVED', 'REJECTED', 'PENDING'].includes(status)) {
      return NextResponse.json({ error: 'Valid status is required (APPROVED, REJECTED, PENDING)' }, { status: 400 });
    }
    
    // Update the clearance request
    const updatedRequest = await prisma.clearanceRequest.update({
      where: { id },
      data: {
        status,
        additionalInfo: additionalInfo || undefined,
        updatedAt: new Date()
      }
    });
    
    return NextResponse.json({ clearanceRequest: updatedRequest }, { status: 200 });
  } catch (error) {
    console.error('Error updating clearance request:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 