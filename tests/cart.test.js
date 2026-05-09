/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { products } from '../js/products.js';
import {
  initCart,
  resetCartState,
  addToCart,
  openCart,
  openModal,
} from '../js/cart.js';

function buildCartHtml() {
  document.body.innerHTML = `
    <button id="cart-toggle-btn">Cart</button>
    <span id="cart-badge" style="display:none">0</span>
    <div id="cart-overlay"></div>
    <div id="cart-panel">
      <button id="cart-close">×</button>
      <button id="cart-empty-btn" style="display:none">Empty</button>
      <div id="cart-items"></div>
      <div id="cart-empty">
        <p>Your cart is empty</p>
      </div>
      <span id="cart-total">$0.00</span>
      <p id="cart-delivery-estimate"></p>
      <button id="checkout-btn" disabled>Checkout</button>
      <button id="cart-back-to-menu">Back to Menu</button>
    </div>
    <div id="modal-overlay"></div>
    <div id="product-modal">
      <button id="modal-close">×</button>
      <img id="modal-image" src="" alt="">
      <h3 id="modal-title"></h3>
      <p id="modal-desc"></p>
      <div id="modal-sizes-section">
        <div id="modal-sizes"></div>
      </div>
      <div id="modal-inclusions-section" style="display:none">
        <div id="modal-inclusions"></div>
      </div>
      <div id="modal-optional-section" style="display:none">
        <div id="modal-optional"></div>
      </div>
      <span id="modal-quantity">1</span>
      <button id="modal-qty-minus">−</button>
      <button id="modal-qty-plus">+</button>
      <button id="modal-add-btn">Add to Cart</button>
    </div>
  `;
}

