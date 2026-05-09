# Agent Instructions

## Project Overview

**Wheat Bunny** is a static single-page website for an artisan sourdough bakery in Singapore.

- **Live URL**: https://thewheatbunny.shop
- **Tech Stack**: Vanilla HTML5, CSS3, JavaScript (no frameworks, no bundlers)
- **Hosting**: Cloudflare Pages (project `spring-grass-0b44`)
- **Contact**: WhatsApp +65 8515 7245

## File Structure

```
/
├── index.html      # Single-page site (all sections)
├── styles.css      # All styles
├── main.js         # All JS: carousels, shopping cart, modal, checkout
├── sitemap.xml
├── robots.txt
├── Makefile        # make release, make deploy
├── wrangler.toml   # Cloudflare Pages config
├── images/         # Product & site images
├── release/        # GENERATED — do NOT edit directly
└── .agents/skills/ # Agent skills
    ├── add-product/
    └── deploy-changes/
```

## Critical Rules

1. **Edit source files only** — never modify files in `release/`. Run `make release` to regenerate it from the root source files.

2. **DOM order must match `products` array order** — the click handler on `.menu-card` maps cards to the `products` array in `main.js` by index:
   ```javascript
   document.querySelectorAll('.menu-card').forEach((card, index) => {
       card.addEventListener('click', () => {
           const product = products[index];  // INDEX-BASED LOOKUP
           if (product) openModal(product.id);
       });
   });
   ```
   If you add, remove, or reorder product cards in `index.html`, you **must** update the `products` array in `main.js` to match the exact same order. Otherwise, clicking a product will open the wrong modal or nothing at all.

## Skills

- **`add-product`** — Add a new product with image optimization, HTML card, Schema.org markup, and cart catalog entry. See `.agents/skills/add-product/SKILL.md`.
- **`deploy-changes`** — Push to GitHub, run `make release`, and deploy to Cloudflare Pages. See `.agents/skills/deploy-changes/SKILL.md`.

## Quick Commands

```bash
make release        # Build release/ from source files
make deploy         # Deploy release/ to Cloudflare Pages production
make deploy-preview # Deploy to preview branch
npm start           # Local dev server (localhost:3000)
```
