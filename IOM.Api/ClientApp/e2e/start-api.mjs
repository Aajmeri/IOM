// Starts the real IOM.Api host for the Playwright suite (see playwright.config.ts `webServer`).
//
// 1. Drops the dedicated IOM_E2E LocalDB database, so every run starts from an empty schema
//    (Program.cs then applies the real migrations and seeds the admin@admin.com login). Without
//    this, orders from earlier runs would keep consuming delivery-slot capacity.
// 2. Runs the API in the "E2E" environment (appsettings.E2E.json) over plain HTTP, serving the
//    SPA that `npm run e2e` has just built into ../wwwroot.
import { spawn, spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const apiProject = resolve(here, '../../IOM.Api.csproj');
const port = process.env.E2E_PORT ?? '5020';

const drop = spawnSync('sqlcmd', [
  '-S', '(localdb)\\MSSQLLocalDB',
  '-b',
  '-Q', "IF DB_ID('IOM_E2E') IS NOT NULL BEGIN ALTER DATABASE [IOM_E2E] SET SINGLE_USER WITH ROLLBACK IMMEDIATE; DROP DATABASE [IOM_E2E]; END"
], { stdio: 'inherit' });

if (drop.error || drop.status !== 0) {
  console.warn('[e2e] Could not reset the IOM_E2E database with sqlcmd - continuing against the existing one. ' +
    'Tests that depend on free delivery slots may fail if earlier runs filled them.');
}

const api = spawn('dotnet', ['run', '--project', apiProject, '--no-launch-profile'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    ASPNETCORE_ENVIRONMENT: 'E2E',
    ASPNETCORE_URLS: `http://localhost:${port}`
  }
});

const stop = () => api.kill();
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
process.on('exit', stop);
api.on('exit', code => process.exit(code ?? 0));
