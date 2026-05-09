// Hero Carousel
(function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentSlide = 1;
    let previousSlide = 1;
    let autoPlayInterval;
    const autoPlayDelay = 4000;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        slides[previousSlide].classList.remove('active');
        dots[previousSlide].classList.remove('active');

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        previousSlide = currentSlide;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    startAutoPlay();
})();

// Packaging Carousel (Perfect for Gifting)
(function() {
    const slides = document.querySelectorAll('.packaging-slide');
    const dots = document.querySelectorAll('.p-dot');
    const prevBtn = document.querySelector('.packaging-prev');
    const nextBtn = document.querySelector('.packaging-next');

    if (slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    let previousSlide = 0;
    let autoPlayInterval;
    const autoPlayDelay = 5000;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        slides[previousSlide].classList.remove('active');
        dots[previousSlide].classList.remove('active');

        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        previousSlide = currentSlide;
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            showSlide(index);
            startAutoPlay();
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    });

    startAutoPlay();
})();

// Menu Image Carousels
(function() {
    const carousels = document.querySelectorAll('.menu-image-carousel');

    carousels.forEach((carousel) => {
        const slides = carousel.querySelectorAll('.menu-carousel-slide');
        const dots = carousel.querySelectorAll('.menu-dot');
        const prevBtn = carousel.querySelector('.menu-carousel-prev');
        const nextBtn = carousel.querySelector('.menu-carousel-next');

        if (slides.length === 0 || !prevBtn || !nextBtn) return;

        let currentSlide = 0;
        let previousSlide = 0;
        let autoPlayInterval;
        const autoPlayDelay = 6000;

        function showSlide(index) {
            currentSlide = (index + slides.length) % slides.length;

            slides[previousSlide].classList.remove('active');
            dots[previousSlide].classList.remove('active');

            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');

            previousSlide = currentSlide;
        }

        function nextSlide() {
            showSlide(currentSlide + 1);
        }

        function prevSlide() {
            showSlide(currentSlide - 1);
        }

        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        nextBtn.addEventListener('click', () => {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });

        prevBtn.addEventListener('click', () => {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopAutoPlay();
                showSlide(index);
                startAutoPlay();
            });
        });

        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        startAutoPlay();
    });
})();

