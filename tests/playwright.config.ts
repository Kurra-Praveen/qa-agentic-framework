import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for LoanPlatform E2E Automation
 * Optimized for Autonomous QA Agent & Live Client Demonstration
 */
export default defineConfig({
  testDir: './specs',
  fullyParallel: false,
  workers: 1, // Single worker for predictable, visible live narration
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on', // Capture complete traces for client drill-down
    screenshot: 'on', // Capture screenshots for report
    video: 'retain-on-failure',
    actionTimeout: 10000,
    navigationTimeout: 15000,
    headless: false, // Run in headed mode for live demo visibility
    launchOptions: {
      slowMo: 150, // Human-readable pacing for live demo visibility
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
