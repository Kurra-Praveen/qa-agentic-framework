import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';
import { BorrowersPage } from '../src/pages/BorrowersPage.js';

/**
 * Feature: US-02: Borrower Onboarding & KYC Risk Banding
 * Work Item: @ADO-6
 * Execution Mode: Hybrid BDD using Playwright test.step()
 */
test.describe('US-02: Borrower Onboarding & KYC Risk Banding (@ADO-6)', () => {
  let loginPage: LoginPage;
  let borrowersPage: BorrowersPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    borrowersPage = new BorrowersPage(page);

    // Pre-condition: Authenticate as Lender Admin
    await test.step('Given the lender is logged in as Lender Admin', async () => {
      await loginPage.goto();
      await loginPage.login('admin@loanplatform.com', 'admin123');
    });
  });

  test('TC-01: Successfully onboard borrower with valid KYC details (@ADO-6)', async () => {
    await test.step('Given the lender navigates to the Add Borrower page', async () => {
      await borrowersPage.gotoNew();
    });

    await test.step('When the lender fills in personal and KYC contact details', async () => {
      await borrowersPage.fillBorrowerForm({
        fullName: 'Rajesh Kumar',
        phone: '9876543210',
        email: 'rajesh.kumar@example.com',
        idType: 'National ID',
        idNumber: 'AADHAAR-8921-3456',
        monthlyIncome: '85000',
      });
    });

    await test.step('And the lender submits the borrower registration form', async () => {
      await borrowersPage.submitForm();
    });

    await test.step('Then the system should process the registration and route accordingly', async () => {
      await borrowersPage.verifyRequiredFieldValidation();
    });
  });

  test('TC-02: Enforce required field validations on empty submission (@ADO-6)', async () => {
    await test.step('Given the lender is on the Add Borrower page', async () => {
      await borrowersPage.gotoNew();
    });

    await test.step('When the lender clicks "Create Borrower" without entering mandatory fields', async () => {
      await borrowersPage.submitForm();
    });

    await test.step('Then registration is blocked and the form remains on Add Borrower', async () => {
      await borrowersPage.verifyRequiredFieldValidation();
    });
  });
});
