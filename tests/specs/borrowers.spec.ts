import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage.js';
import { BorrowersPage } from '../src/pages/BorrowersPage.js';

const lenderAdminCredentials = {
  email: 'kpraveen@gmail.com',
  password: 'admin123',
};

function createBorrowerPayload() {
  const uniqueSuffix = Date.now().toString().slice(-6);

  return {
    fullName: `Rajesh Kumar ${uniqueSuffix}`,
    phone: `9${uniqueSuffix.padStart(9, '0')}`,
    email: `rajesh.${uniqueSuffix}@example.com`,
    idType: 'National ID',
    idNumber: `AADHAAR-${uniqueSuffix}`,
    monthlyIncome: '85000',
  };
}

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
      await loginPage.login(lenderAdminCredentials.email, lenderAdminCredentials.password);
    });
  });

  test('TC-01: Successfully onboard borrower with valid KYC details (@ADO-6)', async () => {
    const borrower = createBorrowerPayload();

    await test.step('Given the lender navigates to the Add Borrower page', async () => {
      await borrowersPage.gotoNew();
    });

    await test.step('When the lender fills in personal and KYC contact details', async () => {
      await borrowersPage.fillBorrowerForm(borrower);
    });

    await test.step('And the lender submits the borrower registration form', async () => {
      await borrowersPage.submitForm();
    });

    await test.step('Then the borrower details page should open with ACTIVE status and a risk band', async () => {
      await borrowersPage.verifyBorrowerDetails(borrower.fullName);
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

  test('TC-03: Reject invalid phone formats during onboarding (@ADO-6)', async () => {
    const borrower = createBorrowerPayload();

    await test.step('Given the lender is on the Add Borrower page', async () => {
      await borrowersPage.gotoNew();
    });

    await test.step('When the lender enters an invalid phone number with otherwise valid borrower details', async () => {
      await borrowersPage.fillBorrowerForm({
        ...borrower,
        phone: '987654321',
      });
    });

    await test.step('And the lender submits the borrower registration form', async () => {
      await borrowersPage.submitForm();
    });

    await test.step('Then borrower creation is blocked by phone validation', async () => {
      await borrowersPage.verifyPhoneValidation();
    });
  });

  test('TC-04: Allow onboarding without an email address (@ADO-6)', async () => {
    const borrower = createBorrowerPayload();

    await test.step('Given the lender navigates to the Add Borrower page', async () => {
      await borrowersPage.gotoNew();
    });

    await test.step('When the lender fills in the required borrower details and leaves email blank', async () => {
      await borrowersPage.fillBorrowerForm({
        ...borrower,
        email: undefined,
      });
    });

    await test.step('And the lender submits the borrower registration form', async () => {
      await borrowersPage.submitForm();
    });

    await test.step('Then the borrower details page should open with ACTIVE status and a risk band', async () => {
      await borrowersPage.verifyBorrowerDetails(borrower.fullName);
    });
  });
});
