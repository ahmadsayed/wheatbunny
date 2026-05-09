/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import { createCarousel } from '../js/carousel.js';

function buildCarouselHtml(slideCount = 3, startIndex = 0) {
  const slides = Array.from({ length: slideCount }, (_, i) =>
    `<div class="carousel-slide${i === startIndex ? ' active' : ''}">Slide ${i}</div>`
  ).join('');

  const dots = Array.from({ length: slideCount }, (_, i) =>
    `<span class="dot${i === startIndex ? ' active' : ''}" data-slide="${i}"></span>`
  ).join('');

  document.body.innerHTML = `
    <div class="carousel">
      <div class="carousel-slides">${slides}</div>
      <button class="carousel-prev" aria-label="Previous slide">❮</button>
      <button class="carousel-next" aria-label="Next slide">❯</button>
      <div class="carousel-dots">${dots}</div>
    </div>
  `;
}

describe('createCarousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('initializes with correct starting slide', () => {
    buildCarouselHtml(3, 1);
    const container = document.querySelector('.carousel');
    createCarousel({
      container,
      slideSelector: '.carousel-slide',
      dotSelector: '.dot',
      prevSelector: '.carousel-prev',
      nextSelector: '.carousel-next',
      startIndex: 1,
    });

    const slides = container.querySelectorAll('.carousel-slide');
    expect(slides[1].classList.contains('active')).toBe(true);
    expect(slides[0].classList.contains('active')).toBe(false);
  });

  test('auto-advances slides after delay', () => {
    buildCarouselHtml(3);
    const container = document.querySelector('.carousel');
    createCarousel({
      container,
      slideSelector: '.carousel-slide',
      dotSelector: '.dot',
      prevSelector: '.carousel-prev',
      nextSelector: '.carousel-next',
      delay: 5000,
    });

    const slides = container.querySelectorAll('.carousel-slide');
    expect(slides[0].classList.contains('active')).toBe(true);

    jest.advanceTimersByTime(5000);
    expect(slides[1].classList.contains('active')).toBe(true);

    jest.advanceTimersByTime(5000);
    expect(slides[2].classList.contains('active')).toBe(true);
  });

  test('next button advances slide', () => {
    buildCarouselHtml(3);
    const container = document.querySelector('.carousel');
    createCarousel({
      container,
      slideSelector: '.carousel-slide',
      dotSelector: '.dot',
      prevSelector: '.carousel-prev',
      nextSelector: '.carousel-next',
      delay: 5000,
    });

    const nextBtn = container.querySelector('.carousel-next');
    const slides = container.querySelectorAll('.carousel-slide');

    expect(slides[0].classList.contains('active')).toBe(true);
    nextBtn.click();
    expect(slides[1].classList.contains('active')).toBe(true);
  });

  test('prev button goes to previous slide', () => {
    buildCarouselHtml(3, 1);
    const container = document.querySelector('.carousel');
    createCarousel({
      container,
      slideSelector: '.carousel-slide',
      dotSelector: '.dot',
      prevSelector: '.carousel-prev',
      nextSelector: '.carousel-next',
      startIndex: 1,
      delay: 5000,
    });

    const prevBtn = container.querySelector('.carousel-prev');
    const slides = container.querySelectorAll('.carousel-slide');

    expect(slides[1].classList.contains('active')).toBe(true);
    prevBtn.click();
    expect(slides[0].classList.contains('active')).toBe(true);
  });

  test('dot navigation jumps to correct slide', () => {
    buildCarouselHtml(3);
    const container = document.querySelector('.carousel');
    createCarousel({
      container,
      slideSelector: '.carousel-slide',
      dotSelector: '.dot',
      prevSelector: '.carousel-prev',
      nextSelector: '.carousel-next',
      delay: 5000,
    });

    const dots = container.querySelectorAll('.dot');
    const slides = container.querySelectorAll('.carousel-slide');

    dots[2].click();
    expect(slides[2].classList.contains('active')).toBe(true);
    expect(dots[2].classList.contains('active')).toBe(true);
  });

  test('wraps around from last to first slide', () => {
    buildCarouselHtml(3, 2);
    const container = document.querySelector('.carousel');
    createCarousel({
      container,
      slideSelector: '.carousel-slide',
      dotSelector: '.dot',
      prevSelector: '.carousel-prev',
      nextSelector: '.carousel-next',
      startIndex: 2,
      delay: 5000,
    });

    const nextBtn = container.querySelector('.carousel-next');
    const slides = container.querySelectorAll('.carousel-slide');

    expect(slides[2].classList.contains('active')).toBe(true);
    nextBtn.click();
    expect(slides[0].classList.contains('active')).toBe(true);
  });

  test('wraps around from first to last slide via prev', () => {
    buildCarouselHtml(3);
    const container = document.querySelector('.carousel');
    createCarousel({
      container,
      slideSelector: '.carousel-slide',
      dotSelector: '.dot',
      prevSelector: '.carousel-prev',
      nextSelector: '.carousel-next',
      startIndex: 0,
      delay: 5000,
    });

    const prevBtn = container.querySelector('.carousel-prev');
    const slides = container.querySelectorAll('.carousel-slide');

    expect(slides[0].classList.contains('active')).toBe(true);
    prevBtn.click();
    expect(slides[2].classList.contains('active')).toBe(true);
  });

  test('pauses autoplay on hover when pauseOnHover is true', () => {
    buildCarouselHtml(3);
    const container = document.querySelector('.carousel');
    createCarousel({
      container,
      slideSelector: '.carousel-slide',
      dotSelector: '.dot',
      prevSelector: '.carousel-prev',
      nextSelector: '.carousel-next',
      delay: 5000,
      pauseOnHover: true,
    });

    const slides = container.querySelectorAll('.carousel-slide');
    container.dispatchEvent(new MouseEvent('mouseenter'));

    jest.advanceTimersByTime(10000);
    expect(slides[0].classList.contains('active')).toBe(true);

    container.dispatchEvent(new MouseEvent('mouseleave'));
    jest.advanceTimersByTime(5000);
    expect(slides[1].classList.contains('active')).toBe(true);
  });

  test('stops autoplay when document is hidden', () => {
    buildCarouselHtml(3);
    const container = document.querySelector('.carousel');
    createCarousel({
      container,
      slideSelector: '.carousel-slide',
      dotSelector: '.dot',
      prevSelector: '.carousel-prev',
      nextSelector: '.carousel-next',
      delay: 5000,
    });

    const slides = container.querySelectorAll('.carousel-slide');
    Object.defineProperty(document, 'hidden', { value: true, writable: true });
    document.dispatchEvent(new Event('visibilitychange'));

    jest.advanceTimersByTime(10000);
    expect(slides[0].classList.contains('active')).toBe(true);

    Object.defineProperty(document, 'hidden', { value: false, writable: true });
    document.dispatchEvent(new Event('visibilitychange'));

    jest.advanceTimersByTime(5000);
    expect(slides[1].classList.contains('active')).toBe(true);
  });

  test('does nothing if no slides exist', () => {
    document.body.innerHTML = `
      <div class="carousel">
        <button class="carousel-prev">❮</button>
        <button class="carousel-next">❯</button>
      </div>
    `;
    const container = document.querySelector('.carousel');
    // Should not throw
    expect(() =>
      createCarousel({
        container,
        slideSelector: '.carousel-slide',
        dotSelector: '.dot',
        prevSelector: '.carousel-prev',
        nextSelector: '.carousel-next',
      })
    ).not.toThrow();
  });
});
