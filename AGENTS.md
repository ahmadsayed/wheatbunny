# Agent Instructions

## Project Overview

**Wheat Bunny** is a static website for an artisan sourdough bakery based in Singapore. It is a single-page site built with vanilla HTML, CSS, and JavaScript — no frameworks. The site features a product catalog with a shopping cart, image carousels, WhatsApp checkout, and rich SEO/Schema.org markup.

**Live URL**: https://thewheatbunny.shop  
**Tech Stack**: Vanilla HTML5, CSS3, JavaScript (ES6). No build tools, bundlers, or frontend frameworks.  
**Hosting**: Cloudflare Pages (project: `spring-grass-0b44`)  
**Contact**: WhatsApp +65 8515 7245

---

## File Structure

```
/
├── index.html          # Single-page website (all sections)
├── styles.css          # All styles (no CSS frameworks)
├── main.js             # All JavaScript: carousels, cart, modal, checkout
├── server.js           # Local dev server (Express)
├── sitemap.xml         # SEO sitemap
├── robots.txt          # SEO robots
├── Makefile            # Build & deploy commands
├── wrangler.toml       # Cloudflare Pages config
├── AGENTS.md           # This file
│
├── images/             # Source images (NOT served directly)
│   ├── products/       # Product images organized by product-id
│   │   ├── country-loaf/
│   │   │   ├── country_load.jpeg
│   │   │   └── webp/
│   │   │       └── country_load.webp
│   │   └── ...
│   ├── customers/      # Customer photos
│   ├── webp/           # General WebP images
│   ├── logo.jpg
│   ├── delivery.jpg
│   ├── side-section.png
│   └── sourdough-portrait.jpg
│
├── release/            # GENERATED — do NOT edit manually
│   ├── index.html      # Copied from root
│   ├── styles.css      # Copied from root
│   ├── main.js         # Copied from root
│   ├── sitemap.xml
│   ├── robots.txt
│   └── images/         # Synced from images/
│
└── .agents/skills/     # Agent skills for this project
    ├── add-product/
    └── deploy-changes/
```

---

## Page Sections (in DOM order)

The `index.html` is a single page with these sections:

1. **Navigation** (`<nav>`) — sticky header with logo and nav links
2. **Hero** (`<section class="hero">`) — full-width carousel with 3 slides, auto-play every 4s
3. **About** (`<section class="about">`) — bakery story with side image
4. **Process** (`<section class="process">`) — 4-step bread-making process cards
5. **Menu** (`<section id="menu" class="menu">`) — product catalog with two categories:
   - **Sourdough Breads** — `.menu-grid` containing `.menu-card` elements
   - **Desserts** — another `.menu-grid` with `.menu-card` elements
6. **Order Info** (`<section id="order-info" class="order-info">`) — how to order, delivery info
7. **Contact** (`<section class="contact">`) — WhatsApp CTA, social links
8. **Footer** — links, copyright

Plus a **Cart Panel** (slide-in from right) and **Product Modal** (centered overlay) that are always in the DOM.

---

## Shopping Cart Architecture

The cart is entirely client-side with no backend.

### Product Catalog (`main.js`)

The `products` array in `main.js` (line ~222) is the **source of truth** for the cart. Each product has:

```javascript
{
    id: 'country-loaf',           // kebab-case, used in URLs and lookups
    name: 'Sourdough Country Loaf',
    description: '...',
    image: 'images/products/country-loaf/country_load.jpeg',  // Cart thumbnail
    sizes: [
        { label: 'Large (800-850g)', price: 12 },
        { label: 'Small (400-450g)', price: 8 }
    ],
    inclusions: ['Parmesan and Olives', ...],      // Optional: customer picks ONE
    optionalIngredients: ['Sesame Seeds', ...]     // Optional: customer checks multiple
}
```

### Cart State

- Stored in `localStorage` under key `wheatbunny-cart`
- Cart items track: `productId`, `size`, `inclusion`, `optional[]`, `quantity`, `unitPrice`, `image`
- Badge on cart button shows total item count

### Product Modal Flow

1. User clicks a `.menu-card`
2. `openModal(productId)` looks up the product in the `products` array
3. Modal renders: product image, size selectors, inclusion selectors (radio), optional checkboxes, quantity stepper
4. User clicks "Add to Cart" → `addToCart()` → saves to `localStorage` → opens cart panel

### Checkout

- Checkout button builds a WhatsApp message with the full order
- Opens `https://wa.me/6585157245?text={order}`
- Includes delivery estimate (2 days from order, or next day if after 6 PM)

### ⚠️ Critical Rule: DOM Order Must Match `products` Array Order

The click handler on `.menu-card` uses `document.querySelectorAll('.menu-card')` index to map to the `products` array index:

