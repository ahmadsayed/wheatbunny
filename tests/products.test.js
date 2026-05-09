/**
 * @jest-environment node
 */

import { products } from '../js/products.js';

describe('products data', () => {
  test('products array is defined and not empty', () => {
    expect(products).toBeDefined();
    expect(Array.isArray(products)).toBe(true);
    expect(products.length).toBeGreaterThan(0);
  });

  test('each product has required fields', () => {
    products.forEach((product) => {
      expect(product.id).toBeDefined();
      expect(typeof product.id).toBe('string');
      expect(product.id.length).toBeGreaterThan(0);

      expect(product.name).toBeDefined();
      expect(typeof product.name).toBe('string');
      expect(product.name.length).toBeGreaterThan(0);

      expect(product.description).toBeDefined();
      expect(typeof product.description).toBe('string');

      expect(product.images).toBeDefined();
      expect(Array.isArray(product.images)).toBe(true);
      expect(product.images.length).toBeGreaterThan(0);

      expect(product.sizes).toBeDefined();
      expect(Array.isArray(product.sizes)).toBe(true);
      expect(product.sizes.length).toBeGreaterThan(0);

      expect(product.category).toBeDefined();
      expect(typeof product.category).toBe('string');
    });
  });

  test('each product has a unique id', () => {
    const ids = products.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  test('each image has required fields', () => {
    products.forEach((product) => {
      product.images.forEach((img) => {
        expect(img.webp).toBeDefined();
        expect(img.fallback).toBeDefined();
        expect(img.alt).toBeDefined();
        expect(typeof img.alt).toBe('string');
        expect(img.width).toBeDefined();
        expect(typeof img.width).toBe('number');
        expect(img.height).toBeDefined();
        expect(typeof img.height).toBe('number');
      });
    });
  });

  test('each size has label and price', () => {
    products.forEach((product) => {
      product.sizes.forEach((size) => {
        expect(size.label).toBeDefined();
        expect(typeof size.label).toBe('string');
        expect(size.price).toBeDefined();
        expect(typeof size.price).toBe('number');
        expect(size.price).toBeGreaterThanOrEqual(0);
      });
    });
  });

  test('products with inclusions have at least one inclusion', () => {
    products.forEach((product) => {
      if (product.inclusions) {
        expect(Array.isArray(product.inclusions)).toBe(true);
        expect(product.inclusions.length).toBeGreaterThan(0);
        product.inclusions.forEach((inc) => {
          expect(typeof inc).toBe('string');
          expect(inc.length).toBeGreaterThan(0);
        });
      }
    });
  });

  test('products with ingredients have at least one ingredient', () => {
    products.forEach((product) => {
      if (product.ingredients) {
        expect(Array.isArray(product.ingredients)).toBe(true);
        expect(product.ingredients.length).toBeGreaterThan(0);
      }
    });
  });

  test('optionalIngredients is an array when present', () => {
    products.forEach((product) => {
      if (product.optionalIngredients) {
        expect(Array.isArray(product.optionalIngredients)).toBe(true);
      }
    });
  });

  test('product ids match known products', () => {
    const knownIds = [
      'country-loaf',
      'burger-buns',
      'sandwich-bread',
      'pizza-sandwich-bread',
      'sourdough-inclusion',
      'mini-loafs',
      'chocolate-chip-cookies',
      'zebra-butter-cookies',
    ];
    const actualIds = products.map((p) => p.id);
    expect(actualIds.sort()).toEqual(knownIds.sort());
  });
});
