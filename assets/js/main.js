/**
 * CLEVIX TECH - MAIN CLIENT CONTROLLER
 * Navbar scroll shrink/blur, mobile drawer, FAQ accordion,
 * rotating text, back-to-top, pricing tabs, auto-carousel & scroll-reveal animations
 */

(function () {
  'use strict';

  // Clean URL Engine: Strip .html and /index.html in live browser view
  if (window.location.pathname.endsWith('/index.html')) {
    const cleanUrl = window.location.pathname.replace(/\/index\.html$/, '/') + window.location.search + window.location.hash;
    window.history.replaceState(null, '', cleanUrl);
  } else if (window.location.pathname.endsWith('.html')) {
    const cleanUrl = window.location.pathname.replace(/\.html$/, '') + window.location.search + window.location.hash;
    window.history.replaceState(null, '', cleanUrl);
  }

  // 1. Header scroll behavior (shrink & blur)
  const header = document.querySelector('.site-header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Nav Drawer Toggle (fallback if not already bound)
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  if (mobileToggle && navMenu && !mobileToggle.dataset.bound) {
    mobileToggle.dataset.bound = 'true';
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      if (navBackdrop) navBackdrop.classList.toggle('open', isOpen);
      mobileToggle.classList.toggle('open', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navMenu.querySelectorAll('.nav-link, .btn-quote-trigger').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        if (navBackdrop) navBackdrop.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Highlight current active page link
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const rawPath = pathParts.length ? pathParts[pathParts.length - 1].replace(/\.html$/, '') : '';
  const currentSlug = (rawPath === '' || rawPath === 'index') ? '/' : rawPath;
  document.querySelectorAll('.nav-link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const linkSlug = href.replace(/^\//, '').replace(/\/$/, '').replace(/\.html$/, '');
    if (
      (currentSlug === '/' && (href === '/' || linkSlug === '' || linkSlug === 'index')) ||
      (currentSlug !== '/' && (linkSlug === currentSlug || href === `/${currentSlug}` || href === currentSlug))
    ) {
      link.classList.add('active');
    }
  });

  // 4. Rotating text animation for Homepage Hero
  const rotatingEl = document.querySelector('.rotating-text');
  if (rotatingEl) {
    const services = [
      'Website Development',
      'Mobile App Development',
      'Performance Marketing',
      'Data-Driven SEO',
      'Custom Software'
    ];
    let currentIndex = 0;

    setInterval(() => {
      rotatingEl.style.opacity = '0';
      rotatingEl.style.transform = 'translateY(-10px)';

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % services.length;
        rotatingEl.textContent = services[currentIndex];
        rotatingEl.style.opacity = '1';
        rotatingEl.style.transform = 'translateY(0)';
      }, 300);
    }, 2800);
  }

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const questionBtn = item.querySelector('.faq-question-btn');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach((other) => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !isActive);
      });
    }
  });

  // 6. Pricing Tab Switcher
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.pricing-tab-content');

  if (tabBtns.length && tabContents.length) {
    tabBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetCategory = btn.getAttribute('data-target');

        tabBtns.forEach((b) => b.classList.remove('active'));
        tabContents.forEach((c) => c.classList.remove('active'));

        btn.classList.add('active');
        const targetSection = document.getElementById(`pricing-${targetCategory}`);
        if (targetSection) targetSection.classList.add('active');
      });
    });
  }

  // 7. Auto Carousel for Testimonials / Client Case Profiles
  function initTestimonialCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevSlideBtn');
    const nextBtn = document.getElementById('nextSlideBtn');
    const dots = document.querySelectorAll('.carousel-dot');

    if (!track || !slides.length) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoInterval = null;

    function goToSlide(index) {
      currentIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    function nextSlide() {
      goToSlide(currentIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        resetTimer();
      });
    });

    function startTimer() {
      autoInterval = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
      clearInterval(autoInterval);
      startTimer();
    }

    startTimer();

    // Pause on hover
    const container = document.querySelector('.carousel-container');
    if (container) {
      container.addEventListener('mouseenter', () => clearInterval(autoInterval));
      container.addEventListener('mouseleave', startTimer);
    }
  }

  // 8. Staggered Scroll Reveal / Slide Animations for Sections:
  // "our edge", "how we work", "our principles"
  function initScrollSlideAnimations() {
    const animatedElements = document.querySelectorAll('.reveal-slide-up, .reveal-slide-left, .reveal-slide-right');
    if (!animatedElements.length) return;

    if ('IntersectionObserver' in window) {
      const isMobile = window.innerWidth <= 768;
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: isMobile ? 0.05 : 0.15,
        rootMargin: isMobile ? '0px 0px -15px 0px' : '0px 0px -40px 0px'
      });

      animatedElements.forEach((el) => observer.observe(el));
    } else {
      animatedElements.forEach((el) => el.classList.add('reveal-active'));
    }
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTestimonialCarousel();
      initScrollSlideAnimations();
    });
  } else {
    initTestimonialCarousel();
    initScrollSlideAnimations();
  }
})();
