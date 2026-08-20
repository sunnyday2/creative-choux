// @ts-check
import { test, expect } from '@playwright/test';


test.describe('Index Page', () => {
  test('Index Page Body', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Todo para tu mejor amigo' })).toBeVisible();
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL('/login');
  });
});