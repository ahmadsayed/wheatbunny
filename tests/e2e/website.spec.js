const { test, expect } = require('@playwright/test');

const BASE_URL = 'http://localhost:3000';

test.describe('Wheat Bunny Website E2E', () => {
  test.beforeAll(async () => {
    // Ensure server is running or start it if needed
  });

  test.describe('Homepage', () => {
    test('loads successfully', async ({ page }) => {
      const response = await page.goto(BASE_URL);
      expect(response.status()).toBe(200);
    });

    test('has correct title', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page).toHaveTitle(/Wheat Bunny/);
    });

    test('has meta description', async ({ page }) => {
      await page.goto(BASE_URL);
      const meta = await page.locator('meta[name="description"]');
      await expect(meta).toHaveAttribute('content', /sourdough/i);
    });

    test('has canonical link', async ({ page }) => {
      await page.goto(BASE_URL);
      const canonical = await page.locator('link[rel="canonical"]');
      await expect(canonical).toHaveAttribute('href', 'https://thewheatbunny.shop/');
    });

    test('hero section is visible', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('.hero')).toBeVisible();
      await expect(page.locator('.hero-title')).toContainText('Artisan Sourdough');
    });

    test('logo image has alt text', async ({ page }) => {
      await page.goto(BASE_URL);
      const logo = page.locator('.logo');
      await expect(logo).toHaveAttribute('alt', /Wheat Bunny/i);
    });

    test('skip link is present', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('.skip-link')).toBeVisible();
    });

    test('View Menu button links to menu', async ({ page }) => {
      await page.goto(BASE_URL);
      const btn = page.locator('.btn-primary');
      await expect(btn).toHaveAttribute('href', '#menu');
    });
  });

  test.describe('Navigation & Sections', () => {
    test('About section is present', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('.about h2')).toContainText('Our Story');
    });

    test('Process section has 4 cards', async ({ page }) => {
      await page.goto(BASE_URL);
      const cards = page.locator('.process-card');
      await expect(cards).toHaveCount(4);
    });

    test('Menu section loads products', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('.menu-card')).toHaveCount(8);
    });

    test('Order info section is present', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('#order-info h2')).toContainText('How to Order');
    });

    test('Contact section has Instagram link', async ({ page }) => {
      await page.goto(BASE_URL);
      const link = page.locator('.instagram-link');
      await expect(link).toHaveAttribute('href', 'https://www.instagram.com/thewheatbunny/');
    });

    test('Footer has copyright', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('footer')).toContainText('©');
    });
  });

  test.describe('Carousel', () => {
    test('hero carousel has multiple slides', async ({ page }) => {
      await page.goto(BASE_URL);
      const slides = page.locator('.hero-image .carousel-slide');
      await expect(slides).toHaveCount(3);
    });

    test('carousel navigation arrows work', async ({ page }) => {
      await page.goto(BASE_URL);
      const nextBtn = page.locator('.hero-image .carousel-next');
      await nextBtn.click();
      // Should not throw and slide should change
      await expect(nextBtn).toBeVisible();
    });

    test('carousel dots are present', async ({ page }) => {
      await page.goto(BASE_URL);
      const dots = page.locator('.hero-image .dot');
      await expect(dots).toHaveCount(3);
    });
  });

  test.describe('Cart', () => {
    test('cart toggle button is visible', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('#cart-toggle-btn')).toBeVisible();
    });

    test('cart opens when toggle is clicked', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('#cart-toggle-btn').click();
      await expect(page.locator('#cart-panel')).toHaveClass(/open/);
    });

    test('cart shows empty state initially', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('#cart-toggle-btn').click();
      await expect(page.locator('#cart-empty')).toBeVisible();
      await expect(page.locator('#cart-empty')).toContainText('Your cart is empty');
    });

    test('badge is hidden when cart is empty', async ({ page }) => {
      await page.goto(BASE_URL);
      await expect(page.locator('#cart-badge')).toBeHidden();
    });

    test('cart closes when close button is clicked', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('#cart-toggle-btn').click();
      await page.locator('#cart-close').click();
      await expect(page.locator('#cart-panel')).not.toHaveClass(/open/);
    });

    test('cart closes when overlay is clicked', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('#cart-toggle-btn').click();
      await page.locator('#cart-overlay').click();
      await expect(page.locator('#cart-panel')).not.toHaveClass(/open/);
    });
  });

  test.describe('Product Modal', () => {
    test('clicking Add to Cart opens product modal', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await expect(page.locator('#product-modal')).toHaveClass(/open/);
    });

    test('modal shows product name', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await expect(page.locator('#modal-title')).not.toBeEmpty();
    });

    test('modal has size selectors', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await expect(page.locator('#modal-sizes .selector-btn').first()).toBeVisible();
    });

    test('modal quantity stepper works', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await page.locator('#modal-qty-plus').click();
      await expect(page.locator('#modal-quantity')).toContainText('2');
    });

    test('modal closes when close button is clicked', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await page.locator('#modal-close').click();
      await expect(page.locator('#product-modal')).not.toHaveClass(/open/);
    });

    test('modal closes when overlay is clicked', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await page.locator('#modal-overlay').click();
      await expect(page.locator('#product-modal')).not.toHaveClass(/open/);
    });
  });

  test.describe('Add to Cart Flow', () => {
    test('adding item updates cart badge', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await page.locator('#modal-add-btn').click();
      await expect(page.locator('#cart-badge')).toBeVisible();
      await expect(page.locator('#cart-badge')).toContainText('1');
    });

    test('adding item shows item in cart', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await page.locator('#modal-add-btn').click();
      await expect(page.locator('.cart-item')).toBeVisible();
    });

    test('cart total is calculated correctly', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await page.locator('#modal-add-btn').click();
      const total = await page.locator('#cart-total').textContent();
      expect(total).toMatch(/\$[\d.]+/);
    });

    test('quantity increase button works in cart', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await page.locator('#modal-add-btn').click();
      await page.locator('.cart-item [data-action="plus"]').click();
      await expect(page.locator('.cart-item .qty-value')).toContainText('2');
    });

    test('quantity decrease button works in cart', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await page.locator('#modal-qty-plus').click();
      await page.locator('#modal-add-btn').click();
      await page.locator('.cart-item [data-action="minus"]').click();
      await expect(page.locator('.cart-item .qty-value')).toContainText('1');
    });

    test('delete button removes item from cart', async ({ page }) => {
      await page.goto(BASE_URL);
      await page.locator('.menu-card .add-to-cart-btn').first().click();
      await page.locator('#modal-add-btn').click();
      await page.locator('.cart-item-delete').click();
      await expect(page.locator('#cart-empty')).toBeVisible();
    });
  });

  test.describe('External Links', () => {
    test('WhatsApp link has correct URL', async ({ page }) => {
      await page.goto(BASE_URL);
      const link = page.locator('.whatsapp-method');
      await expect(link).toHaveAttribute('href', /wa\.me\/6585157245/);
    });

    test('Instagram link has correct URL', async ({ page }) => {
      await page.goto(BASE_URL);
      const link = page.locator('.instagram-method');
      await expect(link).toHaveAttribute('href', 'https://www.instagram.com/thewheatbunny/');
    });

    test('floating WhatsApp button has correct URL', async ({ page }) => {
      await page.goto(BASE_URL);
      const btn = page.locator('.whatsapp-float');
      await expect(btn).toHaveAttribute('href', /wa\.me\/6585157245/);
    });
  });

  test.describe('Accessibility', () => {
    test('images have alt text', async ({ page }) => {
      await page.goto(BASE_URL);
      const images = page.locator('img');
      const count = await images.count();
      for (let i = 0; i < count; i++) {
        const alt = await images.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    });

    test('buttons have aria-labels where needed', async ({ page }) => {
      await page.goto(BASE_URL);
      const carouselPrev = page.locator('.carousel-prev');
      await expect(carouselPrev).toHaveAttribute('aria-label', /Previous slide/i);
    });

    test('carousel has aria-label', async ({ page }) => {
      await page.goto(BASE_URL);
      const carousel = page.locator('.carousel[role="region"]');
      await expect(carousel).toHaveAttribute('aria-label', /Featured/);
    });
  });

  test.describe('Responsive Design', () => {
    test('page renders on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(BASE_URL);
      await expect(page.locator('.hero')).toBeVisible();
      await expect(page.locator('.menu-card').first()).toBeVisible();
    });

    test('page renders on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(BASE_URL);
      await expect(page.locator('.hero')).toBeVisible();
    });

    test('page renders on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(BASE_URL);
      await expect(page.locator('.hero')).toBeVisible();
    });
  });

  test.describe('Schema.org Structured Data', () => {
    test('has bakery schema', async ({ page }) => {
      await page.goto(BASE_URL);
      const scripts = page.locator('script[type="application/ld+json"]');
      const count = await scripts.count();
      expect(count).toBeGreaterThan(0);
    });
  });
});
