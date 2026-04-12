---
name: release-and-deploy
# prettier-ignore
description: Sync the project to the release directory and deploy to Cloudflare Pages
type: command
---

# Release and Deploy to Cloudflare

Sync the project to the release directory and deploy to Cloudflare Pages.

## Usage

```
/release-and-deploy [--skip-sync] [--dry-run]
```

## Parameters

- `--skip-sync`: Skip syncing files to release directory, deploy only
- `--dry-run`: Show what would be deployed without actually deploying

## What This Skill Does

1. **Sync to Release Directory**
   - Copies `index.html` to `release/`
   - Copies all images from `images/` to `release/images/`
   - Ensures WebP versions are included
   - Preserves directory structure

2. **Validate Release**
   - Checks that all referenced images exist
   - Verifies HTML is valid
   - Confirms file sizes are reasonable

3. **Deploy to Cloudflare**
   - Runs `wrangler pages deploy release --project-name=spring-grass-0b44`
   - Returns the deployment URL

## Implementation Steps

When invoked, execute:

1. **Sync Files** (unless `--skip-sync`):
   ```bash
   # Copy HTML and CSS
   cp index.html release/
   cp styles.css release/
   cp robots.txt release/
   cp sitemap.xml release/

   # Sync images (preserve structure)
   rsync -av --delete images/ release/images/
   ```

2. **Validate**:
   - Check release/index.html exists
   - Verify critical images are present
   - Check file sizes

3. **Deploy** (unless `--dry-run`):
   ```bash
   wrangler pages deploy release --project-name=spring-grass-0b44 --commit-dirty=true
   ```

4. **Report**: Return deployment URL

## Examples

```bash
# Full release and deploy
/release-and-deploy

# Deploy only (skip sync)
/release-and-deploy --skip-sync

# Dry run (show what would happen)
/release-and-deploy --dry-run
```

## Directory Structure

```
release/
├── index.html          # Main HTML file
├── styles.css          # Stylesheet
├── robots.txt          # SEO robots file
├── sitemap.xml         # SEO sitemap
└── images/             # All optimized images
    ├── logo.jpg
    ├── webp/
    │   └── logo.webp
    └── products/
        └── ...
```

## Error Handling

- **Wrangler not authenticated**: Prompt user to run `wrangler login`
- **Missing files**: Report which files are missing
- **Deploy fails**: Show error message and suggest fixes

## Validation Checklist

Before deploying, verify:
- [ ] release/index.html exists and is readable
- [ ] release/styles.css exists
- [ ] release/images/ directory populated
- [ ] All WebP images are present
- [ ] No broken image references in HTML
- [ ] Wrangler CLI is authenticated
- [ ] Deployment succeeds with URL returned