// ==================== SHOPPING CART ====================
(function() {
    // Product catalog
    const products = [
        {
            id: 'country-loaf',
            name: 'Sourdough Country Loaf',
            description: 'Classic artisan loaf with crispy crust and soft, airy crumb',
            image: 'images/products/country-loaf/country_load.jpeg',
            sizes: [
                { label: 'Large (800-850g)', price: 12 },
                { label: 'Small (400-450g)', price: 8 }
            ]
        },
        {
            id: 'burger-buns',
            name: 'Sourdough Burger Buns',
            description: 'Soft and flavorful buns, perfect for your gourmet burgers',
            image: 'images/products/burger-buns/burger_buns.jpeg',
            sizes: [
                { label: '6 pieces', price: 8 }
            ],
            optionalIngredients: ['Sesame Seeds']
        },
        {
            id: 'sandwich-bread',
            name: 'Sourdough Sandwich Bread',
            description: 'Soft-crusted loaf, perfect for sandwiches and toast',
            image: 'images/products/sandwich-bread/sandwich_bread.jpeg',
            sizes: [
                { label: 'Large (750-770g)', price: 12 },
                { label: 'Small (400-450g)', price: 8 }
            ]
        },
        {
            id: 'pizza-sandwich-bread',
            name: 'Pizza Sandwich Bread',
            description: 'Fresh sourdough pizza crust — ready for your favorite fillings',
            image: 'images/products/pizza-sandwich-bread/pizza-empty.png',
            sizes: [
                { label: '3 pieces', price: 12 }
            ]
        },
        {
            id: 'sourdough-inclusion',
            name: 'Sourdough with Inclusion',
            description: 'Level up your sourdough bread with inclusion',
            image: 'images/products/inclusion/parmesan-olives.jpg',
            sizes: [
                { label: 'Large (900g)', price: 20 },
                { label: 'Small (450g)', price: 12 }
            ],
            inclusions: ['Parmesan and Olives', 'Croissant Country Bread', 'Double Chocolate Chips', 'Parmesan and Jalapeño']
        },
        {
            id: 'mini-loafs',
            name: 'Mini Loafs',
            description: 'Small sourdough bread with inclusion — perfect for taste tests or gift boxes',
            image: 'images/products/mini-loafs/mini-loafs.jpg',
            sizes: [
                { label: '~220g', price: 6 }
            ],
            inclusions: ['Parmesan and Olives', 'Croissant Country Bread', 'Double Chocolate Chips', 'Parmesan and Jalapeño']
        },
        {
            id: 'chocolate-chip-cookies',
            name: 'Chocolate Chip Cookies',
            description: 'Classic chewy cookies with rich chocolate chips',
            image: 'images/products/chocolate-chip-cookies/coockies_salt.jpg',
            sizes: [
                { label: '250g (10-12 pieces)', price: 10 }
            ],
            optionalIngredients: ['Salt']
        },
        {
            id: 'zebra-butter-cookies',
            name: 'Zebra Butter Cookies',
            description: 'Beautiful buttery marbled cookies with vanilla and chocolate swirls',
            image: 'images/products/zebra-cookies/Zebra cookies.jpg',
            sizes: [
                { label: '250g (18-22 pieces)', price: 10 }
            ]
        }
    ];

    const STORAGE_KEY = 'wheatbunny-cart';

    // Cart state
    let cart = [];

    function loadCart() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) cart = JSON.parse(raw);
        } catch (e) {
            cart = [];
        }
    }

    function saveCart() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    }

    function getCartItemCount() {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function getCartTotal() {
        return cart.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
    }

    function addToCart(productId, sizeLabel, inclusion, optional, quantity) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const size = product.sizes.find(s => s.label === sizeLabel);
        if (!size) return;

        const optKey = (optional || []).sort().join(',');
        const existing = cart.find(item =>
            item.productId === productId &&
            item.size === sizeLabel &&
            item.inclusion === (inclusion || null) &&
            (item.optional || []).sort().join(',') === optKey
        );

        if (existing) {
            existing.quantity += quantity;
        } else {
            cart.push({
                id: Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
                productId: product.id,
                name: product.name,
                size: sizeLabel,
                inclusion: inclusion || null,
                optional: optional || [],
                quantity: quantity,
                unitPrice: size.price,
                image: product.image
            });
        }

        saveCart();
        updateCartBadge();
    }

    function updateQuantity(cartItemId, delta) {
        const item = cart.find(i => i.id === cartItemId);
        if (!item) return;
        item.quantity += delta;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== cartItemId);
        }
        saveCart();
        renderCart();
        updateCartBadge();
    }

    function removeItem(cartItemId) {
        cart = cart.filter(i => i.id !== cartItemId);
        saveCart();
        renderCart();
        updateCartBadge();
    }

    function emptyCart() {
        if (cart.length === 0) return;
        if (confirm('Are you sure you want to empty your cart?')) {
            cart = [];
            saveCart();
            renderCart();
            updateCartBadge();
        }
    }

    function getDeliveryEstimate() {
        const now = new Date();
        let orderDate = new Date(now);

        // If after 6:00 PM, treat as next-day order
        if (orderDate.getHours() >= 18) {
            orderDate.setDate(orderDate.getDate() + 1);
        }

        // Add 2 days for delivery estimate
        const deliveryDate = new Date(orderDate);
        deliveryDate.setDate(deliveryDate.getDate() + 2);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return deliveryDate.toLocaleDateString('en-SG', options);
    }

    // DOM refs
    const cartBtn = document.getElementById('cart-toggle-btn');
    const cartBadge = document.getElementById('cart-badge');
    const cartPanel = document.getElementById('cart-panel');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartClose = document.getElementById('cart-close');
    const cartEmptyBtn = document.getElementById('cart-empty-btn');
    const cartItemsEl = document.getElementById('cart-items');
    const cartEmptyEl = document.getElementById('cart-empty');
    const cartTotalEl = document.getElementById('cart-total');
    const cartDeliveryEstimateEl = document.getElementById('cart-delivery-estimate');
    const checkoutBtn = document.getElementById('checkout-btn');

    const productModal = document.getElementById('product-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalClose = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalSizes = document.getElementById('modal-sizes');
    const modalInclusions = document.getElementById('modal-inclusions');
    const modalInclusionsSection = document.getElementById('modal-inclusions-section');
    const modalOptionalSection = document.getElementById('modal-optional-section');
    const modalOptional = document.getElementById('modal-optional');
    const modalQuantity = document.getElementById('modal-quantity');
    const modalQtyMinus = document.getElementById('modal-qty-minus');
    const modalQtyPlus = document.getElementById('modal-qty-plus');
    const modalAddBtn = document.getElementById('modal-add-btn');

    let currentProduct = null;
    let currentQuantity = 1;

    function updateCartBadge() {
        const count = getCartItemCount();
        if (cartBadge) {
            cartBadge.textContent = count;
            cartBadge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    function openCart() {
        if (!cartPanel) return;
        renderCart();
        cartPanel.classList.add('open');
        if (cartOverlay) cartOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        if (!cartPanel) return;
        cartPanel.classList.remove('open');
        if (cartOverlay) cartOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    function openModal(productId) {
        const product = products.find(p => p.id === productId);
        if (!product || !productModal) return;

        currentProduct = product;
        currentQuantity = 1;

        modalImage.src = product.image;
        modalImage.alt = product.name;
        modalTitle.textContent = product.name;
        modalDesc.textContent = product.description;

        // Render sizes
        modalSizes.innerHTML = '';
        product.sizes.forEach((size, idx) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'selector-btn' + (idx === 0 ? ' active' : '');
            btn.dataset.value = size.label;
            btn.dataset.price = size.price;
            btn.innerHTML = `<span class="selector-label">${escapeHtml(size.label)}</span><span class="selector-price">$${size.price.toFixed(2)}</span>`;
            btn.addEventListener('click', () => {
                modalSizes.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
            modalSizes.appendChild(btn);
        });

        // Render inclusions
        if (product.inclusions && product.inclusions.length > 0) {
            modalInclusionsSection.style.display = 'block';
            modalInclusions.innerHTML = '';
            product.inclusions.forEach((inc, idx) => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'selector-btn' + (idx === 0 ? ' active' : '');
                btn.dataset.value = inc;
                btn.textContent = inc;
                btn.addEventListener('click', () => {
                    modalInclusions.querySelectorAll('.selector-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
                modalInclusions.appendChild(btn);
            });
        } else {
            modalInclusionsSection.style.display = 'none';
        }

        // Render optional ingredients
        if (product.optionalIngredients && product.optionalIngredients.length > 0) {
            modalOptionalSection.style.display = 'block';
            modalOptional.innerHTML = '';
            product.optionalIngredients.forEach((opt) => {
                const label = document.createElement('label');
                label.className = 'checkbox-label';
                label.innerHTML = `
                    <input type="checkbox" class="checkbox-input" value="${escapeHtml(opt)}">
                    <span class="checkbox-text">${escapeHtml(opt)}</span>
                `;
                modalOptional.appendChild(label);
            });
        } else {
            modalOptionalSection.style.display = 'none';
        }

        modalQuantity.textContent = '1';

        productModal.classList.add('open');
        if (modalOverlay) modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!productModal) return;
        productModal.classList.remove('open');
        if (modalOverlay) modalOverlay.classList.remove('open');
        document.body.style.overflow = '';
        currentProduct = null;
    }

    function getSelectedSize() {
        if (!modalSizes) return null;
        const active = modalSizes.querySelector('.selector-btn.active');
        return active ? active.dataset.value : null;
    }

    function getSelectedInclusion() {
        if (!modalInclusions || modalInclusionsSection.style.display === 'none') return null;
        const active = modalInclusions.querySelector('.selector-btn.active');
        return active ? active.dataset.value : null;
    }

    function getSelectedOptional() {
        if (!modalOptional || modalOptionalSection.style.display === 'none') return [];
        const checked = modalOptional.querySelectorAll('.checkbox-input:checked');
        return Array.from(checked).map(cb => cb.value);
    }

    function renderCart() {
        if (!cartItemsEl || !cartEmptyEl || !cartTotalEl) return;

        if (cart.length === 0) {
            cartItemsEl.style.display = 'none';
            cartEmptyEl.style.display = 'block';
            cartTotalEl.textContent = '$0.00';
            if (checkoutBtn) checkoutBtn.disabled = true;
            if (cartEmptyBtn) cartEmptyBtn.style.display = 'none';
            if (cartDeliveryEstimateEl) cartDeliveryEstimateEl.textContent = '';
            return;
        }

        cartItemsEl.style.display = 'block';
        cartEmptyEl.style.display = 'none';
        if (cartEmptyBtn) cartEmptyBtn.style.display = 'inline-block';
        if (checkoutBtn) checkoutBtn.disabled = false;
        if (cartDeliveryEstimateEl) cartDeliveryEstimateEl.textContent = 'Estimated delivery: ' + getDeliveryEstimate();

        cartItemsEl.innerHTML = '';
        cart.forEach(item => {
            const lineTotal = item.unitPrice * item.quantity;
            const el = document.createElement('div');
            el.className = 'cart-item';
            el.innerHTML = `
                <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.name)}" class="cart-item-img" loading="lazy">
                <div class="cart-item-info">
                    <div class="cart-item-name">${escapeHtml(item.name)}</div>
                    <div class="cart-item-meta">${escapeHtml(item.size)}${item.inclusion ? ' · ' + escapeHtml(item.inclusion) : ''}${item.optional && item.optional.length > 0 ? ' · +' + item.optional.map(escapeHtml).join(', ') : ''}</div>
                    <div class="cart-item-price">$${item.unitPrice.toFixed(2)} each</div>
                    <div class="cart-item-actions">
                        <div class="qty-stepper">
                            <button type="button" class="qty-btn" data-action="minus" data-id="${item.id}" aria-label="Decrease quantity">−</button>
                            <span class="qty-value">${item.quantity}</span>
                            <button type="button" class="qty-btn" data-action="plus" data-id="${item.id}" aria-label="Increase quantity">+</button>
                        </div>
                        <button type="button" class="cart-item-delete" data-id="${item.id}" aria-label="Remove item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </div>
                <div class="cart-item-total">$${lineTotal.toFixed(2)}</div>
            `;
            cartItemsEl.appendChild(el);
        });

        cartTotalEl.textContent = '$' + getCartTotal().toFixed(2);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Event listeners
    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (cartClose) cartClose.addEventListener('click', closeCart);
    if (cartEmptyBtn) cartEmptyBtn.addEventListener('click', emptyCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

    const cartBackToMenu = document.getElementById('cart-back-to-menu');
    if (cartBackToMenu) {
        cartBackToMenu.addEventListener('click', closeCart);
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

    if (modalQtyMinus) {
        modalQtyMinus.addEventListener('click', () => {
            if (currentQuantity > 1) {
                currentQuantity--;
                modalQuantity.textContent = currentQuantity;
            }
        });
    }

    if (modalQtyPlus) {
        modalQtyPlus.addEventListener('click', () => {
            if (currentQuantity < 20) {
                currentQuantity++;
                modalQuantity.textContent = currentQuantity;
            }
        });
    }

    if (modalAddBtn) {
        modalAddBtn.addEventListener('click', () => {
            if (!currentProduct) return;
            const size = getSelectedSize();
            const inclusion = getSelectedInclusion();
            const optional = getSelectedOptional();
            addToCart(currentProduct.id, size, inclusion, optional, currentQuantity);
            closeModal();
            openCart();
        });
    }

    if (cartItemsEl) {
        cartItemsEl.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-action]');
            if (btn) {
                const id = btn.dataset.id;
                const action = btn.dataset.action;
                if (action === 'minus') updateQuantity(id, -1);
                if (action === 'plus') updateQuantity(id, 1);
                return;
            }
            const delBtn = e.target.closest('.cart-item-delete');
            if (delBtn) {
                removeItem(delBtn.dataset.id);
            }
        });
    }

    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length === 0) return;

            const lines = [];
            lines.push('Hi Wheat Bunny! I would like to place an order:%0A');

            cart.forEach((item, idx) => {
                const lineTotal = item.unitPrice * item.quantity;
                let line = `${idx + 1}. ${item.name}`;
                line += `%0A   Size: ${item.size}`;
                if (item.inclusion) {
                    line += `%0A   Inclusion: ${item.inclusion}`;
                }
                if (item.optional && item.optional.length > 0) {
                    line += `%0A   Optional: ${item.optional.join(', ')}`;
                }
                line += `%0A   Qty: ${item.quantity}`;
                line += `%0A   $${item.unitPrice.toFixed(2)} each = $${lineTotal.toFixed(2)}`;
                lines.push(line);
            });

            lines.push(`%0AEstimated Total: $${getCartTotal().toFixed(2)}`);
            lines.push(`%0AEstimated Delivery Date: ${getDeliveryEstimate()}`);
            lines.push('%0A*Note: This cost does not include delivery. Delivery rates vary based on distance and time, and will be communicated via WhatsApp.*');
            lines.push('%0AThank you!');

            const message = lines.join('%0A');
            const url = `https://wa.me/6585157245?text=${message}`;
            window.open(url, '_blank');
        });
    }

    // Add-to-cart buttons open the product modal
    document.querySelectorAll('.menu-card').forEach((card, index) => {
        const btn = card.querySelector('.add-to-cart-btn');
        if (btn) {
            btn.addEventListener('click', () => {
                const product = products[index];
                if (product) openModal(product.id);
            });
        }
    });

    // Keyboard: Escape closes modal or cart
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (productModal && productModal.classList.contains('open')) {
                closeModal();
            } else if (cartPanel && cartPanel.classList.contains('open')) {
                closeCart();
            }
        }
    });

    // Init
    loadCart();
    updateCartBadge();
})();
