import { PrismaClient, Prisma } from '../generated/prisma'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// Define client options for SQLite
const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: [
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'warn' },
  ],
}

// Create client instance
function createPrismaClient() {
  return new PrismaClient(prismaClientOptions)
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

// Log that the prisma client is properly initialized
console.log('Prisma client initialized with models:', Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')))

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 

// Handle disconnection on server shutdown
if (process.env.NODE_ENV === 'production') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
} 