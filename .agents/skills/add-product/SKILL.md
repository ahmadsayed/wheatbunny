---
name: Add Product
description: Add a new product to the Wheat Bunny bakery website with Schema.org markup, image optimization, menu placement, and cart integration
---

# Add Product to Wheat Bunny Website

Add a new product to the Wheat Bunny bakery website with full Schema.org markup, optimized images, menu placement, and shopping cart integration.

## Usage

```
/add-product <product-name> --category=<category> --price=<price> --image=<path> [--size=<size>] [--description=<desc>] [--ingredients=<list>] [--inclusions=<list>] [--optional=<list>] [--optimize]
```

## Parameters

- `product-name` (required): Name of the product
- `--category`: Category - `sourdough` or `desserts` (default: sourdough)
- `--price`: Price in SGD (required, format: "12.00" or "9.00-12.00" for range)
- `--image`: Path to image file(s) - comma-separated for multiple (required)
- `--size`: Product size/quantity (e.g., "800-850g", "6 pieces", "250g")
- `--description`: Product description
- `--ingredients`: Comma-separated list of ingredients (for display tags)
- `--inclusions`: Comma-separated list of inclusion flavors (e.g., "Parmesan and Olives,Double Chocolate Chips") — for products where customer picks a flavor
- `--optional`: Comma-separated list of optional add-ons (e.g., "Sesame Seeds,Salt") — shown as checkboxes in cart modal
- `--optimize`: Force image optimization even if WebP exists (flag)
- `--resize`: Target width in pixels (default: 1200, use 0 to skip)

## Image Handling

The skill automatically:
1. **Validates** the image file exists
2. **Optimizes** using jpegoptim (JPEG) or optipng/pngquant (PNG)
3. **Converts to WebP** using cwebp at 85% quality
4. **Resizes** to target width (default 1200px) maintaining aspect ratio
5. **Cleans up unused PNGs** — removes any `.png` file in the same directory if a `.jpg` + `.webp` already exist
6. **Places files** in correct directories:
   - Original optimized: `images/products/{product-id}/{image-name}.jpg`
   - WebP version: `images/products/{product-id}/webp/{image-name}.webp`

## Examples

```bash
# Add product with single image
/add-product "Sourdough Baguette" --category=sourdough --price=8.00 --image="~/Downloads/baguette.jpg" --size="350g" --description="Crispy French-style baguette with chewy interior" --ingredients="Wheat Flour, Water, Salt"

# Add product with multiple images (carousel)
/add-product "Cinnamon Rolls" --category=desserts --price=12.00 --image="~/Downloads/cinnamon-1.jpg,~/Downloads/cinnamon-2.jpg" --size="6 pieces" --description="Soft, gooey cinnamon rolls" --ingredients="Wheat Flour, Butter, Cinnamon, Sugar"

# Add product with inclusion options (customer picks one flavor)
/add-product "Sourdough with Inclusion" --category=sourdough --price=12.00 --image="~/photos/inclusion.jpg" --size="450g" --description="Level up your sourdough" --inclusions="Parmesan and Olives,Double Chocolate Chips"

# Add product with optional add-ons
/add-product "Sourdough Burger Buns" --category=sourdough --price=8.00 --image="~/photos/buns.jpg" --size="6 pieces" --optional="Sesame Seeds"

# Re-optimize existing image
/add-product "Updated Cookies" --category=desserts --price=10.00 --image="images/products/cookies/cookies.jpg" --optimize --ingredients="Flour, Butter, Sugar, Chocolate"
```

## What This Skill Does

### 1. Image Processing
- Validates source image exists
- Creates product directory: `images/products/{product-id}/`
- Resizes to target width (default 1200px) using ImageMagick
- Optimizes JPEG with `jpegoptim --strip-all -m85`
- Optimizes PNG with `optipng -o2 -strip all` or `pngquant`
- Creates WebP with `cwebp -q 85`
- Removes any leftover `.png` files once `.jpg` and `.webp` versions are confirmed
- Places in correct directory structure

### 2. HTML Updates
- Adds product card with `<picture>` element (WebP + fallback)
- Adds to appropriate category section
- Includes ingredients tags, price options

### 3. JavaScript Cart Catalog Update
- **Adds product entry to the `products` array in `main.js`**
- This is required for the shopping cart modal to work
- The DOM order of `.menu-card` elements must match the array order in `products`

### 4. Schema.org JSON-LD
- Adds Product schema to `<head>`
- Includes image URLs, pricing, availability
- Uses AggregateOffer for multiple size/price variants

### 5. Release & Deploy
- Runs `make release` to sync files
- Optionally runs `make deploy` to publish

## Implementation Steps

When invoked, execute these steps:

