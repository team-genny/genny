import { test, expect } from '@playwright/test';

test('user sees text boxes to create a new formula', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Schemas' }).click();
  await page.getByRole('link', { name: 'Create Schema' }).click();
  await page.getByRole('button', { name: 'Add Field' }).click();
  await expect(page.getByPlaceholder('Name')).toBeVisible();
  await expect(page.getByPlaceholder('Formula')).toBeVisible();
  await expect(page.getByRole('button').nth(1)).toBeVisible(); // Delete button
});

test('filling in a schema form generates schema', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'Schemas' }).click();
  await page.getByRole('link', { name: 'Create Schema' }).click();
  await page.getByRole('button', { name: 'Add Field' }).click();
  await page.getByPlaceholder('Slug').fill('testSlug');
  await page.getByPlaceholder('Name').fill('testName');
  await page.getByPlaceholder('Formula').fill('testFormula');
  await expect(page.getByRole('main')).toContainText('{ "_id": "<unknown>", "slug": "testSlug", "fields": [ { "name": "testName", "formula": "testFormula" } ] }');
});