import { defineConfig, devices } from '@playwright/test';

const port = process.env.E2E_PORT ?? '5020';
const baseURL = `http://localhost:${port}`;

/**
 * Browser end-to-end tests against the real ASP.NET Core API + built Angular SPA + SQL Server
 * LocalDB (database IOM_E2E, reset on every run). Run with `npm run e2e`, which builds the SPA
 * into ../wwwroot first. See e2e/start-api.mjs.
 */
export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.e2e.ts',
  // One worker: every test shares one database, and delivery slots have limited capacity.
  workers: 1,
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  timeout: 60_000,
  expect: { timeout: 10_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ...devices['Desktop Chrome']
  },
  webServer: {
    command: 'node e2e/start-api.mjs',
    url: `${baseURL}/login`,
    // First start includes `dotnet run`'s build and applying every migration to a fresh database.
    timeout: 240_000,
    reuseExistingServer: false,
    stdout: 'ignore',
    stderr: 'pipe'
  }
});
