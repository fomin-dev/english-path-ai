import { PrismaClient } from '@prisma/client';
import { isProduction } from '../config/env.js';

declare global {
  var __prisma__: PrismaClient | undefined;
}

// Reuse a single instance across tsx watch reloads in dev to avoid
// exhausting the Postgres connection pool.
export const prisma =
  globalThis.__prisma__ ??
  new PrismaClient({
    log: isProduction ? ['error', 'warn'] : ['warn'],
  });

if (!isProduction) {
  globalThis.__prisma__ = prisma;
}
