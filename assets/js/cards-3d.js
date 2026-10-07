/**
 * CLEVIX TECH - 3D SERVICE BOX CARDS ENGINE
 * Lightweight (<3KB), 60fps requestAnimationFrame, mouse tilt, spotlight, keyboard & touch flip
 */

(function () {
  'use strict';

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  function init3DCards() {
    const cardWrappers = document.querySelectorAll('.service-card-3d-wrapper');
    if (!cardWrappers.length) return;

    cardWrappers.forEach((wrapper) => {
      const card = wrapper.querySelector('.service-card-3d');
      if (!card) return;

      let bounds;
      let rafId = null;
      let touchStartX = 0;
      let touchStartY = 0;
      let isScrollSwipe = false;

      function updateCardTransform(e) {
        if (card.classList.contains('flipped')) return;
        bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;

        // Set CSS custom variables for light spotlight reflection
        card.style.setProperty('--mouse-x', `${mouseX}px`);
        card.style.setProperty('--mouse-y', `${mouseY}px`);

        if (prefersReducedMotion || isTouchDevice) return;

        const centerX = bounds.width / 2;
        const centerY = bounds.height / 2;

        // Max 12 deg tilt
        const deltaX = (mouseX - centerX) / centerX;
        const deltaY = (mouseY - centerY) / centerY;
        const rotateX = -deltaY * 12;
        const rotateY = deltaX * 12;

        const sKey = card.dataset.serviceKey;
        const glowColor = sKey === 'mobile' ? 'rgba(139, 92, 246, 0.35)'
          : sKey === 'marketing' ? 'rgba(6, 182, 212, 0.35)'
          : sKey === 'seo' ? 'rgba(16, 185, 129, 0.35)'
          : 'rgba(59, 130, 246, 0.35)';

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `${-rotateY * 1.5}px ${rotateX * 1.5}px 38px ${glowColor}`;
      }

      function resetCardTransform() {
        if (card.classList.contains('flipped')) return;
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.boxShadow = '';
      }

      // Desktop Mouse Tracking
      if (!isTouchDevice && !prefersReducedMotion) {
        card.addEventListener('mousemove', (e) => {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => updateCardTransform(e));
        });

        card.addEventListener('mouseleave', () => {
          if (rafId) cancelAnimationFrame(rafId);
          resetCardTransform();
        });
      }

      // Touch Scroll Detection (prevents accidental flip when user is simply scrolling vertically on mobile)
      card.addEventListener('touchstart', (e) => {
        if (e.touches && e.touches.length === 1) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          isScrollSwipe = false;
        }
      }, { passive: true });

      card.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches.length === 1) {
          const diffX = Math.abs(e.touches[0].clientX - touchStartX);
          const diffY = Math.abs(e.touches[0].clientY - touchStartY);
          if (diffY > 8 || diffX > 8) {
            isScrollSwipe = true;
          }
        }
      }, { passive: true });

      // Flip trigger function
      function toggleFlip(e) {
        if (isScrollSwipe) {
          isScrollSwipe = false;
          return;
        }

        // Prevent click if user clicked a link or quote CTA inside
        if (e.target.closest('a') || e.target.closest('.btn-quote-trigger')) return;

        const isFlipped = card.classList.toggle('flipped');
        card.setAttribute('aria-pressed', isFlipped ? 'true' : 'false');
        if (isFlipped) {
          card.style.transform = 'rotateY(180deg)';
          card.style.boxShadow = '';
        } else {
          resetCardTransform();
        }
      }

      // Flip on Click/Tap
      card.addEventListener('click', toggleFlip);

      // Flip on Keyboard Enter or Space
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');

      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggleFlip(e);
        }
      });

      // Explicit flip buttons
      const flipHintBtn = card.querySelector('.btn-flip-hint');
      if (flipHintBtn) {
        flipHintBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleFlip(e);
        });
      }

      const flipBackBtn = card.querySelector('.btn-flip-back');
      if (flipBackBtn) {
        flipBackBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleFlip(e);
        });
      }
    });

      // Ensure cards are immediately visible with high performance
      cardWrappers.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
  }

  // Auto initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3DCards);
  } else {
    init3DCards();
  }
})();
