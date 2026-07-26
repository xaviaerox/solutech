const { test, expect } = require('@playwright/test');

test.describe('Solutech Corporate Portal E2E Suite', () => {

  test('Homepage loads correctly with proper SEO title and metadata', async ({ page }) => {
    await page.goto('/');
    
    // Validate Page Title
    await expect(page).toHaveTitle(/Solutech — Mantenimiento Informático/i);

    // Validate Main Heading (H1)
    const h1 = page.locator('h1');
    await expect(h1).toBeVisible();

    // Validate Schema.org structured data script present
    const schemaScript = page.locator('script[type="application/ld+json"]');
    await expect(schemaScript.first()).toBeAttached();
  });

  test('Cookie Consent Banner appears and can be accepted', async ({ page }) => {
    await page.goto('/');

    const cookieBanner = page.locator('#cookie-banner');
    await expect(cookieBanner).toBeVisible();

    const acceptBtn = page.locator('#btn-accept-cookies');
    await acceptBtn.click();

    // Banner should hide after click
    await expect(cookieBanner).toBeHidden();

    // Check LocalStorage consent state
    const consent = await page.evaluate(() => localStorage.getItem('solutech_cookie_consent'));
    expect(consent).toBe('granted');
  });

  test('Navigation burger menu toggles on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const burger = page.locator('#burger-menu');
    const navLinks = page.locator('#nav-links');

    await expect(burger).toBeVisible();
    await burger.click();

    await expect(navLinks).toHaveClass(/open/);
  });

  test('Honeypot field handles bot submissions gracefully', async ({ page }) => {
    await page.goto('/#contacto');

    const form = page.locator('.cta-form').first();
    if (await form.isVisible()) {
      const honeypot = form.locator('input[name="website_url"]');
      if (await honeypot.count() > 0) {
        await honeypot.fill('http://spam-bot.com');
        await form.locator('button[type="submit"]').click();

        const status = form.locator('.form-status');
        await expect(status).toBeVisible();
        await expect(status).toContainText('Solicitud enviada correctamente');
      }
    }
  });

});
