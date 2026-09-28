import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';
import { DashboardPage } from '../src/pages/DashboardPage.js';

/**
 * Feature: US-01: Secure Lender Authentication & Role-Based Dashboard Access
 * Work Item: @ADO-5
 * Execution Mode: Hybrid BDD using Playwright test.step()
 */
test.describe('US-01: Lender Authentication & Identity Management (@ADO-5)', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
  });

  test('TC-01: Successful Authentication with Super Admin Credentials (@ADO-5)', async () => {
    await test.step('Given a lender navigates to the LoanPlatform Login page', async () => {
      await loginPage.goto();
    });

    await test.step('When the lender enters valid email "admin@loanplatform.com"', async () => {
      await loginPage.enterEmail('admin@loanplatform.com');
    });

    await test.step('And the lender enters valid password "admin123"', async () => {
      await loginPage.enterPassword('admin123');
    });

    await test.step('And the lender clicks the "Sign in" button', async () => {
      await loginPage.clickSignIn();
    });

    await test.step('Then the lender should be redirected to the main dashboard', async () => {
      await dashboardPage.verifyDashboardLoaded();
    });
  });

  test('TC-02: Prevent Login and Show Validation Errors on Empty Fields (@ADO-5)', async () => {
    await test.step('Given a lender is on the LoanPlatform Login page', async () => {
      await loginPage.goto();
    });

    await test.step('When the lender clicks "Sign in" without entering credentials', async () => {
      await loginPage.clickSignIn();
    });

    await test.step('Then validation error messages should be displayed on required fields', async () => {
      await loginPage.verifyValidationErrors();
    });
  });
});
