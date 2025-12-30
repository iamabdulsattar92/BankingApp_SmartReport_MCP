import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async verifyURL() {
    await expect(this.page).toHaveURL(/Banking-Project-Demo.html/);
  }

  async navigateToHome(config: any) {
    await this.page.goto(config.url);
    await this.waitForPageLoad();
    await this.page.waitForSelector('text=Welcome to the Testers Talk Banking Application', { timeout: 60000 });
  }

  async verifyHeader() {
    await expect(this.page.getByText('🏦 Sample Banking Application')).toBeVisible();
  }

  async verifyWelcomeText() {
    await expect(this.page.getByText('Welcome to the Testers Talk Banking Application')).toBeVisible();
  }

  async clickQuickTransactions() {
   await this.page.getByRole('link', { name: /Quick Transactions/i }).click();

  }
}