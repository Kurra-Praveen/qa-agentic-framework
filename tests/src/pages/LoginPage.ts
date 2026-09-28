import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * LoginPage: Page Object for LoanPlatform Authentication (/login)
 * Strictly utilizes Playwright Level 1 (getByRole) & Level 2 (getByLabel) semantic locators
 */
export class LoginPage extends BasePage {
  // Locators
  readonly brandHeading: Locator;
  readonly pageHeading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly rememberMeCheckbox: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly authErrorBanner: Locator;
  readonly emailErrorText: Locator;
  readonly passwordErrorText: Locator;

  constructor(page: Page) {
    super(page);
    this.brandHeading = page.getByRole('heading', { name: 'LoanPlatform' });
    this.pageHeading = page.getByRole('heading', { name: 'Sign in to your account' });
    this.emailInput = page.getByLabel('Email address');
    this.passwordInput = page.getByLabel('Password');
    this.rememberMeCheckbox = page.getByLabel('Remember me');
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.authErrorBanner = page.locator('div.text-red-700');
    this.emailErrorText = page.getByText('Please enter a valid email address');
    this.passwordErrorText = page.getByText('Password is required');
  }

  /**
   * Navigate directly to the login page
   */
  async goto(): Promise<void> {
    await this.navigateTo('/login');
    await expect(this.pageHeading).toBeVisible();
  }

  /**
   * Enter email address
   */
  async enterEmail(email: string): Promise<void> {
    await this.emailInput.fill(email);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click the Sign in button
   */
  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  /**
   * Perform end-to-end login flow
   */
  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickSignIn();
  }

  /**
   * Assert invalid login error is visible
   */
  async verifyAuthError(expectedError?: string): Promise<void> {
    await expect(this.authErrorBanner).toBeVisible();
    if (expectedError) {
      await expect(this.authErrorBanner).toContainText(expectedError);
    }
  }

  /**
   * Assert field validation errors are visible
   */
  async verifyValidationErrors(): Promise<void> {
    await expect(this.emailErrorText).toBeVisible();
    await expect(this.passwordErrorText).toBeVisible();
  }
}
