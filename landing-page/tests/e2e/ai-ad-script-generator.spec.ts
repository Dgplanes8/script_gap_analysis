import { test, expect } from '@playwright/test';

test.describe('AI Ad Script Generator form validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ai-ad-script-generator');
  });

  test('shows inline errors when required fields are missing', async ({ page }) => {
    await page.getByRole('button', { name: 'Generate Script' }).click();

    await expect(page.getByText('Company name is required.')).toBeVisible();
    await expect(page.getByText('Website URL is required.')).toBeVisible();
  });

  test('submits valid payload and renders AI output when backend succeeds', async ({ page }) => {
    let invokeCalled = false;

    await page.route('**/functions/v1/generate-script', async (route) => {
      invokeCalled = true;
      const request = route.request();
      const body = JSON.parse(request.postData() ?? '{}');

      expect(body.companyName).toBe('BrightWave Labs');
      expect(body.websiteUrl).toBe('https://brightwave.ai');
      expect(body.adFormat).toBe('video');

      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          script: 'Script: High-impact video ad concept built for BrightWave Labs.',
          creditsRemaining: 9,
        }),
      });
    });

    await page.getByLabel('Company Name').fill('BrightWave Labs');
    await page.getByLabel('Website URL').fill('https://brightwave.ai');
    await page.getByLabel('Product Description (optional)').fill('AI-driven productivity suite for creative teams.');

    await page.getByRole('button', { name: 'Generate Script' }).click();

    await expect(page.getByRole('heading', { name: /Generated Video Ad/i })).toBeVisible();
    await expect(page.locator('pre').first()).toContainText('High-impact video ad concept');
    expect(invokeCalled).toBeTruthy();
  });
});
