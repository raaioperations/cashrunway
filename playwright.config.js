import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: /offline\.runtime\.spec\.js/,
  timeout: 30000,
  use: { baseURL: 'http://127.0.0.1:9879', serviceWorkers: 'allow', channel: 'msedge', headless: true },
  webServer: { command: 'python3 -m http.server 9879 --bind 127.0.0.1', port: 9879, reuseExistingServer: true }
});
