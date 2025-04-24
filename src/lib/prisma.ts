import { PrismaClient, Prisma } from '../generated/prisma'
import { withAccelerate } from '@prisma/extension-accelerate'

// Define the global type for Prisma client
declare global {
  var prisma: ReturnType<typeof createPrismaClient> | undefined
}

// Define custom client options with connection pooling settings
const prismaClientOptions: Prisma.PrismaClientOptions = {
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  // Configure logging
  log: [
    { emit: 'stdout', level: 'error' },
    { emit: 'stdout', level: 'warn' },
  ],
}

// Create client instance with Accelerate extension
function createPrismaClient() {
  const client = new PrismaClient(prismaClientOptions).$extends(withAccelerate())
  return client
}

// Use global instance in development to prevent multiple client instances
export const prisma = global.prisma ?? createPrismaClient()

// Log that the prisma client is properly initialized
console.log('Prisma client initialized with models:', Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')))

if (process.env.NODE_ENV !== 'production') global.prisma = prisma 

// Handle disconnection on server shutdown
if (process.env.NODE_ENV === 'production') {
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
} 