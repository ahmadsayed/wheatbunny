---
name: Add Product
description: Add a new product to the Wheat Bunny bakery website with Schema.org markup, image optimization, and cart integration
---

# Add Product to Wheat Bunny Website

Add a new product to the Wheat Bunny bakery website with full Schema.org markup, optimized images, and shopping cart integration.

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

### 2. Update Product Catalog (`js/products.js`)
- **Adds product entry to the `products` array in `js/products.js`**
- This is the single source of truth that powers both the rendered menu cards and the shopping cart modal
- The `category` field determines which section the product appears in

### 3. Schema.org JSON-LD
- Creates `schemas/products/{product-id}.json`
- Product type with name, description, image URL
- Offer/AggregateOffer with pricing
- Automatically linked in `index.html` via `<script type="application/ld+json" src="...">`

### 4. Release & Deploy
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

4. **Update Product Catalog**: `/home/ahmedh/projects/WheatBunny/js/products.js`
   - Find the `export const products = [` array
   - Insert a new product object **before the closing `];`**
   - See "Product Catalog Entry" template below

5. **Generate Schema.org JSON-LD**:
   - Create `schemas/products/{product-id}.json`
   - Include image URLs, pricing, availability
   - Uses AggregateOffer for multiple size/price variants

6. **Link Schema in HTML**:
   - Add `<script type="application/ld+json" src="schemas/products/{product-id}.json"></script>` to `<head>` in `index.html`

7. **Write files** and sync: `make release`

8. **Deploy** (if requested): `make deploy`

## Product Catalog Entry

The `products` array in `js/products.js` is the single source of truth for both menu rendering and the shopping cart.

### Basic Product
```javascript
{
    id: '{product-id}',
    name: '{Product Name}',
    description: '{description}',
    images: [
        { webp: 'images/products/{product-id}/webp/{filename}.webp?v=3', fallback: 'images/products/{product-id}/{filename}.jpg?v=3', alt: '{Product Name}', width: 1200, height: 900 }
    ],
    ingredients: ['Wheat Flour', 'Water', 'Salt'],
    sizes: [
        { label: '{size}', price: {price} }
    ],
    category: 'Sourdough Breads'
}
```

### Product with Multiple Sizes
```javascript
{
    id: '{product-id}',
    name: '{Product Name}',
    description: '{description}',
    images: [
        { webp: 'images/products/{product-id}/webp/{filename}.webp?v=3', fallback: 'images/products/{product-id}/{filename}.jpg?v=3', alt: '{Product Name}', width: 1200, height: 900 }
    ],
    ingredients: ['Wheat Flour', 'Water', 'Salt'],
    sizes: [
        { label: 'Large (800-850g)', price: 12 },
        { label: 'Small (400-450g)', price: 8 }
    ],
    category: 'Sourdough Breads'
}
```

### Product with Inclusions (customer picks one)
```javascript
{
    id: '{product-id}',
    name: '{Product Name}',
    description: '{description}',
    images: [
        { webp: 'images/products/{product-id}/webp/{filename}.webp?v=3', fallback: 'images/products/{product-id}/{filename}.jpg?v=3', alt: '{Product Name}', width: 1200, height: 900 }
    ],
    inclusions: ['Parmesan and Olives', 'Double Chocolate Chips', 'Croissant Country Bread'],
    sizes: [
        { label: '{size}', price: {price} }
    ],
    category: 'Sourdough Breads'
}
```

### Product with Optional Add-ons (customer checks boxes)
```javascript
{
    id: '{product-id}',
    name: '{Product Name}',
    description: '{description}',
    images: [
        { webp: 'images/products/{product-id}/webp/{filename}.webp?v=3', fallback: 'images/products/{product-id}/{filename}.jpg?v=3', alt: '{Product Name}', width: 1200, height: 900 }
    ],
    ingredients: ['Wheat Flour', 'Water', 'Salt'],
    optionalIngredients: ['Sesame Seeds', 'Salt'],
    sizes: [
        { label: '{size}', price: {price} }
    ],
    category: 'Sourdough Breads'
}
```

**Critical:** The `images` array is used for both menu rendering and cart thumbnails. The first image is the primary/cart thumbnail.

### Product with Multiple Images (Carousel)
```javascript
{
    id: '{product-id}',
    name: '{Product Name}',
    description: '{description}',
    images: [
        { webp: 'images/products/{product-id}/webp/{image1}.webp?v=3', fallback: 'images/products/{product-id}/{image1}.jpg?v=3', alt: '{Product Name}', width: 1200, height: 900 },
        { webp: 'images/products/{product-id}/webp/{image2}.webp?v=3', fallback: 'images/products/{product-id}/{image2}.jpg?v=3', alt: '{Product Name} - View 2', width: 1200, height: 900 }
    ],
    ingredients: ['Wheat Flour', 'Water', 'Salt'],
    sizes: [
        { label: '{size}', price: {price} }
    ],
    category: 'Sourdough Breads'
}
```

## Schema.org Templates

### Single Offer
```json
{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "{Product Name}",
    "description": "{description}",
    "image": "https://thewheatbunny.shop/images/products/{product-id}/webp/{filename}.webp",
    "brand": { "@type": "Brand", "name": "Wheat Bunny" },
    "offers": {
        "@type": "Offer",
        "name": "{size}",
        "price": "{price}",
        "priceCurrency": "SGD",
        "availability": "https://schema.org/InStock"
    }
}
```

### Aggregate Offer (multiple sizes)
```json
{
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "{Product Name}",
    "description": "{description}",
    "image": "https://thewheatbunny.shop/images/products/{product-id}/webp/{filename}.webp",
    "brand": { "@type": "Brand", "name": "Wheat Bunny" },
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
- [ ] **Product entry added to `products` array in `js/products.js` (cart integration)**
- [ ] `images` array in `js/products.js` entry points to correct images (first image used as cart thumbnail)
- [ ] Schema.org JSON-LD created at `schemas/products/{product-id}.json`
- [ ] Schema linked in `index.html` `<head>`
- [ ] `make release` completed without errors
- [ ] (Optional) `make deploy` completed

## Error Handling

- **Image not found**: Prompt user for correct path
- **Invalid image format**: Convert using ImageMagick or request different file
- **Optimization tools missing**: Install via `sudo dnf install libwebp-tools jpegoptim optipng pngquant`
- **HTML parsing error**: Create backup and attempt manual insertion
- **products.js update error**: Ensure the product object is valid JS syntax and inserted before the closing `];` of the `products` array
