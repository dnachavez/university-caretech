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
  
  // Add middleware for error handling and connection management
  client.$use(async (params, next) => {
    const MAX_RETRIES = 3;
    let retries = 0;
    
    while (retries < MAX_RETRIES) {
      try {
        return await next(params);
      } catch (error: any) {
        // Check if it's a connection error or prepared statement error
        if (
          error.message?.includes('prepared statement') ||
          error.message?.includes('invalid buffer size') ||
          error.message?.includes('Utf8Error') ||
          (error.code && error.code === '26000') // PostgreSQL error code for prepared statement issues
        ) {
          console.error(`Database connection error detected (attempt ${retries + 1}/${MAX_RETRIES}): ${error.message}`);
          
          // Force disconnect to clean up prepared statements
          try {
            await client.$disconnect();
          } catch (disconnectError) {
            console.error('Error during disconnect:', disconnectError);
          }
          
          // Increasing delay before retrying (exponential backoff)
          const delay = Math.pow(2, retries) * 100;
          await new Promise(resolve => setTimeout(resolve, delay));
          
          retries++;
          
          // If this was the last retry, throw the error
          if (retries >= MAX_RETRIES) {
            console.error('Max retries reached, failing operation');
            throw error;
          }
          
          // Continue to next retry iteration
          continue;
        }
        
        // Not a connection error, just throw it
        throw error;
      }
    }
    
    // This should never be reached due to the while loop, but TypeScript needs it
    throw new Error('Unexpected end of retry loop');
  });
  
  return client;
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

// Add extra cleanup handlers
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, async () => {
    console.log(`Received ${signal}, closing Prisma connection`);
    await prisma.$disconnect();
    process.exit(0);
  });
}); 