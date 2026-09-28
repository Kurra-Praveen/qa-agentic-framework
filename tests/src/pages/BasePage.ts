import { Page, expect } from '@playwright/test';

/**
 * BasePage: Common foundation for all LoanPlatform Page Objects
 * Strictly uses Playwright 7-level semantic locator priority
 */
export abstract class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a path relative to baseURL
   */
  async navigateTo(path: string): Promise<void> {
    await this.page.goto(path);
  }

  /**
   * Verify current URL matches expected path or pattern
   */
  async verifyUrl(expectedPathOrUrl: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(expectedPathOrUrl);
  }

  /**
   * Verify page title or main heading is visible
   */
  async verifyHeading(headingText: string): Promise<void> {
    const heading = this.page.getByRole('heading', { name: headingText });
    await expect(heading).toBeVisible();
  }
}
