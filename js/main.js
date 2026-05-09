import { createCarousel } from './carousel.js';
import { initCart } from './cart.js';
import { initMenu } from './menu.js';

// Hero carousel
createCarousel({
    container: document.querySelector('.hero-image .carousel'),
    slideSelector: '.carousel-slide',
    dotSelector: '.dot',
    prevSelector: '.carousel-prev',
    nextSelector: '.carousel-next',
    startIndex: 1,
    delay: 4000
});

// Packaging carousel
createCarousel({
    container: document.querySelector('.packaging-carousel'),
    slideSelector: '.packaging-slide',
    dotSelector: '.p-dot',
    prevSelector: '.packaging-prev',
    nextSelector: '.packaging-next',
    delay: 5000
});

initMenu();
initCart();
