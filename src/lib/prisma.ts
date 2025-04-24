import { PrismaClient, Prisma } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

// Updated type to allow for extended client
const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined
}

// Define client options for PostgreSQL
const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: [
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'warn' },
  ],
}

// Create client instance with Accelerate extension
function createPrismaClient() {
  return new PrismaClient(prismaClientOptions).$extends(withAccelerate())
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