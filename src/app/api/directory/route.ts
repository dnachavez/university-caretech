import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const departmentId = searchParams.get('departmentId')

    if (!departmentId) {
      return NextResponse.json({ error: 'Department ID is required' }, { status: 400 })
    }

    // Check if the department exists
    const department = await prisma.department.findUnique({
      where: { id: departmentId }
    })

    if (!department) {
      return NextResponse.json({ error: 'Department not found' }, { status: 404 })
    }

    // Fetch students organized by year level
    const firstYearStudents = await prisma.user.findMany({
      where: {
        departmentId,
        role: 'STUDENT',
        yearLevel: '1st Year'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        yearLevel: true,
        healthForm: {
          select: {
            id: true,
            middleInitial: true,
            gender: true,
            birthdate: true
          }
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    })

    const secondYearStudents = await prisma.user.findMany({
      where: {
        departmentId,
        role: 'STUDENT',
        yearLevel: '2nd Year'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        yearLevel: true,
        healthForm: {
          select: {
            id: true,
            middleInitial: true,
            gender: true,
            birthdate: true
          }
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    })

    const thirdYearStudents = await prisma.user.findMany({
      where: {
        departmentId,
        role: 'STUDENT',
        yearLevel: '3rd Year'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        yearLevel: true,
        healthForm: {
          select: {
            id: true,
            middleInitial: true,
            gender: true,
            birthdate: true
          }
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    })

    const fourthYearStudents = await prisma.user.findMany({
      where: {
        departmentId,
        role: 'STUDENT',
        yearLevel: '4th Year'
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        yearLevel: true,
        healthForm: {
          select: {
            id: true,
            middleInitial: true,
            gender: true,
            birthdate: true
          }
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    })

    // Fetch faculty members alphabetically
    const faculty = await prisma.user.findMany({
      where: {
        departmentId,
        role: 'FACULTY',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        healthForm: {
          select: {
            id: true,
            middleInitial: true,
            gender: true,
            birthdate: true
          }
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    })

    // Fetch staff members alphabetically
    const staff = await prisma.user.findMany({
      where: {
        departmentId,
        role: 'STAFF',
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
        healthForm: {
          select: {
            id: true,
            middleInitial: true,
            gender: true,
            birthdate: true
          }
        }
      },
      orderBy: {
        lastName: 'asc'
      }
    })

    return NextResponse.json({
      department,
      students: {
        firstYear: firstYearStudents,
        secondYear: secondYearStudents,
        thirdYear: thirdYearStudents,
        fourthYear: fourthYearStudents
      },
      faculty,
      staff
    })
  } catch (error) {
    console.error('Error fetching directory:', error)
    return NextResponse.json(
      { error: 'Failed to fetch directory' },
      { status: 500 }
    )
  }
} 