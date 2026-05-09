import { products } from './products.js';
import { escapeHtml } from './utils.js';
import { createCarousel } from './carousel.js';
import { openModal } from './cart.js';

export function initMenu() {
    const container = document.querySelector('.menu .container');
    if (!container) return;

    const menuIntro = container.querySelector('.menu-intro');

    const categories = {};
    products.forEach(p => {
        if (!categories[p.category]) categories[p.category] = [];
        categories[p.category].push(p);
    });

    const categoriesWrapper = document.createElement('div');
    Object.entries(categories).forEach(([categoryName, categoryProducts]) => {
        const categoryEl = document.createElement('div');
        categoryEl.className = 'menu-category';
        categoryEl.innerHTML = `
            <h3 class="category-title">${escapeHtml(categoryName)}</h3>
            <div class="menu-grid"></div>
        `;
        const grid = categoryEl.querySelector('.menu-grid');

        categoryProducts.forEach(product => {
            grid.appendChild(createMenuCard(product));
        });

        categoriesWrapper.appendChild(categoryEl);
    });

    if (menuIntro) {
        menuIntro.after(categoriesWrapper);
    } else {
        container.appendChild(categoriesWrapper);
    }

    // Wire add-to-cart buttons
    document.querySelectorAll('.menu-card .add-to-cart-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => {
            openModal(products[index].id);
        });
    });
}

function createMenuCard(product) {
    const card = document.createElement('div');
    card.className = 'menu-card';

    // Image section
    if (product.images.length > 1) {
        card.appendChild(createCarouselImages(product));
    } else {
        card.appendChild(createSingleImage(product.images[0]));
    }

    // Info section
    const info = document.createElement('div');
    info.className = 'menu-info';

    const ingredientsHtml = buildIngredientsHtml(product);

    const sizesHtml = product.sizes.map(s => `
        <div class="price-item">
            <span class="size">${escapeHtml(s.label)}</span>
            <span class="price">$${s.price.toFixed(2)}</span>
        </div>
    `).join('');

    info.innerHTML = `
        <h3>${escapeHtml(product.name)}</h3>
        <p class="description">${escapeHtml(product.description)}</p>
        ${ingredientsHtml}
        <div class="price-options">
            ${sizesHtml}
        </div>
        <button class="add-to-cart-btn" type="button">Add to Cart</button>
    `;

    card.appendChild(info);
    return card;
}

function createSingleImage(img) {
    const div = document.createElement('div');
    div.className = 'menu-image';
    div.innerHTML = `
        <picture>
            <source srcset="${escapeHtml(img.webp)}" type="image/webp">
            <img src="${escapeHtml(img.fallback)}" alt="${escapeHtml(img.alt)}" width="${img.width}" height="${img.height}" loading="${img.loading || 'lazy'}">
        </picture>
    `;
    return div;
}

function createCarouselImages(product) {
    const carousel = document.createElement('div');
    carousel.className = 'menu-image-carousel';
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', `${escapeHtml(product.name)} gallery`);

    const slidesHtml = product.images.map((img, idx) => `
        <div class="menu-carousel-slide ${idx === 0 ? 'active' : ''}">
            <picture>
                <source srcset="${escapeHtml(img.webp)}" type="image/webp">
                <img src="${escapeHtml(img.fallback)}" alt="${escapeHtml(img.alt)}" width="${img.width}" height="${img.height}" loading="${img.loading || 'lazy'}">
            </picture>
        </div>
    `).join('');

    const dotsHtml = product.images.map((_, idx) => `
        <span class="menu-dot ${idx === 0 ? 'active' : ''}" data-slide="${idx}"></span>
    `).join('');

    carousel.innerHTML = `
        <div class="menu-carousel-slides">
            ${slidesHtml}
        </div>
        <button class="menu-carousel-arrow menu-carousel-prev" aria-label="Previous slide">❮</button>
        <button class="menu-carousel-arrow menu-carousel-next" aria-label="Next slide">❯</button>
        <div class="menu-carousel-dots">
            ${dotsHtml}
        </div>
    `;

    requestAnimationFrame(() => {
        createCarousel({
            container: carousel,
            slideSelector: '.menu-carousel-slide',
            dotSelector: '.menu-dot',
            prevSelector: '.menu-carousel-prev',
            nextSelector: '.menu-carousel-next',
            delay: 6000,
            pauseOnHover: true
        });
    });

    return carousel;
}

function buildIngredientsHtml(product) {
    let title, tags;
    if (product.inclusions) {
        title = 'Choose Your Inclusion';
        tags = product.inclusions.map(i => `<span class="ingredient-tag">${escapeHtml(i)}</span>`);
    } else {
        title = 'Ingredients';
        tags = product.ingredients.map(i => `<span class="ingredient-tag">${escapeHtml(i)}</span>`);
        if (product.optionalIngredients) {
            product.optionalIngredients.forEach(o => {
                tags.push(`<span class="ingredient-tag optional">${escapeHtml(o)}</span>`);
            });
        }
    }

    return `
        <div class="ingredients-section">
            <h4>${escapeHtml(title)}</h4>
            <div class="ingredients-tags">
                ${tags.join('')}
            </div>
        </div>
    `;
}
