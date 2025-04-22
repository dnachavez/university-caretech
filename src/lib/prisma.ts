import { PrismaClient } from '../generated/prisma'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient()

// Verify that the prisma client is properly connected and has the models
// Log the available models for debugging
console.log('Prisma client initialized with models:', Object.keys(prisma).filter(key => !key.startsWith('_') && !key.startsWith('$')))

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 