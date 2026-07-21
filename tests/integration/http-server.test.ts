import { Bot } from 'grammy';
import { describe, expect, it } from 'vitest';
import { createServer } from '../../src/server/http.js';

// Dummy bot instance — never started, never makes a network call. createServer()
// only reads its type for the (conditionally mounted) webhook route.
const bot = new Bot('123456:integration-test-dummy-token');

describe('HTTP server', () => {
  it('GET / reports that the service is running', async () => {
    const app = createServer(bot);
    const res = await app.request('/');
    expect(res.status).toBe(200);
    expect(await res.text()).toContain('running');
  });

  it('GET /health returns an ok status with a timestamp', async () => {
    const app = createServer(bot);
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string; timestamp: string };
    expect(body.status).toBe('ok');
    expect(new Date(body.timestamp).toString()).not.toBe('Invalid Date');
  });

  it('returns 404 for an unknown route', async () => {
    const app = createServer(bot);
    const res = await app.request('/does-not-exist');
    expect(res.status).toBe(404);
  });
});
