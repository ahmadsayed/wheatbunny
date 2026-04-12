## Brief overview
Project-specific design guidelines for Wheat Bunny - a Singapore-based artisan sourdough bakery website. These rules ensure design consistency with the established warm, artisanal aesthetic and maintain the existing color palette derived from the brand logo.

## Color palette
- **Primary**: `#a88a8a` (muted mauve/dusty rose from logo)
- **Primary dark**: `#8b6f6f` (hover states)
- **Primary light**: `#c4adad` (accents)
- **Background cream**: `#f5f0eb` (main background)
- **Background light**: `#faf8f5` (card backgrounds)
- **Text dark**: `#3d3d3d` (headings, important text)
- **Text medium**: `#666666` (body text)
- **Text light**: `#999999` (captions, secondary info)
- **White**: `#ffffff` (cards, overlays)

## Typography
- **Headings**: `Playfair Display`, serif, weight 600
- **Body text**: `Inter`, sans-serif, weights 300/400/500
- **Hero h1**: 3.5rem desktop, 2.5rem tablet, 2rem mobile
- **Section h2**: 2.5rem desktop, 2rem mobile
- **Card h3**: 1.5rem
- **Body**: 1rem base, 1.1rem for descriptions

## Layout patterns
- **Container**: max-width 1200px, padding 0 20px
- **Section padding**: 100px vertical desktop, 60px mobile
- **Hero**: Flexbox, min-height 100vh, content left / image right
- **Menu grid**: CSS Grid, `repeat(auto-fit, minmax(350px, 1fr))`, gap 40px
- **Cards**: border-radius 20px, subtle shadow, overflow hidden

## Component styles
- **Primary button**: bg primary-color, white text, 50px border-radius, padding 16px 40px, subtle shadow
- **Cards**: white background, 20px border-radius, shadow on hover with translateY(-5px)
- **Images**: border-radius 20px, object-fit cover, smooth scale on hover
- **Price items**: flexbox space-between, dashed border separator

## Responsive breakpoints
- **Desktop**: default styles
- **Tablet**: max-width 968px (hero stacks vertically, h1 reduces)
- **Mobile**: max-width 600px (single column grid, reduced padding)

## CSS conventions
- Use CSS custom properties (variables) in `:root` for all colors
- Transition durations: 0.3s ease for interactions, 0.5s ease for image zooms
- Box shadows: subtle `rgba(0, 0, 0, 0.08)` for default, increased on hover
- Border-radius: consistently 20px for cards/images, 50px for buttons

## Content guidelines
- Prices displayed in SGD with two decimal places (e.g., $12.00)
- Product weights shown as ranges (e.g., 800-850g)
- Emphasize "pre-order" and "home bakery" messaging
- Instagram integration for social/contact (primary CTA method)

## File organization
- Static files served from root directory via Express
- Images stored in `/images/` folder
- Keep HTML semantic with section-based structure
- Maintain single-page layout with anchor navigation

## Release folder
- The `/release/` folder contains the final production-ready files
- **DO NOT EDIT** files in `/release/` when generating code - these are the finalized versions
- Development and edits should happen in the root directory files (`index.html`, `styles.css`, etc.)
- Only update `/release/` files when explicitly instructed to prepare for release
