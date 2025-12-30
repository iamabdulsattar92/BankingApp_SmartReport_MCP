import { expect, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class TransactionHistoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

}