1. **Parse Arguments**: Extract product name, category, price, image path(s), size, description, ingredients, inclusions, optional add-ons

2. **Generate Product ID**: Convert product name to kebab-case
   ```bash
   product_id=$(echo "$product_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
   ```

3. **Process Images**:
   ```bash
   mkdir -p "images/products/$product_id/webp"
   
   # For each image:
   # - Resize if needed: convert "$src" -resize 1200x> "images/products/$product_id/$name.jpg"
   # - Optimize JPEG: jpegoptim --strip-all -m85 "images/products/$product_id/$name.jpg"
   # - Create WebP: cwebp -q 85 "images/products/$product_id/$name.jpg" -o "images/products/$product_id/webp/$name.webp"
   # - Clean up PNG: rm -f "images/products/$product_id/$name.png"
   ```

4. **Read index.html**: `/home/ahmedh/projects/WheatBunny/index.html`

5. **Generate Product HTML**:
   - Single image: Standard card with `<picture>` using `images/products/{product-id}/...`
   - Multiple images: Carousel with navigation dots/arrows

6. **Update main.js cart catalog**: `/home/ahmedh/projects/WheatBunny/main.js`
   - Find the `const products = [` array
   - Insert a new product object **before the closing `];`**
   - The new entry must match the DOM insertion position (order matters!)
   - See "Cart Catalog Entry" template below

7. **Generate Schema.org JSON-LD**:
   - Product type with name, description, image URL
   - Offer/AggregateOffer with pricing

8. **Insert into HTML**:
   - HTML: After last product in category section
   - JSON-LD: Before `</head>`

9. **Write files** and sync: `make release`

10. **Deploy** (if requested): `make deploy`

## Product HTML Templates

### Single Image
```html
<!-- {Product Name} -->
<div class="menu-card" id="{product-id}">
    <div class="menu-image">
        <picture>
            <source srcset="images/products/{product-id}/webp/{filename}.webp?v=3" type="image/webp">
            <img src="images/products/{product-id}/{filename}.jpg?v=3" alt="{Product Name}" loading="lazy">
        </picture>
    </div>
    <div class="menu-info">
        <h3>{Product Name}</h3>
        <p class="description">{description}</p>
        <div class="ingredients-section">
            <h4>Ingredients</h4>
            <div class="ingredients-tags">
                {ingredient tags}
            </div>
        </div>
        <div class="price-options">
            <div class="price-item">
                <span class="size">{size}</span>
                <span class="price">${price}</span>
            </div>
        </div>
    </div>
</div>
```

### Multiple Images (Carousel)
```html
<!-- {Product Name} -->
<div class="menu-card" id="{product-id}">
    <div class="menu-image-carousel" role="region" aria-label="{Product Name} gallery">
        <div class="menu-carousel-slides">
            <div class="menu-carousel-slide active">
                <picture>
                    <source srcset="images/products/{product-id}/webp/{image1}.webp?v=3" type="image/webp">
                    <img src="images/products/{product-id}/{image1}.jpg?v=3" alt="{Product Name}">
                </picture>
            </div>
            <div class="menu-carousel-slide">
                <picture>
                    <source srcset="images/products/{product-id}/webp/{image2}.webp?v=3" type="image/webp">
                    <img src="images/products/{product-id}/{image2}.jpg?v=3" alt="{Product Name} - View 2">
                </picture>
            </div>
        </div>
        <button class="menu-carousel-arrow menu-carousel-prev" aria-label="Previous slide">❮</button>
        <button class="menu-carousel-arrow menu-carousel-next" aria-label="Next slide">❯</button>
        <div class="menu-carousel-dots">
            <span class="menu-dot active" data-slide="0"></span>
            <span class="menu-dot" data-slide="1"></span>
        </div>
    </div>
    <div class="menu-info">
        <!-- same as single image -->
    </div>
</div>
```

## Cart Catalog Entry

The `products` array in `main.js` powers the shopping cart modal. Every new product **must** be added here.

### Basic Product
```javascript
{
    id: '{product-id}',
    name: '{Product Name}',
    description: '{description}',
    image: 'images/products/{product-id}/{filename}.jpg',
    sizes: [
        { label: '{size}', price: {price} }
    ]
}
```

### Product with Multiple Sizes
```javascript
{
    id: '{product-id}',
    name: '{Product Name}',
    description: '{description}',
    image: 'images/products/{product-id}/{filename}.jpg',
    sizes: [
        { label: 'Large (800-850g)', price: 12 },
        { label: 'Small (400-450g)', price: 8 }
    ]
}
```

### Product with Inclusions (customer picks one)
```javascript
{
    id: '{product-id}',
    name: '{Product Name}',
    description: '{description}',
    image: 'images/products/{product-id}/{filename}.jpg',
    sizes: [
        { label: '{size}', price: {price} }
    ],
    inclusions: ['Parmesan and Olives', 'Double Chocolate Chips', 'Croissant Country Bread']
}
```