```javascript
document.querySelectorAll('.menu-card').forEach((card, index) => {
    card.addEventListener('click', () => {
        const product = products[index];   // INDEX-BASED LOOKUP
        if (product) openModal(product.id);
    });
});
```

**If you add/remove/reorder product cards in HTML, you MUST update the `products` array in `main.js` to match the exact same order.**

---

## Image Conventions

### Product Images

All product images live under `images/products/{product-id}/`:

```
images/products/{product-id}/
├── {filename}.jpg          # Optimized original
└── webp/
    └── {filename}.webp     # WebP version for modern browsers
```

- Product cards use `<picture>` with `<source srcset="...webp">` + `<img src="...jpg">`
- Cart modal uses the `image` field from the `products` array (usually the `.jpg` path)
- Image cache-busting: append `?v=3` to image URLs in HTML

### General Images

- `images/webp/` — WebP versions of general site images
- `images/logo.jpg` — Site favicon and OG image
- Always provide WebP + JPEG/PNG fallback using `<picture>`

### Image Optimization Pipeline

When adding new images:

1. Resize to max 1200px width: `convert "$src" -resize 1200x> "$out"`
2. Optimize JPEG: `jpegoptim --strip-all -m85 "$file"`
3. Optimize PNG: `optipng -o2 -strip all "$file"` or `pngquant`
4. Create WebP: `cwebp -q 85 "$file" -o "$webp"`
5. Remove leftover `.png` once `.jpg` + `.webp` exist

See the `add-product` skill for full details.

---

## SEO & Schema.org

The site has extensive SEO markup:

- **Meta tags**: description, keywords, geo (Singapore), Open Graph, Twitter Cards
- **Canonical URL**: `https://thewheatbunny.shop/`
- **Schema.org JSON-LD** in `<head>`:
  - `Bakery` (LocalBusiness) — business info, address, telephone, opening hours
  - `Product` schemas — one per product with `Offer` or `AggregateOffer`
- **Sitemap**: `sitemap.xml`
- **Robots**: `robots.txt`

When adding products, add both the HTML card AND the corresponding `Product` JSON-LD schema before `</head>`.

---

## Build & Release

### Source vs. Release

| Edit These | NOT These |
|-----------|-----------|
| `index.html` | `release/index.html` |
| `styles.css` | `release/styles.css` |
| `main.js` | `release/main.js` |
| `images/*` | `release/images/*` |

The `release/` directory is a **generated build output**. Never edit files inside it directly.

### Commands

```bash
# Build release/ from source files
make release

# Deploy to Cloudflare Pages production
make deploy

# Deploy to preview branch (main)
make deploy-preview

# Clean release/
make clean
```

### What `make release` does

1. Deletes `release/`
2. Copies `index.html`, `styles.css`, `sitemap.xml`, `robots.txt`, `main.js` into `release/`
3. Syncs optimized images from `images/` to `release/images/` using `rsync`

### Deployment

- **Production**: `make deploy` → deploys to root domain via `wrangler pages deploy`
- **Preview**: `make deploy-preview` → deploys to `main.spring-grass-0b44.pages.dev`
- Cloudflare project name: `spring-grass-0b44`

---

## Development Server

For local testing:

```bash
npm start      # Runs node server.js (Express on port 3000)
npm run dev    # Same as above
```

Then open http://localhost:3000

---

## Key Conventions for Future Changes

### Adding a Product

Use the `add-product` skill. Manual checklist:

1. Process images → `images/products/{product-id}/`
2. Add product card HTML to correct category in `index.html`
3. Add product to `products` array in `main.js` (same DOM order!)
4. Add Schema.org JSON-LD to `<head>`
5. Run `make release`
6. Test: click the card → modal opens → add to cart → checkout message looks correct
7. `make deploy` if ready

### Modifying Styles

- All CSS is in `styles.css` — no preprocessors, no utility frameworks
- Uses CSS custom properties (variables) for colors
- Responsive breakpoints at `768px` and `480px`
- Cart and modal styles are near the end of the file (~line 1500+)

### Modifying JavaScript

- All JS is in `main.js` — no modules, no bundlers
- Organized into IIFEs: Hero Carousel, Packaging Carousel, Menu Carousels, Shopping Cart
- The `products` array is hardcoded — there is no CMS or API

### Adding New Sections

- Add HTML to `index.html` in the appropriate section order
- Add corresponding CSS to `styles.css`
- If it needs JS, add an IIFE to `main.js`
- Run `make release` and test locally

---

## Skills Available

- **`add-product`**: Add a new product with images, HTML, Schema.org, and cart catalog entry
- **`deploy-changes`**: Push to GitHub, run `make release`, and deploy to Cloudflare Pages

Use `/add-product` and `/deploy-changes` (or the skill files directly) when performing those tasks.
