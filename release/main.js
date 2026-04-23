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
