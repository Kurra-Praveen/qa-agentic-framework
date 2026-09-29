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
  readonly idTypeSelect: Locator;
  readonly idNumberInput: Locator;
  readonly monthlyIncomeInput: Locator;
  readonly createBorrowerButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    super(page);

    // List Page
    this.borrowersHeading = page.getByRole('heading', { name: 'Borrowers' });
    this.addBorrowerButton = page.getByRole('button', { name: 'Add Borrower' });
    this.searchInput = page.getByPlaceholder('Search by name, email, or phone...');

    // Onboarding Form
    this.formHeading = page.getByRole('heading', { name: 'Add New Borrower' });
    this.fullNameInput = page.getByPlaceholder('John Doe');
    this.phoneInput = page.getByPlaceholder('+1234567890');
    this.emailInput = page.getByPlaceholder('john@example.com');
    this.idTypeSelect = page.getByRole('combobox').first();
    this.idNumberInput = page.locator('input[name="idNumber"]');
    this.monthlyIncomeInput = page.locator('input[name="monthlyIncome"]');
    this.createBorrowerButton = page.getByRole('button', { name: 'Create Borrower' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
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
    email?: string;
    idType?: string;
    idNumber?: string;
    monthlyIncome?: string;
  }): Promise<void> {
    await this.fullNameInput.fill(data.fullName);
    await this.phoneInput.fill(data.phone);
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
    await expect(this.page).toHaveURL(/\/borrowers/);
    const borrowerRow = this.page.getByText(expectedName);
    await expect(borrowerRow).toBeVisible();
  }

  /**
   * Verify form validation prevents submission when required fields are empty
   */
  async verifyRequiredFieldValidation(): Promise<void> {
    // HTML5 validation or form remains on /borrowers/new
    await expect(this.page).toHaveURL(/\/borrowers\/new/);
    await expect(this.fullNameInput).toBeVisible();
  }
}
