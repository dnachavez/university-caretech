import { PrismaClient } from '../src/generated/prisma'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create test users if they don't exist
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@university.edu' },
    update: {},
    create: {
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      email: 'admin@university.edu',
      password: await hash('password123', 10),
      role: 'ADMIN',
      status: 'ACTIVE',
      emailVerified: true
    }
  })

  console.log('Created users:', { admin: adminUser.id })

  // Create consultation dates with time slots
  // Today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Tomorrow
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // Day after tomorrow
  const dayAfterTomorrow = new Date(today)
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)

  // Create consultation dates
  await createConsultationDate(today)
  await createConsultationDate(tomorrow)
  await createConsultationDate(dayAfterTomorrow)

  console.log('Database seeding completed!')
}

async function createConsultationDate(date: Date) {
  // Check if consultation date already exists for this date
  const existingDate = await prisma.consultationDate.findFirst({
    where: {
      date: {
        gte: new Date(date.setHours(0, 0, 0, 0)),
        lt: new Date(date.setHours(23, 59, 59, 999))
      }
    }
  })

  if (existingDate) {
    console.log(`Consultation date already exists for ${date.toDateString()}`)
    return
  }

  // Morning slots
  const morningSlots = [
    { startTime: '9:00 AM', endTime: '9:30 AM' },
    { startTime: '9:30 AM', endTime: '10:00 AM' },
    { startTime: '10:00 AM', endTime: '10:30 AM' },
    { startTime: '10:30 AM', endTime: '11:00 AM' },
    { startTime: '11:00 AM', endTime: '11:30 AM' },
    { startTime: '11:30 AM', endTime: '12:00 PM' }
  ]

  // Afternoon slots
  const afternoonSlots = [
    { startTime: '1:00 PM', endTime: '1:30 PM' },
    { startTime: '1:30 PM', endTime: '2:00 PM' },
    { startTime: '2:00 PM', endTime: '2:30 PM' },
    { startTime: '2:30 PM', endTime: '3:00 PM' },
    { startTime: '3:00 PM', endTime: '3:30 PM' },
    { startTime: '3:30 PM', endTime: '4:00 PM' },
    { startTime: '4:00 PM', endTime: '4:30 PM' }
  ]

  // Combine all slots
  const allSlots = [...morningSlots, ...afternoonSlots]

  // Create consultation date with time slots
  const consultationDate = await prisma.consultationDate.create({
    data: {
      date: date,
      timeSlots: {
        create: allSlots.map(slot => ({
          startTime: slot.startTime,
          endTime: slot.endTime,
          isAvailable: true
        }))
      }
    },
    include: {
      timeSlots: true
    }
  })

  console.log(`Created consultation date for ${date.toDateString()} with ${consultationDate.timeSlots.length} slots`)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 