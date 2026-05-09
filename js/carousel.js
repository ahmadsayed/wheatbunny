export function createCarousel(options) {
    const {
        container,
        slideSelector,
        dotSelector,
        prevSelector,
        nextSelector,
        startIndex = 0,
        delay = 5000,
        pauseOnHover = false
    } = options;

    const slides = container.querySelectorAll(slideSelector);
    const dots = container.querySelectorAll(dotSelector);
    const prevBtn = container.querySelector(prevSelector);
    const nextBtn = container.querySelector(nextSelector);

    if (slides.length === 0 || !prevBtn || !nextBtn) return;

    let currentSlide = startIndex;
    let previousSlide = startIndex;
    let autoPlayInterval;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        slides[previousSlide].classList.remove('active');
        if (dots[previousSlide]) dots[previousSlide].classList.remove('active');
        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
        previousSlide = currentSlide;
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, delay);
    }
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    nextBtn.addEventListener('click', () => { stopAutoPlay(); nextSlide(); startAutoPlay(); });
    prevBtn.addEventListener('click', () => { stopAutoPlay(); prevSlide(); startAutoPlay(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { stopAutoPlay(); showSlide(index); startAutoPlay(); });
    });

    if (pauseOnHover) {
        container.addEventListener('mouseenter', stopAutoPlay);
        container.addEventListener('mouseleave', startAutoPlay);
    }

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) stopAutoPlay(); else startAutoPlay();
    });

    startAutoPlay();
}
