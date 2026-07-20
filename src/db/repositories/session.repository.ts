import type { StorageAdapter } from 'grammy';
import { prisma } from '../client.js';

/**
 * Persists grammY session + conversation state in Postgres instead of
 * memory, so state survives process restarts and redeploys (Render's
 * filesystem is ephemeral, and we run a single web-service instance).
 */
export function createPrismaSessionStorage<T>(): StorageAdapter<T> {
  return {
    async read(key: string): Promise<T | undefined> {
      const row = await prisma.botSession.findUnique({ where: { key } });
      return row ? (row.data as T) : undefined;
    },
    async write(key: string, value: T): Promise<void> {
      await prisma.botSession.upsert({
        where: { key },
        create: { key, data: value as object },
        update: { data: value as object },
      });
    },
    async delete(key: string): Promise<void> {
      await prisma.botSession.deleteMany({ where: { key } });
    },
  };
}
