import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * BorrowersPage: Page Object for LoanPlatform Borrower Management & Onboarding (/borrowers, /borrowers/new)
 * Strictly adheres to Playwright Level 1 (getByRole) & Level 2 (getByLabel) semantic locators
 */
export class BorrowersPage extends BasePage {
  // Locators - Borrower List
  readonly borrowersHeading: Locator;
  readonly addBorrowerButton: Locator;
  readonly searchInput: Locator;

  // Locators - New Borrower Form
  readonly formHeading: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly genderSelect: Locator;
  readonly idTypeSelect: Locator;
  readonly idNumberInput: Locator;
  readonly monthlyIncomeInput: Locator;
  readonly createBorrowerButton: Locator;
  readonly cancelButton: Locator;
  readonly statusValue: Locator;
  readonly riskBandValue: Locator;

  constructor(page: Page) {
    super(page);

    // List Page
    this.borrowersHeading = page.getByRole('heading', { name: 'Borrowers' });
    this.addBorrowerButton = page.getByRole('button', { name: 'Add Borrower' });
    this.searchInput = page.getByPlaceholder('Search by name, email, or phone...');

    // Onboarding Form
    this.formHeading = page.getByRole('heading', { name: 'Add New Borrower' });
    this.fullNameInput = page.getByLabel('Full Name*');
    this.phoneInput = page.getByLabel('Phone Number*');
    this.emailInput = page.getByLabel('Email');
    this.genderSelect = page.getByRole('combobox').first();
    this.idTypeSelect = page.getByRole('combobox').nth(1);
    this.idNumberInput = page.getByLabel('ID Number');
    this.monthlyIncomeInput = page.getByLabel('Monthly Income');
    this.createBorrowerButton = page.getByRole('button', { name: 'Create Borrower' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.statusValue = page.getByText(/ACTIVE/i).first();
    this.riskBandValue = page.getByText(/LOW|MEDIUM|HIGH/i).first();
  }

  /**
   * Navigate directly to the Add Borrower page
   */
  async gotoNew(): Promise<void> {
    await this.navigateTo('/borrowers/new');
    await expect(this.formHeading).toBeVisible();
  }

  /**
   * Navigate to the Borrowers listing page
   */
  async gotoList(): Promise<void> {
    await this.navigateTo('/borrowers');
    await expect(this.borrowersHeading).toBeVisible();
  }

  /**
   * Fill borrower personal and KYC details
   */
  async fillBorrowerForm(data: {
    fullName: string;
    phone: string;
    gender?: string;
    email?: string;
    idType?: string;
    idNumber?: string;
    monthlyIncome?: string;
  }): Promise<void> {
    await this.fullNameInput.fill(data.fullName);
    await this.phoneInput.fill(data.phone);
    if (data.gender) {
      await this.genderSelect.selectOption(data.gender);
    }
    if (data.email) {
      await this.emailInput.fill(data.email);
    }
    if (data.idType) {
      await this.idTypeSelect.selectOption(data.idType);
    }
    if (data.idNumber) {
      await this.idNumberInput.fill(data.idNumber);
    }
    if (data.monthlyIncome) {
      await this.monthlyIncomeInput.fill(data.monthlyIncome);
    }
  }

  /**
   * Submit the borrower registration form
   */
  async submitForm(): Promise<void> {
    await this.createBorrowerButton.click();
  }

  /**
   * Complete end-to-end borrower onboarding
   */
  async onboardBorrower(data: {
    fullName: string;
    phone: string;
    email?: string;
    idType?: string;
    idNumber?: string;
    monthlyIncome?: string;
  }): Promise<void> {
    await this.fillBorrowerForm(data);
    await this.submitForm();
  }

  /**
   * Verify onboarding redirect to details or listing with active status
   */
  async verifyBorrowerCreated(expectedName: string): Promise<void> {
    await expect(this.page).toHaveURL(/\/borrowers\/[^/]+$/);
    await expect(this.page.getByText(expectedName, { exact: false }).first()).toBeVisible();
    await expect(this.statusValue).toBeVisible();
    await expect(this.riskBandValue).toBeVisible();
  }

  /**
   * Verify form validation prevents submission when required fields are empty
   */
  async verifyRequiredFieldValidation(): Promise<void> {
    await expect(this.page).toHaveURL(/\/borrowers\/new/);
    await expect(this.fullNameInput).toBeVisible();
    await this.expectInvalidField(this.fullNameInput);
    await this.expectInvalidField(this.phoneInput);
    await this.expectInvalidField(this.idNumberInput);
    await this.expectInvalidField(this.monthlyIncomeInput);
  }

  /**
   * Verify phone field rejects invalid formats before form submission can complete
   */
  async verifyPhoneValidation(): Promise<void> {
    await expect(this.page).toHaveURL(/\/borrowers\/new/);
    await this.expectInvalidField(this.phoneInput);
  }

  /**
   * Verify borrower details show ACTIVE status and a computed risk band
   */
  async verifyBorrowerDetails(expectedName: string): Promise<void> {
    await this.verifyBorrowerCreated(expectedName);
  }

  private async expectInvalidField(locator: Locator): Promise<void> {
    await expect
      .poll(async () => {
        return locator.evaluate((element) => {
          const field = element as HTMLInputElement | HTMLSelectElement;
          return {
            valid: field.checkValidity(),
            message: field.validationMessage,
          };
        });
      })
      .toMatchObject({
        valid: false,
        message: expect.any(String),
      });
  }
}
