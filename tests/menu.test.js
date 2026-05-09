/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { products } from '../js/products.js';
import { initMenu } from '../js/menu.js';

function buildMenuHtml() {
  document.body.innerHTML = `
    <section id="menu" class="menu">
      <div class="container">
        <h2>Our Menu</h2>
        <p class="menu-intro">All prices in SGD.</p>
      </div>
    </section>
    <div id="product-modal" style="display:none"></div>
  `;
}

describe('initMenu', () => {
  beforeEach(() => {
    buildMenuHtml();
  });

  test('creates category sections', () => {
    initMenu();
    const categories = document.querySelectorAll('.menu-category');
    expect(categories.length).toBeGreaterThan(0);
  });

  test('groups products by category', () => {
    initMenu();
    const categoryTitles = Array.from(document.querySelectorAll('.category-title')).map(
      (el) => el.textContent
    );
    const uniqueCategories = [...new Set(products.map((p) => p.category))];
    uniqueCategories.forEach((cat) => {
      expect(categoryTitles).toContain(cat);
    });
  });

  test('creates a menu card for each product', () => {
    initMenu();
    const cards = document.querySelectorAll('.menu-card');
    expect(cards.length).toBe(products.length);
  });

  test('each card has product name', () => {
    initMenu();
    products.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      expect(card).toBeTruthy();
    });
  });

  test('each card has description', () => {
    initMenu();
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach((card) => {
      expect(card.querySelector('.description')).toBeTruthy();
    });
  });

  test('each card displays all sizes and prices', () => {
    initMenu();
    products.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      const priceItems = card.querySelectorAll('.price-item');
      expect(priceItems.length).toBe(product.sizes.length);

      product.sizes.forEach((size) => {
        const found = Array.from(priceItems).some(
          (item) =>
            item.querySelector('.size')?.textContent === size.label &&
            item.querySelector('.price')?.textContent === `$${size.price.toFixed(2)}`
        );
        expect(found).toBe(true);
      });
    });
  });

  test('each card has an Add to Cart button', () => {
    initMenu();
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    expect(buttons.length).toBe(products.length);
  });

  test('products with single image have menu-image div', () => {
    initMenu();
    const singleImageProducts = products.filter((p) => p.images.length === 1);
    singleImageProducts.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      expect(card.querySelector('.menu-image')).toBeTruthy();
      expect(card.querySelector('picture')).toBeTruthy();
      expect(card.querySelector('img')).toBeTruthy();
    });
  });

  test('products with multiple images have carousel', () => {
    initMenu();
    const multiImageProducts = products.filter((p) => p.images.length > 1);
    multiImageProducts.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      expect(card.querySelector('.menu-image-carousel')).toBeTruthy();
    });
  });

  test('carousel has correct number of slides', () => {
    initMenu();
    const multiImageProducts = products.filter((p) => p.images.length > 1);
    multiImageProducts.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      const slides = card.querySelectorAll('.menu-carousel-slide');
      expect(slides.length).toBe(product.images.length);
    });
  });

  test('carousel has correct number of dots', () => {
    initMenu();
    const multiImageProducts = products.filter((p) => p.images.length > 1);
    multiImageProducts.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      const dots = card.querySelectorAll('.menu-dot');
      expect(dots.length).toBe(product.images.length);
    });
  });

  test('products with ingredients show ingredients section', () => {
    initMenu();
    const productsWithIngredients = products.filter((p) => p.ingredients);
    productsWithIngredients.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      const section = card.querySelector('.ingredients-section');
      expect(section).toBeTruthy();
      expect(section.querySelector('h4').textContent).toBe('Ingredients');
    });
  });

  test('products with inclusions show inclusion section', () => {
    initMenu();
    const productsWithInclusions = products.filter((p) => p.inclusions);
    productsWithInclusions.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      const section = card.querySelector('.ingredients-section');
      expect(section).toBeTruthy();
      expect(section.querySelector('h4').textContent).toBe('Choose Your Inclusion');
    });
  });

  test('optional ingredients are marked as optional', () => {
    initMenu();
    const productsWithOptional = products.filter((p) => p.optionalIngredients);
    productsWithOptional.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      const optionalTags = card.querySelectorAll('.ingredient-tag.optional');
      expect(optionalTags.length).toBe(product.optionalIngredients.length);
    });
  });

  test('images have correct alt text', () => {
    initMenu();
    products.forEach((product) => {
      const card = Array.from(document.querySelectorAll('.menu-card')).find((c) =>
        c.querySelector('h3')?.textContent.includes(product.name)
      );
      const img = card.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.alt).toBe(product.images[0].alt);
    });
  });

  test('images have width and height attributes', () => {
    initMenu();
    const cards = document.querySelectorAll('.menu-card');
    cards.forEach((card) => {
      const img = card.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.getAttribute('width')).toBeTruthy();
      expect(img.getAttribute('height')).toBeTruthy();
    });
  });

  test('does not throw when container is missing', () => {
    document.body.innerHTML = '';
    expect(() => initMenu()).not.toThrow();
  });
});
