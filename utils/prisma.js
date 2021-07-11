import { PrismaClient } from '@prisma/client';

/**
 * @type PrismaClient
 */
let prisma;

// https://github.com/prisma/prisma-client-js/issues/228#issuecomment-618433162
// https://github.com/vercel/next.js/issues/7811#issuecomment-618425485
// https://github.com/prisma/prisma-client-js/issues/730
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // Ensure the prisma instance is re-used during hot-reloading
  // Otherwise, a new client will be created on every reload
  global['prisma'] = global['prisma'] || new PrismaClient();
  prisma = global['prisma'];
}

export default prisma;
