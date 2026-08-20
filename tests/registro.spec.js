// @ts-check
import { test, expect } from '@playwright/test';
import { PetStoreRegistroPage } from './pages/registro.page';

test.describe('Go to Login Page', () => {
  
  test.afterEach(async ({page}) =>{
    console.log("Logout y volver a la página de login");
    const registroPage = new PetStoreRegistroPage(page);
    await registroPage.logout();
  });

  test('Ir a Registro y Crear Usuario', async ({ page }) => {
    const registroPage = new PetStoreRegistroPage(page);
    await registroPage.navigate();
    await expect(page).toHaveURL('/registro');
    await registroPage.register("Anna", "gannaua+doguito4@gmail.com", "miContraseña123", "miContraseña123");

    await expect(page).toHaveURL('/');
  });

});