describe('Cart Module', () => {
  beforeEach(() => {
    resetCartState();
    buildCartHtml();
    initCart();
  });

  describe('addToCart', () => {
    test('adds a new item to cart', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      expect(localStorageMock.getItem('wheatbunny-cart')).toBeTruthy();
      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(1);
      expect(saved[0].name).toBe('Sourdough Country Loaf');
      expect(saved[0].size).toBe('800-850g');
      expect(saved[0].quantity).toBe(1);
      expect(saved[0].unitPrice).toBe(12);
    });

    test('increments quantity for identical item', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      addToCart('country-loaf', '800-850g', null, [], 2);
      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(1);
      expect(saved[0].quantity).toBe(3);
    });

    test('creates separate item for different size', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      addToCart('country-loaf', '400-450g', null, [], 1);
      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(2);
    });

    test('creates separate item for different inclusion', () => {
      addToCart('sourdough-inclusion', '900g', 'Parmesan and Olives', [], 1);
      addToCart('sourdough-inclusion', '900g', 'Double Chocolate Chips', [], 1);
      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(2);
    });

    test('creates separate item for different optional ingredients', () => {
      addToCart('burger-buns', '6 pieces', null, ['Sesame Seeds'], 1);
      addToCart('burger-buns', '6 pieces', null, [], 1);
      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(2);
    });

    test('ignores invalid product id', () => {
      addToCart('nonexistent', '800-850g', null, [], 1);
      const raw = localStorageMock.getItem('wheatbunny-cart');
      expect(raw === null || JSON.parse(raw).length === 0).toBe(true);
    });

    test('ignores invalid size', () => {
      addToCart('country-loaf', '9999g', null, [], 1);
      const raw = localStorageMock.getItem('wheatbunny-cart');
      expect(raw === null || JSON.parse(raw).length === 0).toBe(true);
    });

    test('generates unique cart item ids', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      addToCart('burger-buns', '6 pieces', null, [], 1);
      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved[0].id).not.toBe(saved[1].id);
    });

    test('adds item with optional ingredients sorted', () => {
      addToCart('burger-buns', '6 pieces', null, ['Sesame Seeds'], 1);
      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved[0].optional).toEqual(['Sesame Seeds']);
    });
  });

  describe('openCart', () => {
    test('opens cart panel', () => {
      openCart();
      expect(document.getElementById('cart-panel').classList.contains('open')).toBe(true);
      expect(document.getElementById('cart-overlay').classList.contains('open')).toBe(true);
    });

    test('does not throw when cart panel is missing', () => {
      document.getElementById('cart-panel').remove();
      expect(() => openCart()).not.toThrow();
    });
  });

  describe('Cart Badge', () => {
    test('updates badge with total quantity', () => {
      addToCart('country-loaf', '800-850g', null, [], 2);
      addToCart('burger-buns', '6 pieces', null, [], 3);
      const badge = document.getElementById('cart-badge');
      expect(badge.textContent).toBe('5');
      expect(badge.style.display).toBe('flex');
    });

    test('hides badge when cart is empty', () => {
      const badge = document.getElementById('cart-badge');
      expect(badge.style.display).toBe('none');
    });
  });

  describe('Cart Rendering', () => {
    test('renders empty cart state', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      // Remove it to empty cart
      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      saved.length = 0;
      localStorageMock.setItem('wheatbunny-cart', JSON.stringify(saved));

      // Re-init to pick up empty cart
      buildCartHtml();
      initCart();
      openCart();

      expect(document.getElementById('cart-empty').style.display).toBe('block');
      expect(document.getElementById('cart-items').style.display).toBe('none');
      expect(document.getElementById('cart-total').textContent).toBe('$0.00');
    });

    test('renders cart items correctly', () => {
      addToCart('country-loaf', '800-850g', null, [], 2);
      openCart();

      const items = document.getElementById('cart-items');
      expect(items.style.display).toBe('block');
      expect(items.querySelector('.cart-item-name').textContent).toBe('Sourdough Country Loaf');
      expect(items.querySelector('.cart-item-total').textContent).toBe('$24.00');
    });

    test('renders cart item with inclusion', () => {
      addToCart('sourdough-inclusion', '900g', 'Parmesan and Olives', [], 1);
      openCart();

      const meta = document.querySelector('.cart-item-meta');
      expect(meta.textContent).toContain('Parmesan and Olives');
    });

    test('renders cart item with optional ingredients', () => {
      addToCart('burger-buns', '6 pieces', null, ['Sesame Seeds'], 1);
      openCart();

      const meta = document.querySelector('.cart-item-meta');
      expect(meta.textContent).toContain('Sesame Seeds');
    });

    test('enables checkout button when cart has items', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      openCart();

      const btn = document.getElementById('checkout-btn');
      expect(btn.disabled).toBe(false);
    });

    test('shows empty button when cart has items', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      openCart();

      const btn = document.getElementById('cart-empty-btn');
      expect(btn.style.display).toBe('inline-block');
    });
  });

  describe('Cart Quantity Updates', () => {
    test('increments item quantity', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      openCart();

      const plusBtn = document.querySelector('[data-action="plus"]');
      plusBtn.click();

      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved[0].quantity).toBe(2);
    });

    test('decrements item quantity', () => {
      addToCart('country-loaf', '800-850g', null, [], 2);
      openCart();

      const minusBtn = document.querySelector('[data-action="minus"]');
      minusBtn.click();

      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved[0].quantity).toBe(1);
    });

    test('removes item when quantity reaches zero', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      openCart();

      const minusBtn = document.querySelector('[data-action="minus"]');
      minusBtn.click();

      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(0);
    });
  });

  describe('Cart Item Removal', () => {
    test('removes item via delete button', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      openCart();

      const delBtn = document.querySelector('.cart-item-delete');
      delBtn.click();

      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(0);
    });
  });

  describe('Empty Cart', () => {
    test('empties cart when confirmed', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      addToCart('burger-buns', '6 pieces', null, [], 1);
      openCart();

      const emptyBtn = document.getElementById('cart-empty-btn');
      emptyBtn.click();

      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(0);
    });

    test('does not empty cart when cancelled', () => {
      global.confirm = jest.fn(() => false);
      addToCart('country-loaf', '800-850g', null, [], 1);
      openCart();

      const emptyBtn = document.getElementById('cart-empty-btn');
      emptyBtn.click();

      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(1);
    });
  });

  describe('Delivery Estimate', () => {
    test('returns a formatted date string', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      openCart();

      const estimate = document.getElementById('cart-delivery-estimate');
      expect(estimate.textContent).toMatch(/Estimated delivery:/);
    });
  });

  describe('Modal', () => {
    test('opens modal with product details', () => {
      openModal('country-loaf');

      const modal = document.getElementById('product-modal');
      expect(modal.classList.contains('open')).toBe(true);
      expect(document.getElementById('modal-title').textContent).toBe('Sourdough Country Loaf');
    });

    test('does not open modal for invalid product', () => {
      openModal('nonexistent');
      const modal = document.getElementById('product-modal');
      expect(modal.classList.contains('open')).toBe(false);
    });

    test('renders size selectors', () => {
      openModal('country-loaf');
      const sizes = document.querySelectorAll('#modal-sizes .selector-btn');
      expect(sizes.length).toBe(2);
      expect(sizes[0].dataset.value).toBe('800-850g');
      expect(sizes[1].dataset.value).toBe('400-450g');
    });

    test('renders inclusion selectors', () => {
      openModal('sourdough-inclusion');
      const inclusions = document.querySelectorAll('#modal-inclusions .selector-btn');
      expect(inclusions.length).toBe(4);
      expect(document.getElementById('modal-inclusions-section').style.display).toBe('block');
    });

    test('hides inclusion section for product without inclusions', () => {
      openModal('country-loaf');
      expect(document.getElementById('modal-inclusions-section').style.display).toBe('none');
    });

    test('renders optional ingredients', () => {
      openModal('burger-buns');
      const optional = document.querySelectorAll('#modal-optional .checkbox-input');
      expect(optional.length).toBe(1);
      expect(optional[0].value).toBe('Sesame Seeds');
      expect(document.getElementById('modal-optional-section').style.display).toBe('block');
    });

    test('hides optional section for product without options', () => {
      openModal('country-loaf');
      expect(document.getElementById('modal-optional-section').style.display).toBe('none');
    });

    test('quantity stepper increases quantity', () => {
      openModal('country-loaf');
      document.getElementById('modal-qty-plus').click();
      expect(document.getElementById('modal-quantity').textContent).toBe('2');
    });

    test('quantity stepper decreases quantity', () => {
      openModal('country-loaf');
      document.getElementById('modal-qty-plus').click();
      document.getElementById('modal-qty-plus').click();
      document.getElementById('modal-qty-minus').click();
      expect(document.getElementById('modal-quantity').textContent).toBe('2');
    });

    test('quantity does not go below 1', () => {
      openModal('country-loaf');
      document.getElementById('modal-qty-minus').click();
      expect(document.getElementById('modal-quantity').textContent).toBe('1');
    });

    test('quantity does not exceed 20', () => {
      openModal('country-loaf');
      for (let i = 0; i < 25; i++) {
        document.getElementById('modal-qty-plus').click();
      }
      expect(document.getElementById('modal-quantity').textContent).toBe('20');
    });

    test('add button adds item and closes modal', () => {
      openModal('country-loaf');
      document.getElementById('modal-add-btn').click();

      const saved = JSON.parse(localStorageMock.getItem('wheatbunny-cart'));
      expect(saved.length).toBe(1);
      expect(document.getElementById('product-modal').classList.contains('open')).toBe(false);
    });
  });

  describe('Keyboard Navigation', () => {
    test('Escape closes modal', () => {
      openModal('country-loaf');
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(document.getElementById('product-modal').classList.contains('open')).toBe(false);
    });

    test('Escape closes cart when modal is not open', () => {
      openCart();
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
      expect(document.getElementById('cart-panel').classList.contains('open')).toBe(false);
    });
  });

  describe('Checkout', () => {
    test('checkout button opens WhatsApp with order details', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      openCart();

      document.getElementById('checkout-btn').click();

      expect(window.open).toHaveBeenCalled();
      const url = window.open.mock.calls[0][0];
      expect(url).toContain('wa.me/6585157245');
      expect(url).toContain('Hi Wheat Bunny!');
      expect(url).toContain('Sourdough Country Loaf');
    });

    test('checkout includes delivery estimate', () => {
      addToCart('country-loaf', '800-850g', null, [], 1);
      openCart();

      document.getElementById('checkout-btn').click();

      const url = window.open.mock.calls[0][0];
      expect(url).toContain('Estimated Delivery Date');
    });

    test('checkout includes optional ingredients', () => {
      addToCart('burger-buns', '6 pieces', null, ['Sesame Seeds'], 1);
      openCart();

      document.getElementById('checkout-btn').click();

      const url = window.open.mock.calls[0][0];
      expect(url).toContain('Sesame Seeds');
    });

    test('checkout does nothing when cart is empty', () => {
      openCart();
      document.getElementById('checkout-btn').click();
      expect(window.open).not.toHaveBeenCalled();
    });
  });
});
