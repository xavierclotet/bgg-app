// no lo ejecuta jest, sino playwright, testea interacciones del usuario. Como 
// se comporta el componente con los demás  . Por detrás usa un browser
import { test, expect } from '@playwright/test';

test('should redirect to dashboard when login successfully', async ({ page }) => {
    await page.route('**/api/login', async (route) => {
      await route.fulfill({
        status: 200,
    } );
    
    await page.goto('http://localhost:4200');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'fake-password');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('http://localhost:4200/dashboard');

  });
})

test('should show error message when login fails', async ({ page }) => {
    await page.route('**/api/login', async (route) => {
    await route.fulfill({
    status: 401,
        body: JSON.stringify({ message: 'Invalid email or password'})
    });
    
    await page.goto('http://localhost:4200');
    await page.fill('input[name="email"]', 'user@example.com');
    await page.fill('input[name="password"]', 'wrong-password');
    await page.click('button[type="submit"]');
    const errorMessage = page.locator('text=Invalid email or password');
    await expect(errorMessage).toBeVisible();
    
  });
})
