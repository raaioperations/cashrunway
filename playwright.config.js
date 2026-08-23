import { defineConfig } from '@playwright/test';

const baseURL = process.env.BASE_URL ?? 'http://127.0.0.1:9879';

export default defineConfig({
  testDir: './tests',
  testMatch: /(offline|production)\.runtime\.spec\.js/,
  timeout: 30000,
  use: { baseURL, serviceWorkers: 'allow', channel: 'msedge', headless: true },
  webServer: process.env.BASE_URL ? undefined : { command: 'python3 -m http.server 9879 --bind 127.0.0.1', port: 9879, reuseExistingServer: true }
});
