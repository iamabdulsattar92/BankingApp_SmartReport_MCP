import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class QuickTransactionPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async selectTransactionType(type: string) {
    await this.page.locator('#transactionType').selectOption(type);
  }

  async fillAmount(amount: string) {
    await this.page.getByRole('spinbutton', { name: 'Amount ($): *' }).fill(amount);
  }

  async fillTransferAccount(account: string) {
    await this.page.getByRole('textbox', { name: 'Transfer to Account: *' }).fill(account);
  }

  async fillDescription(description: string) {
    await this.page.getByRole('textbox', { name: 'Description: *' }).fill(description);
  }

  async clickSubmit() {
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }

  async clickConfirm() {
    await this.page.getByRole('button', { name: 'Confirm' }).click();
  }

  async getTransactionReference(): Promise<string> {
    const refValue = this.page.locator('#successReference');
    await expect(refValue).toBeVisible();
    const ref = (await refValue.textContent())?.trim()!;
    expect(ref).toMatch(/^TXN-\d+-\d+$/);

  return ref;
}


  async clickViewHistory() {
    await this.page.getByRole('button', { name: 'View History' }).click();
  }
}