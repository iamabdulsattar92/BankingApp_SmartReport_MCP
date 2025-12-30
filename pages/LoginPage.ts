import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async login(config: any) {
    await this.page.goto(config.loginUrl);
    await this.page.locator('#username').fill(config.username);
    await this.page.locator('#password').fill(config.password);
    await this.page.locator('#appName').selectOption(config.appName);
    await this.page.getByRole('button', { name: 'Login' }).click();
    await this.page.waitForSelector('text=🏦 Sample Banking Application', { timeout: 60000 });
  }
}