.PHONY: release deploy deploy-preview clean verify

# Clean release directory
clean:
	@rm -rf release
	@echo "Release directory cleaned"

# Build release: clean, copy root files, sync optimized images
release: clean
	@mkdir -p release/css release/js release/schemas/products release/images
	@echo "Copying root files..."
	@cp index.html sitemap.xml robots.txt release/
	@echo "Copying CSS ($(shell find css -type f | wc -l) files)..."
	@cp -r css/* release/css/
	@echo "Copying JS ($(shell find js -type f | wc -l) files)..."
	@cp -r js/* release/js/
	@echo "Copying schemas ($(shell find schemas -type f | wc -l) files)..."
	@cp -r schemas/* release/schemas/
	@echo "Syncing images..."
	@rsync -av --include='*.jpg' --include='*.jpeg' --include='*.png' \
		--include='*.webp' --include='*/' --exclude='*' images/ release/images/ 2>/dev/null || \
		cp -r images/* release/images/ 2>/dev/null || true
	@$(MAKE) verify
	@echo ""
	@echo "✅ Release build complete"

# Verify all expected files exist in release/
verify:
	@echo "Verifying release contents..."
	@for f in index.html sitemap.xml robots.txt; do \
		test -f "release/$$f" || { echo "❌ MISSING: release/$$f"; exit 1; }; \
	done
	@for f in $$(find css -type f); do \
		test -f "release/$$f" || { echo "❌ MISSING: release/$$f"; exit 1; }; \
	done
	@for f in $$(find js -type f); do \
		test -f "release/$$f" || { echo "❌ MISSING: release/$$f"; exit 1; }; \
	done
	@for f in $$(find schemas -type f); do \
		test -f "release/$$f" || { echo "❌ MISSING: release/$$f"; exit 1; }; \
	done
	@# Verify HTML references resolve to existing files
	@grep -oP 'href="\K[^"]*\.css\b' index.html | while read f; do \
		test -f "release/$$f" || { echo "❌ HTML REFERENCES MISSING FILE: release/$$f"; exit 1; }; \
	done
	@grep -oP 'src="\K[^"]*\.js\b' index.html | while read f; do \
		test -f "release/$$f" || { echo "❌ HTML REFERENCES MISSING FILE: release/$$f"; exit 1; }; \
	done
	@grep -oP 'src="\K[^"]*\.json\b' index.html | while read f; do \
		test -f "release/$$f" || { echo "❌ HTML REFERENCES MISSING FILE: release/$$f"; exit 1; }; \
	done
	@echo "✅ All files verified"

# Deploy to Cloudflare Pages production (root domain)
deploy: release
	@wrangler pages deploy ./release/ --project-name="spring-grass-0b44" --branch=production
	@echo "Deployed to production: https://spring-grass-0b44.pages.dev/"

# Deploy to preview branch (main)
deploy-preview: release
	@wrangler pages deploy ./release/ --project-name="spring-grass-0b44" --branch=main
	@echo "Deployed to preview: https://main.spring-grass-0b44.pages.dev/"
