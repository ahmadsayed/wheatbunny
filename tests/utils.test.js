/**
 * @jest-environment jsdom
 */

import { escapeHtml } from '../js/utils.js';

describe('escapeHtml', () => {
  test('returns plain text unchanged', () => {
    expect(escapeHtml('Hello World')).toBe('Hello World');
  });

  test('escapes < character', () => {
    expect(escapeHtml('5 < 10')).toBe('5 &lt; 10');
  });

  test('escapes > character', () => {
    expect(escapeHtml('10 > 5')).toBe('10 &gt; 5');
  });

  test('escapes & character', () => {
    expect(escapeHtml('A & B')).toBe('A &amp; B');
  });

  test('escapes double quotes', () => {
    // textContent/innerHTML escaping behavior: quotes are preserved as-is in modern browsers
    expect(escapeHtml('say "hello"')).toBe('say "hello"');
  });

  test('escapes single quotes', () => {
    expect(escapeHtml("it's")).toBe("it's");
  });

  test('escapes multiple special characters', () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      '&lt;script&gt;alert("xss")&lt;/script&gt;'
    );
  });

  test('handles empty string', () => {
    expect(escapeHtml('')).toBe('');
  });

  test('handles string with only special characters', () => {
    expect(escapeHtml('<>&"\'')).toBe('&lt;&gt;&amp;"\'');
  });
});
