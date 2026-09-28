import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage.js';

/**
 * DashboardPage: Page Object for LoanPlatform Main Dashboard (/dashboard)
 * Strictly utilizes Playwright Level 1 (getByRole) & Level 4 (getByText) semantic locators
 */
export class DashboardPage extends BasePage {
  // Locators
  readonly dashboardHeading: Locator;
  readonly navDashboardLink: Locator;
  readonly navBorrowersLink: Locator;
  readonly navLoansLink: Locator;
  readonly navPaymentsLink: Locator;
  readonly navReportsLink: Locator;
  readonly navTenantsLink: Locator;
  readonly navSettingsLink: Locator;

  constructor(page: Page) {
    super(page);
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard' });
    this.navDashboardLink = page.getByRole('link', { name: 'Dashboard' });
    this.navBorrowersLink = page.getByRole('link', { name: 'Borrowers' });
    this.navLoansLink = page.getByRole('link', { name: 'Loans' });
    this.navPaymentsLink = page.getByRole('link', { name: 'Payments' });
    this.navReportsLink = page.getByRole('link', { name: 'Reports' });
    this.navTenantsLink = page.getByRole('link', { name: 'Tenants' });
    this.navSettingsLink = page.getByRole('link', { name: 'Settings' });
  }

  /**
   * Verify that the user has successfully landed on the dashboard
   */
  async verifyDashboardLoaded(): Promise<void> {
    await this.verifyUrl(/\/dashboard/);
    await expect(this.dashboardHeading).toBeVisible();
    await expect(this.navDashboardLink).toBeVisible();
  }

  /**
   * Navigate to the Borrowers page via sidebar
   */
  async goToBorrowers(): Promise<void> {
    await this.navBorrowersLink.click();
    await this.verifyUrl(/\/borrowers/);
  }

  /**
   * Navigate to the Loans page via sidebar
   */
  async goToLoans(): Promise<void> {
    await this.navLoansLink.click();
    await this.verifyUrl(/\/loans/);
  }
}
