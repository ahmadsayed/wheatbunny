import { jest } from '@jest/globals';

// Mock localStorage for cart tests
export const localStorageMock = {
  store: {},
  getItem(key) {
    return this.store[key] || null;
  },
  setItem(key, value) {
    this.store[key] = String(value);
  },
  removeItem(key) {
    delete this.store[key];
  },
  clear() {
    this.store = {};
  },
};

global.localStorageMock = localStorageMock;

if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
    configurable: true,
  });

  if (window.open) {
    window.open = jest.fn();
  } else {
    Object.defineProperty(window, 'open', {
      value: jest.fn(),
      writable: true,
      configurable: true,
    });
  }

  // Mock confirm
  global.confirm = jest.fn(() => true);

  // Reset DOM after each test
  afterEach(() => {
    document.body.innerHTML = '';
    localStorageMock.clear();
    jest.clearAllMocks();
  });
}
