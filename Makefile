.PHONY: release deploy deploy-preview clean

# Clean release directory
clean:
	@rm -rf release
	@echo "Release directory cleaned"

# Build release: clean, copy root files, sync optimized images
release: clean
	@mkdir -p release
	@cp index.html styles.css sitemap.xml robots.txt main.js release/
	@rsync -av --include='*.jpg' --include='*.jpeg' --include='*.png' \
		--include='*.webp' --include='*/' --exclude='*' images/ release/images/ 2>/dev/null || \
		cp -r images/* release/images/ 2>/dev/null || true
	@echo "Release build complete with optimized images"

# Deploy to Cloudflare Pages production (root domain)
deploy: release
	@wrangler pages deploy ./release/ --project-name="spring-grass-0b44" --branch=production
	@echo "Deployed to production: https://spring-grass-0b44.pages.dev/"

# Deploy to preview branch (main)
deploy-preview: release
	@wrangler pages deploy ./release/ --project-name="spring-grass-0b44" --branch=main
	@echo "Deployed to preview: https://main.spring-grass-0b44.pages.dev/"
