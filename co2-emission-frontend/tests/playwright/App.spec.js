import { test, expect } from '@playwright/test';

test('has title', async ({page}) => {
  await page.goto('/');
  await expect(page).toHaveTitle("CO² Footprint");
})

test('test navigation', async ({page}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'CO²-Ausstoß pro Unternehmen' })).toBeVisible();

  await page.getByRole('menuitem', { name: 'Informationen' }).click();
  await expect(page.getByRole('heading', { name: 'Informationen über CO²' })).toBeVisible();


  await page.getByRole('button', { name: 'Impressum' }).click();
  await expect(page.getByRole('heading', { name: 'Impressum' })).toBeVisible();

  await page.getByRole('button', { name: 'Datenschutz' }).click();
  await expect(page.getByRole('heading', { name: 'Datenschutzerklärung' })).toBeVisible();

  await page.getByRole('menuitem', { name: 'Hauptseite' }).click();
  await expect(page.getByRole('heading', { name: 'CO²-Ausstoß pro Unternehmen' })).toBeVisible();
})


