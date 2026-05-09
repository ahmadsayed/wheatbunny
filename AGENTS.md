# Agent Instructions

## Project Overview

**Wheat Bunny** is a static single-page website for an artisan sourdough bakery in Singapore.

- **Live URL**: https://thewheatbunny.shop
- **Tech Stack**: Vanilla HTML5, CSS3, JavaScript (ES modules, no frameworks, no bundlers)
- **Hosting**: Cloudflare Pages (project `spring-grass-0b44`)
- **Contact**: WhatsApp +65 8515 7245

## File Structure

```
/
├── index.html           # Single-page site (structural sections)
├── css/                 # Modular stylesheets
│   ├── variables.css
│   ├── base.css
│   ├── hero.css
│   ├── carousel.css
│   ├── sections.css
│   ├── menu.css
│   ├── order.css
│   ├── cart.css
│   ├── modal.css
│   ├── floating.css
│   └── responsive.css
├── js/                  # ES modules
│   ├── main.js          # Entry point
│   ├── products.js      # Product catalog (single source of truth)
│   ├── cart.js          # Shopping cart, modal, checkout
│   ├── menu.js          # Dynamic menu rendering
│   ├── carousel.js      # Reusable carousel factory
│   └── utils.js         # Shared utilities
├── schemas/             # Schema.org JSON-LD
│   ├── bakery.json
│   ├── faq.json
│   └── products/
├── sitemap.xml
├── robots.txt
├── Makefile             # make release, make deploy
├── wrangler.toml        # Cloudflare Pages config
├── images/              # Product & site images
├── release/             # GENERATED — do NOT edit directly
└── .agents/skills/      # Agent skills
    ├── add-product/
    └── deploy-changes/
```

## Critical Rules

1. **Edit source files only** — never modify files in `release/`. Run `make release` to regenerate it from the root source files.

2. **Product data lives in one place** — the `js/products.js` array is the single source of truth for both the rendered menu cards and the shopping cart. Menu cards are generated dynamically by `js/menu.js`.

## Skills

- **`add-product`** — Add a new product with image optimization, Schema.org markup, and cart catalog entry. See `.agents/skills/add-product/SKILL.md`.
- **`deploy-changes`** — Push to GitHub, run `make release`, and deploy to Cloudflare Pages. See `.agents/skills/deploy-changes/SKILL.md`.

## Quick Commands

```bash
make release        # Build release/ from source files
make deploy         # Deploy release/ to Cloudflare Pages production
make deploy-preview # Deploy to preview branch
npm start           # Local dev server (localhost:3000)
```
