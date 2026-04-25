---
name: Add Product
description: Add a new product to the Wheat Bunny bakery website with Schema.org markup, image optimization, and menu placement
---

# Add Product to Wheat Bunny Website

Add a new product to the Wheat Bunny bakery website with full Schema.org markup, optimized images, and menu placement.

## Usage

```
/add-product <product-name> --category=<category> --price=<price> --image=<path> [--size=<size>] [--description=<desc>] [--ingredients=<list>] [--optimize]
```

## Parameters

- `product-name` (required): Name of the product
- `--category`: Category - `sourdough` or `desserts` (default: sourdough)
- `--price`: Price in SGD (required, format: "12.00" or "9.00-12.00" for range)
- `--image`: Path to image file(s) - comma-separated for multiple (required)
- `--size`: Product size/quantity (e.g., "800-850g", "6 pieces", "250g")
- `--description`: Product description
- `--ingredients`: Comma-separated list of ingredients
- `--optimize`: Force image optimization even if WebP exists (flag)
- `--resize`: Target width in pixels (default: 1200, use 0 to skip)

## Image Handling

The skill automatically:
1. **Validates** the image file exists
2. **Optimizes** using jpegoptim (JPEG) or optipng/pngquant (PNG)
3. **Converts to WebP** using cwebp at 85% quality
4. **Resizes** to target width (default 1200px) maintaining aspect ratio
5. **Places files** in correct directories:
   - Original optimized: `images/{product-id}.jpg`
   - WebP version: `images/webp/{product-id}.webp`
   - For carousels: `images/{product-id}/{image-name}.jpg`

## Examples

```bash
# Add product with single image
/add-product "Sourdough Baguette" --category=sourdough --price=8.00 --image="~/Downloads/baguette.jpg" --size="350g" --description="Crispy French-style baguette with chewy interior" --ingredients="Wheat Flour, Water, Salt"

# Add product with multiple images (carousel)
/add-product "Cinnamon Rolls" --category=desserts --price=12.00 --image="~/Downloads/cinnamon-1.jpg,~/Downloads/cinnamon-2.jpg" --size="6 pieces" --description="Soft, gooey cinnamon rolls" --ingredients="Wheat Flour, Butter, Cinnamon, Sugar"

# Add product with image optimization
/add-product "Sourdough Rye" --category=sourdough --price=14.00 --image="~/photos/rye.jpg" --resize=1600 --description="Hearty rye sourdough with caraway seeds" --ingredients="Rye Flour, Wheat Flour, Water, Salt, Caraway Seeds"

# Re-optimize existing image
/add-product "Updated Cookies" --category=desserts --price=10.00 --image="images/cookies.jpg" --optimize --ingredients="Flour, Butter, Sugar, Chocolate"
```

## What This Skill Does

### 1. Image Processing
- Validates source image exists
- Resizes to target width (default 1200px) using ImageMagick
- Optimizes JPEG with `jpegoptim --strip-all -m85`
- Optimizes PNG with `optipng -o2 -strip all` or `pngquant`
- Creates WebP with `cwebp -q 85`
- Places in correct directory structure

### 2. HTML Updates
- Adds product card with `<picture>` element (WebP + fallback)
- Adds to appropriate category section
- Includes ingredients tags, price options

### 3. Schema.org JSON-LD
- Adds Product schema to `<head>`
- Includes image URLs, pricing, availability
- Uses AggregateOffer for multiple size/price variants

### 4. Release & Deploy
- Runs `make release` to sync files
- Optionally runs `make deploy` to publish

## Implementation Steps

When invoked, execute these steps:

1. **Parse Arguments**: Extract product name, category, price, image path(s), size, description, ingredients

2. **Process Images**:
   ```bash
   # Generate kebab-case filename from product name
   filename=$(echo "$product_name" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')

   # For each image:
   # - Resize if needed: convert "$src" -resize 1200x> "images/$filename.jpg"
   # - Optimize JPEG: jpegoptim --strip-all -m85 "images/$filename.jpg"
   # - Create WebP: cwebp -q 85 "images/$filename.jpg" -o "images/webp/$filename.webp"
   ```

3. **Read index.html**: `/home/ahmedh/projects/WheatBunny/index.html`

4. **Generate Product HTML**:
   - Single image: Standard card with `<picture>`
   - Multiple images: Carousel with navigation dots/arrows

5. **Generate Schema.org JSON-LD**:
   - Product type with name, description, image URL
   - Offer/AggregateOffer with pricing

6. **Insert into HTML**:
   - HTML: After last product in category section
   - JSON-LD: Before `</head>`

7. **Write file** and sync: `make release`

8. **Deploy** (if requested): `make deploy`

## Product HTML Templates

### Single Image
```html
<!-- {Product Name} -->
<div class="menu-card" id="{product-id}">
    <div class="menu-image">
        <picture>
            <source srcset="images/webp/{filename}.webp?v=3" type="image/webp">
            <img src="images/{filename}.jpg?v=3" alt="{Product Name}">
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
    <div class="menu-image-carousel">
        <div class="menu-carousel-slides">
            <div class="menu-carousel-slide active">
                <picture>
                    <source srcset="images/webp/{product-id}/{image1}.webp?v=3" type="image/webp">
                    <img src="images/{product-id}/{image1}.jpg?v=3" alt="{Product Name}">
                </picture>
            </div>
            <div class="menu-carousel-slide">
                <picture>
                    <source srcset="images/webp/{product-id}/{image2}.webp?v=3" type="image/webp">
                    <img src="images/{product-id}/{image2}.jpg?v=3" alt="{Product Name} - View 2">
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
    "image": "https://wheatbunny.com/images/webp/{filename}.webp",
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
    "image": "https://wheatbunny.com/images/webp/{filename}.webp",
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
# 1. Resize (maintain aspect ratio, max width 1200px)
convert "$source" -resize 1200x> "$temp_file"

# 2. Optimize based on format
# JPEG:
jpegoptim --strip-all -m85 "$file"

# PNG:
optipng -o2 -strip all "$file"
# OR for more compression:
pngquant --quality=70-85 --strip --force --output "$file" "$file"

# 3. Create WebP
cwebp -q 85 -mt "$file" -o "${file%.*}.webp"
```

## Directory Structure

After adding product "Sourdough Baguette":
```
images/
├── baguette.jpg                    # Optimized original
├── webp/
│   └── baguette.webp              # WebP version
└── baguette/                      # (only if multiple images)
    ├── baguette-1.jpg
    ├── baguette-2.jpg
    └── webp/
        ├── baguette-1.webp
        └── baguette-2.webp
```

## Validation Checklist

Before completing, verify:
- [ ] Image file exists and is readable
- [ ] Image is successfully resized (if needed)
- [ ] JPEG/PNG optimization completed
- [ ] WebP version created successfully
- [ ] Images placed in correct directories
- [ ] Product HTML inserted in correct category
- [ ] Schema.org JSON-LD added to `<head>`
- [ ] `make release` completed without errors
- [ ] (Optional) `make deploy` completed

## Error Handling

- **Image not found**: Prompt user for correct path
- **Invalid image format**: Convert using ImageMagick or request different file
- **Optimization tools missing**: Install via `sudo dnf install libwebp-tools jpegoptim optipng pngquant`
- **HTML parsing error**: Create backup and attempt manual insertion