### Product with Optional Add-ons (customer checks boxes)
```javascript
{
    id: '{product-id}',
    name: '{Product Name}',
    description: '{description}',
    image: 'images/products/{product-id}/{filename}.jpg',
    sizes: [
        { label: '{size}', price: {price} }
    ],
    optionalIngredients: ['Sesame Seeds', 'Salt']
}
```

**Critical:** The `image` path is used as the cart thumbnail. It should point to the main product image (usually the first/primary image).

## Schema.org Templates

### Single Offer
```html
<!-- Product Schema: {Product Name} -->
<script type="application/ld+json">
{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "{Product Name}",
    "description": "{description}",
    "image": "https://wheatbunny.com/images/products/{product-id}/webp/{filename}.webp",
    "offers": {
        "@type": "Offer",
        "price": "{price}",
        "priceCurrency": "SGD",
        "availability": "https://schema.org/InStock"
    }
}
</script>
```

### Aggregate Offer (multiple sizes)
```html
<!-- Product Schema: {Product Name} -->
<script type="application/ld+json">
{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "{Product Name}",
    "description": "{description}",
    "image": "https://wheatbunny.com/images/products/{product-id}/webp/{filename}.webp",
    "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "SGD",
        "offers": [
            {
                "@type": "Offer",
                "name": "Large (800-850g)",
                "price": "12.00",
                "priceCurrency": "SGD",
                "availability": "https://schema.org/InStock"
            },
            {
                "@type": "Offer",
                "name": "Small (400-450g)",
                "price": "9.00",
                "priceCurrency": "SGD",
                "availability": "https://schema.org/InStock"
            }
        ]
    }
}
</script>
```

## Image Optimization Commands

When processing images, use these commands:

```bash
# 1. Create product directory
mkdir -p "images/products/$product_id/webp"

# 2. Resize (maintain aspect ratio, max width 1200px)
convert "$source" -resize 1200x> "$temp_file"

# 3. Optimize based on format
# JPEG:
jpegoptim --strip-all -m85 "$file"

# PNG:
optipng -o2 -strip all "$file"
# OR for more compression:
pngquant --quality=70-85 --strip --force --output "$file" "$file"

# 4. Create WebP
cwebp -q 85 -mt "$file" -o "${file%.*}.webp"

# 5. Move WebP to webp subdirectory
mv "${file%.*}.webp" "images/products/$product_id/webp/"

# 6. Clean up PNG if JPG + WebP exist
for png in "images/products/$product_id"/*.png; do
    [ -f "$png" ] || continue
    base="${png%.png}"
    if [ -f "${base}.jpg" ] && [ -f "images/products/$product_id/webp/$(basename "$base").webp" ]; then
        rm -f "$png"
    fi
done
```

## Directory Structure

After adding product "Sourdough Baguette":
```
images/products/
└── baguette/                       # Product directory
    ├── baguette.jpg                # Optimized original
    └── webp/
        └── baguette.webp           # WebP version
```

For products with multiple images (carousel):
```
images/products/
└── cinnamon-rolls/                 # Product directory
    ├── cinnamon-rolls-1.jpg
    ├── cinnamon-rolls-2.jpg
    └── webp/
        ├── cinnamon-rolls-1.webp
        └── cinnamon-rolls-2.webp
```

**No `.png` files remain** — they are removed after JPG and WebP are generated.

## Validation Checklist

Before completing, verify:
- [ ] Image file exists and is readable
- [ ] Image is successfully resized (if needed)
- [ ] JPEG/PNG optimization completed
- [ ] WebP version created successfully
- [ ] Images placed in `images/products/{product-id}/` and `images/products/{product-id}/webp/`
- [ ] Unused `.png` files cleaned up
- [ ] Product HTML inserted in correct category
- [ ] **Product entry added to `products` array in `main.js` (cart integration)**
- [ ] **DOM order of `.menu-card` matches `products` array order in `main.js`**
- [ ] `image` path in `main.js` entry points to correct image (used as cart thumbnail)
- [ ] Schema.org JSON-LD added to `<head>`
- [ ] `make release` completed without errors
- [ ] (Optional) `make deploy` completed

## Error Handling

- **Image not found**: Prompt user for correct path
- **Invalid image format**: Convert using ImageMagick or request different file
- **Optimization tools missing**: Install via `sudo dnf install libwebp-tools jpegoptim optipng pngquant`
- **HTML parsing error**: Create backup and attempt manual insertion
- **main.js update error**: Ensure the product object is valid JSON/JS syntax and inserted before the closing `];` of the `products` array
