import { PrismaClient, Prisma } from '../generated/prisma'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
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

// Create client instance with retry logic
function createPrismaClient() {
  const client = new PrismaClient(prismaClientOptions)
  client.$use(async (params, next) => {
    try {
      return await next(params)
    } catch (error: any) {
      // Check if it's a connection error or prepared statement error
      if (
        error.message?.includes('prepared statement') ||
        error.message?.includes('invalid buffer size') ||
        error.message?.includes('Utf8Error')
      ) {
        console.error('Database connection error detected, cleaning up client')
        // Force disconnect to clean up prepared statements
        await client.$disconnect()
        // Small delay before retrying
        await new Promise(resolve => setTimeout(resolve, 100))
        // Try one more time
        return next(params)
      }
      throw error
    }
  })
  return client
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