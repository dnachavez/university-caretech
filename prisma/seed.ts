import { PrismaClient } from '../src/generated/prisma'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seeding...')

  // Create admin user if it doesn't exist
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

  console.log('Created admin user:', adminUser.id)
  console.log('Database seeding completed!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 