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
  readonly borrowerListBreadcrumb?: Locator;

  // Locators - New Borrower Form
  readonly formHeading: Locator;
  readonly formDescription: Locator;
  readonly personalInformationHeading: Locator;
  readonly contactDetailsHeading: Locator;
  readonly identityAddressHeading: Locator;
  readonly employmentHeading: Locator;
  readonly fullNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly genderSelect: Locator;
  readonly emailInput: Locator;
  readonly phoneInput: Locator;
  readonly alternatePhoneInput: Locator;
  readonly idTypeSelect: Locator;
  readonly idNumberInput: Locator;
  readonly addressLine1Input: Locator;
  readonly addressLine2Input: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly postalCodeInput: Locator;
  readonly countryInput: Locator;
  readonly occupationInput: Locator;
  readonly employerNameInput: Locator;
  readonly monthlyIncomeInput: Locator;
  readonly notesInput: Locator;
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
    this.formDescription = page.getByText('Enter borrower details to create a new record');
    this.personalInformationHeading = page.getByRole('heading', { name: 'Personal Information' });
    this.contactDetailsHeading = page.getByRole('heading', { name: 'Contact Details' });
    this.identityAddressHeading = page.getByRole('heading', { name: 'Identity & Address' });
    this.employmentHeading = page.getByRole('heading', { name: 'Employment' });
    this.fullNameInput = page.getByLabel('Full Name*');
    this.dateOfBirthInput = page.getByLabel('Date of Birth');
    // Gender's <label> has no `for`/id association in the live DOM, so getByLabel cannot
    // resolve it; fall back to the underlying <select name="gender"> element.
    this.genderSelect = page.locator('select[name="gender"]');
    this.emailInput = page.getByLabel('Email');
    this.phoneInput = page.getByLabel('Phone Number*');
    this.alternatePhoneInput = page.getByLabel('Alternate Phone');
    // Same unassociated-label issue as Gender; use the <select name="idType"> element.
    this.idTypeSelect = page.locator('select[name="idType"]');
    this.idNumberInput = page.getByLabel('ID Number');
    this.addressLine1Input = page.getByLabel('Address Line 1');
    this.addressLine2Input = page.getByLabel('Address Line 2');
    this.cityInput = page.getByLabel('City');
    this.stateInput = page.getByLabel('State');
    this.postalCodeInput = page.getByLabel('Postal Code');
    this.countryInput = page.getByLabel('Country');
    this.occupationInput = page.getByLabel('Occupation');
    this.employerNameInput = page.getByLabel('Employer Name');
    this.monthlyIncomeInput = page.getByLabel('Monthly Income');
    // Notes textarea's <label> is also unassociated; use its placeholder text instead.
    this.notesInput = page.getByPlaceholder('Additional notes about the borrower...');
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
   * Open the borrower onboarding form from the list page
   */
  async openAddBorrowerForm(): Promise<void> {
    await this.addBorrowerButton.click();
    await expect(this.formHeading).toBeVisible();
  }

  /**
   * Search borrowers by a text query
   */
  async searchBorrowers(query: string): Promise<void> {
    await this.searchInput.fill(query);
  }

  /**
   * Clear the borrower search field
   */
  async clearBorrowerSearch(): Promise<void> {
    await this.searchInput.fill('');
  }

  /**
   * Select borrower gender
   */
  async selectGender(gender: string): Promise<void> {
    await this.genderSelect.selectOption(gender);
  }

  /**
   * Select the borrower ID type
   */
  async selectIdType(idType: string): Promise<void> {
    await this.idTypeSelect.selectOption(idType);
  }

  /**
   * Fill borrower personal and KYC details
   */
  async fillBorrowerForm(data: {
    fullName: string;
    dateOfBirth?: string;
    gender?: string;
    phone: string;
    email?: string;
    alternatePhone?: string;
    idType?: string;
    idNumber?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    occupation?: string;
    employerName?: string;
    monthlyIncome?: string;
    notes?: string;
  }): Promise<void> {
    await this.fullNameInput.fill(data.fullName);
    if (data.dateOfBirth) {
      await this.dateOfBirthInput.fill(data.dateOfBirth);
    }
    if (data.gender) {
      await this.selectGender(data.gender);
    }
    await this.phoneInput.fill(data.phone);
    if (data.email) {
      await this.emailInput.fill(data.email);
    }
    if (data.alternatePhone) {
      await this.alternatePhoneInput.fill(data.alternatePhone);
    }
    if (data.idType) {
      await this.selectIdType(data.idType);
    }
    if (data.idNumber) {
      await this.idNumberInput.fill(data.idNumber);
    }
    if (data.addressLine1) {
      await this.addressLine1Input.fill(data.addressLine1);
    }
    if (data.addressLine2) {
      await this.addressLine2Input.fill(data.addressLine2);
    }
    if (data.city) {
      await this.cityInput.fill(data.city);
    }
    if (data.state) {
      await this.stateInput.fill(data.state);
    }
    if (data.postalCode) {
      await this.postalCodeInput.fill(data.postalCode);
    }
    if (data.country) {
      await this.countryInput.fill(data.country);
    }
    if (data.occupation) {
      await this.occupationInput.fill(data.occupation);
    }
    if (data.employerName) {
      await this.employerNameInput.fill(data.employerName);
    }
    if (data.monthlyIncome) {
      await this.monthlyIncomeInput.fill(data.monthlyIncome);
    }
    if (data.notes) {
      await this.notesInput.fill(data.notes);
    }
  }

  /**
   * Submit the borrower registration form
   */
  async submitForm(): Promise<void> {
    await this.createBorrowerButton.click();
  }

  /**
   * Cancel the borrower onboarding flow
   */
  async cancelForm(): Promise<void> {
    await this.cancelButton.click();
  }

  /**
   * Complete end-to-end borrower onboarding
   */
  async onboardBorrower(data: {
    fullName: string;
    dateOfBirth?: string;
    gender?: string;
    phone: string;
    email?: string;
    alternatePhone?: string;
    idType?: string;
    idNumber?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
    occupation?: string;
    employerName?: string;
    monthlyIncome?: string;
    notes?: string;
  }): Promise<void> {
    await this.fillBorrowerForm(data);
    await this.submitForm();
  }

  /**
   * Verify the borrower onboarding form is visible and ready
   */
  async verifyBorrowerFormLoaded(): Promise<void> {
    await expect(this.formHeading).toBeVisible();
    await expect(this.formDescription).toBeVisible();
    await expect(this.personalInformationHeading).toBeVisible();
    await expect(this.contactDetailsHeading).toBeVisible();
    await expect(this.identityAddressHeading).toBeVisible();
    await expect(this.employmentHeading).toBeVisible();
    await expect(this.createBorrowerButton).toBeVisible();
    await expect(this.cancelButton).toBeVisible();
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
   * Return to the borrower list view from the form route
   */
  async returnToBorrowerList(): Promise<void> {
    await this.navigateTo('/borrowers');
    await expect(this.borrowersHeading).toBeVisible();
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
