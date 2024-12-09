import { test, expect } from '@playwright/test';
// Test del flujo del login, no solo del login
test('Complete login successfully', async ({ page }) => {

    await page.route('**/api/login', async (route) => {
        const requestBody = await route.request().postDataJSON();
        if(requestBody.email === 'user@example.com' || requestBody.password === 'fake-password') {
          await route.fulfill({
            status: 200,
            body: JSON.stringify({ success: true })         
          });
        } else {
            await route.fulfill({
            status: 401,
            body: JSON.stringify({ message: 'Invalid email or password' })
          });
        }
    });

    //iniciar sesion
    await page.goto('http://localhost:4200');
    await page.fill('input[name="email"]', 'user@example.com'); 
    await page.fill('input[name="password"]', 'fake-password');
    await page.click('button[type="submit"]');

    //verificar la redireccion
    await expect(page).toHaveURL('http://localhost:4200/dashboard');
  });

  test('Complete login unsuccessfully', async ({ page }) => {

    await page.route('**/api/login', async (route) => {
        const requestBody = await route.request().postDataJSON();
        if(requestBody.email === 'user@example.com' || requestBody.password === 'wrong-password') {
          await route.fulfill({
            status: 401,
            body: JSON.stringify({ message: 'Invalid email or password' })
          });
        } else {
            await route.fulfill({
                status: 200,
                body: JSON.stringify({ success: true })         
              }); 
        }
    });

    //iniciar sesion
    await page.goto('http://localhost:4200');
    await page.fill('input[name="email"]', 'user@example.com'); 
    await page.fill('input[name="password"]', 'wrong-password');
    await page.click('button[type="submit"]');

    //verificar mensaje de error
    const errorMessage = page.locator('text=Invalid email or password');
    await expect(errorMessage).toBeVisible();
  });