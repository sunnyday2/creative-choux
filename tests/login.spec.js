// @ts-check
import { test, expect } from '@playwright/test';
import { label, step, description, owner, tags, severity, feature, epic } from 'allure-js-commons';

test.describe('Go to Login Page', () => {

  test.beforeEach(async ({page}) =>{
    console.log("Ir a la página de login");
    await page.goto('/');
    
    // Click the get started link
    await page.getByRole('link', { name: 'Iniciar Sesión' }).click();
    await expect(page).toHaveURL('/login');
    await expect(page.locator('form input[type="email"]')).toBeVisible();
    await expect(page.locator('form input[type="password"]')).toBeVisible();
    await expect(page.locator('form button[type="submit"]')).toBeVisible();
  });

  test('Login: Email Incorrecto', async ({ page }) => {
    // Expects page to have a heading with the name of Installation.
    const emailInput =  page.locator('form input[type="email"]');
    const passwordInput = page.locator('form input[type="password"]');
    const submitButton = page.locator('form button[type="submit"]');
    
    await emailInput.fill("Anna");
    await passwordInput.fill("password123");
    await submitButton.click();

    const isValid = await emailInput.evaluate((element) => {
      if (element instanceof HTMLInputElement) {
        return element.checkValidity();
      }
      return true;
    });
    expect(isValid).toBe(false);

    const message = await emailInput.evaluate((element) => {
      if (element instanceof HTMLInputElement) {
        return element.validationMessage;
      }
      return '';
    });
  
    expect(message).toContain('@');
  });

  test('Ir a Registro y Crear Usuario', async ({ page }) => {
    await owner('Anna');
    await epic('Registro');
    await feature('Registro de Usuario');
    await description('Este test verifica que el usuario pueda ir a la página de registro y crear una cuenta correctamente.');
    await severity('critical');
    await owner('Anna');


    const linkRegistrarse = await page.getByRole('link', { name: 'Regístrate' });
    await expect(page.getByRole('link', { name: 'Regístrate' })).toBeVisible();
    await linkRegistrarse.click();
    await expect(page).toHaveURL('/registro');
    await expect(page.locator('form input[type="text"]')).toBeVisible();
    await expect(page.locator('form input[type="email"]')).toBeVisible();

    const passwordInputs = page.locator('form input[type="password"]');
    await expect(passwordInputs).toHaveCount(2);
    await expect(passwordInputs.first()).toBeVisible();
    await expect(passwordInputs.last()).toBeVisible();

    await expect(page.locator('form button[type="submit"]')).toBeVisible();

    const nameInput =  page.locator('form input[type="text"]');
    await nameInput.fill("Anna");
 
    const emailInput =  page.locator('form input[type="email"]');
    await emailInput.fill("gannaua+doguito@gmail.com");
  
    const passwordInput = passwordInputs.first();
    const confirmPasswordInput = passwordInputs.nth(1);

    await passwordInput.fill('miContraseña123');
    await confirmPasswordInput.fill('miContraseña123');

    // Selector directo y robusto para el checkbox
    const checkboxInput = page.locator('form input[type="checkbox"]');
    await checkboxInput.check();

    const submitButton = page.locator('form button[type="submit"]');
    await submitButton.click();

    await page.screenshot({ path: 'screenshots/registro.png' });
  });

});