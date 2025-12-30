import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { QuickTransactionPage } from '../pages/QuickTransactionPage';
import { TransactionHistoryPage } from '../pages/TransactionHistoryPage';
import * as fs from 'fs';

test('Verify Quick Transactions Flow', async ({ page }) => {
  test.slow();
  console.log(await page.viewportSize());
  const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
  const transferData = JSON.parse(fs.readFileSync('test-data/Transfer_TestData.json', 'utf8'));
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const quickTransactionPage = new QuickTransactionPage(page);
  const transactionHistoryPage = new TransactionHistoryPage(page);

  await loginPage.login(config);
  await homePage.verifyHeader();
  await homePage.verifyWelcomeText();
  await homePage.clickQuickTransactions();

  await quickTransactionPage.selectTransactionType(transferData.transactionType);
  await quickTransactionPage.fillAmount(transferData.amount);
  await quickTransactionPage.fillTransferAccount(transferData.transferToAccount);
  await quickTransactionPage.fillDescription(transferData.description);
  await quickTransactionPage.clickSubmit();
  await quickTransactionPage.clickConfirm();

  const transactionRef = await quickTransactionPage.getTransactionReference();
  await quickTransactionPage.clickViewHistory();
});

test('Verify tab names in the homepage', async ({ page }) => {
  const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  await loginPage.login(config);
  await homePage.verifyHeader();
  await homePage.verifyWelcomeText();

  // Check that the Transfers & Bill Payment tabs are visible
  await expect(page.getByText('Transfers').first()).toBeVisible();
  await expect(page.getByText('Bill Payments').first()).toBeVisible();
});