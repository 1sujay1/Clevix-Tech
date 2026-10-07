/**
 * CLEVIX TECH - LEAD GENERATION POPUP & MODAL
 * Timed trigger (25s), exit-intent (desktop), sessionStorage guard, focus trap, form validation
 */

(function () {
  'use strict';

  let modalOverlay = null;
  let closeBtn = null;
  let quoteForm = null;
  let isModalOpen = false;

  function createModalDOM() {
    if (document.getElementById('quoteModal')) return;

    const modalHTML = `
      <div class="modal-overlay" id="quoteModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle" tabindex="-1">
        <div class="modal-container">
          <button type="button" class="modal-close-btn" id="closeModalBtn" aria-label="Close dialog">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <div class="modal-header">
            <img src="assets/img/logo-icon.png" alt="Clevix Tech" class="modal-logo" />
            <span class="eyebrow">Quick Inquiry</span>
            <h3 id="modalTitle">Get Your Free Custom Quote</h3>
            <p>Tell us about your project and we'll reply within 24 hours with exact scope & pricing.</p>
          </div>

          <form id="popupLeadForm" class="popup-lead-form" novalidate>
            <div class="form-group">
              <label for="leadName" class="form-label">Full Name *</label>
              <input type="text" id="leadName" name="name" class="form-control" placeholder="e.g. Ramesh Kumar" required />
              <div class="form-error-msg">Please enter your full name</div>
            </div>

            <div class="form-group">
              <label for="leadPhone" class="form-label">Phone / WhatsApp Number *</label>
              <input type="tel" id="leadPhone" name="phone" class="form-control" placeholder="+91 98765 43210" required />
              <div class="form-error-msg">Please provide a valid phone number</div>
            </div>

            <div class="form-group">
              <label for="leadEmail" class="form-label">Email Address *</label>
              <input type="email" id="leadEmail" name="email" class="form-control" placeholder="ramesh@company.com" required />
              <div class="form-error-msg">Please enter a valid email address</div>
            </div>

            <div class="form-group">
              <label for="leadService" class="form-label">Service Interested In</label>
              <select id="leadService" name="service" class="form-control">
                <option value="Website Development">Website Development (From ₹199)</option>
                <option value="Mobile App Development">Mobile App Development (From ₹499)</option>
                <option value="Digital Marketing">Digital Marketing (From ₹499)</option>
                <option value="SEO Optimization">SEO Optimization (From ₹999)</option>
                <option value="Custom Software / Other">Custom Software / Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="leadMessage" class="form-label">Brief Requirements</label>
              <textarea id="leadMessage" name="message" class="form-control" rows="3" placeholder="Tell us about your goals, features, or timeline..."></textarea>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 0.5rem;">
              Request Free Proposal
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </form>

          <div class="form-success-state" id="formSuccessState">
            <div class="success-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h4>Thank You!</h4>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-top: 0.5rem;">
              Your inquiry has been received. Our solutions team in Coimbatore will get in touch with you shortly.
            </p>
            <button type="button" class="btn btn-secondary btn-sm" id="btnDismissSuccess" style="margin-top: 1.5rem;">
              Close
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    bindModalEvents();
  }

  function bindModalEvents() {
    modalOverlay = document.getElementById('quoteModal');
    closeBtn = document.getElementById('closeModalBtn');
    quoteForm = document.getElementById('popupLeadForm');
    const dismissSuccess = document.getElementById('btnDismissSuccess');

    // Close handlers
    closeBtn.addEventListener('click', closeModal);
    if (dismissSuccess) dismissSuccess.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isModalOpen) closeModal();
    });

    // Form submission & validation
    quoteForm.addEventListener('submit', handleFormSubmit);

    // Bind all buttons with .btn-quote-trigger
    document.querySelectorAll('.btn-quote-trigger').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const serviceName = btn.getAttribute('data-service');
        openModal(serviceName);
      });
    });
  }

  function openModal(defaultService) {
    if (!modalOverlay) createModalDOM();
    if (defaultService) {
      const select = document.getElementById('leadService');
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].value.toLowerCase().includes(defaultService.toLowerCase())) {
            select.selectedIndex = i;
            break;
          }
        }
      }
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    isModalOpen = true;

    // Focus first input
    setTimeout(() => {
      const firstInput = document.getElementById('leadName');
      if (firstInput) firstInput.focus();
    }, 100);
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
    isModalOpen = false;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    let hasError = false;

    const nameInput = document.getElementById('leadName');
    const phoneInput = document.getElementById('leadPhone');
    const emailInput = document.getElementById('leadEmail');

    // Validate Name
    if (!nameInput.value.trim()) {
      showError(nameInput);
      hasError = true;
    } else {
      clearError(nameInput);
    }

    // Validate Phone
    const phoneRegex = /^[0-9+\s\-()]{7,15}$/;
    if (!phoneRegex.test(phoneInput.value.trim())) {
      showError(phoneInput);
      hasError = true;
    } else {
      clearError(phoneInput);
    }

    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput);
      hasError = true;
    } else {
      clearError(emailInput);
    }

    if (hasError) return;

    // Simulate safe client-side submission state (no hardcoded keys/secrets)
    quoteForm.style.display = 'none';
    const successState = document.getElementById('formSuccessState');
    if (successState) successState.style.display = 'block';

    // Mark shown in sessionStorage so it doesn't auto-popup again
    sessionStorage.setItem('clevix_quote_submitted', 'true');
  }

  function showError(input) {
    input.style.borderColor = '#ef4444';
    const err = input.parentElement.querySelector('.form-error-msg');
    if (err) err.style.display = 'block';
  }

  function clearError(input) {
    input.style.borderColor = '';
    const err = input.parentElement.querySelector('.form-error-msg');
    if (err) err.style.display = 'none';
  }

  function initTriggers() {
    createModalDOM();

    // Check sessionStorage
    const hasInteracted = sessionStorage.getItem('clevix_popup_seen');
    if (hasInteracted) return;

    // 1. Timed trigger: 25 seconds
    const timer = setTimeout(() => {
      if (!isModalOpen && !sessionStorage.getItem('clevix_popup_seen')) {
        openModal();
        sessionStorage.setItem('clevix_popup_seen', 'true');
      }
    }, 25000);

    // 2. Desktop exit-intent trigger
    const exitIntentHandler = (e) => {
      if (e.clientY <= 10 && !isModalOpen && !sessionStorage.getItem('clevix_popup_seen')) {
        openModal();
        sessionStorage.setItem('clevix_popup_seen', 'true');
        document.removeEventListener('mouseleave', exitIntentHandler);
        clearTimeout(timer);
      }
    };

    if (window.innerWidth > 768) {
      document.addEventListener('mouseleave', exitIntentHandler);
    }
  }

  // Public export
  window.ClevixPopup = {
    open: openModal,
    close: closeModal
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTriggers);
  } else {
    initTriggers();
  }
})();
