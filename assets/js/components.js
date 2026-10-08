/**
 * CLEVIX TECH - SHARED COMPONENTS RENDERER (WITH STICKY VERTICAL SOCIAL BAR)
 */

(function () {
  'use strict';

  function renderSharedHeader() {
    const headerPlaceholder = document.getElementById('shared-header');
    if (!headerPlaceholder) return;

    // Inject backdrop directly into body so it's never clipped by a parent container
    const backdropEl = document.createElement('div');
    backdropEl.className = 'nav-backdrop';
    backdropEl.id = 'navBackdrop';
    document.body.appendChild(backdropEl);

    headerPlaceholder.innerHTML = `
      <header class="site-header" role="banner">
        <div class="container nav-container">
          <a href="index.html" class="brand-logo" aria-label="Clevix Tech Home">
            <img src="assets/img/logo.png" alt="Clevix Tech Logo" class="brand-logo-img" width="190" height="42" />
          </a>

          <nav class="nav-menu" id="navMenu" role="navigation" aria-label="Main Navigation">
            <div class="nav-menu-header">
              <span class="nav-menu-title">Navigation</span>
              <button type="button" class="nav-close-btn" id="navCloseBtn" aria-label="Close Navigation Menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <a href="index.html" class="nav-link">Home</a>
            <a href="vorquenta.html" class="nav-link nav-link-product"><span class="product-status-dot"></span>Our Product</a>
            <a href="services.html" class="nav-link">Services</a>
            <a href="pricing.html" class="nav-link">Pricing</a>
            <a href="about.html" class="nav-link">About</a>
            <a href="contact.html" class="nav-link">Contact</a>
            <div class="nav-menu-mobile-cta">
              <button type="button" class="btn btn-primary btn-quote-trigger" data-service="General Inquiry" style="width: 100%;">
                Get Free Quote
              </button>
            </div>
          </nav>

          <div class="nav-actions">
            <button type="button" class="btn btn-primary btn-sm btn-quote-trigger btn-quote-nav">
              Get Free Quote
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <button type="button" class="mobile-toggle" id="mobileToggle" aria-label="Toggle Navigation Menu" aria-expanded="false">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>
    `;

    // Bind mobile nav events right after rendering
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navBackdrop = document.getElementById('navBackdrop');
    const navCloseBtn = document.getElementById('navCloseBtn');

    function setNavState(isOpen) {
      if (!navMenu) return;
      navMenu.classList.toggle('open', isOpen);
      if (navBackdrop) navBackdrop.classList.toggle('open', isOpen);
      if (mobileToggle) {
        mobileToggle.classList.toggle('open', isOpen);
        mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    if (mobileToggle) {
      mobileToggle.dataset.bound = 'true';
      mobileToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const willOpen = !navMenu.classList.contains('open');
        setNavState(willOpen);
      });
    }

    if (navCloseBtn) {
      navCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        setNavState(false);
      });
    }

    if (navBackdrop) {
      navBackdrop.addEventListener('click', () => {
        setNavState(false);
      });
    }

    if (navMenu) {
      navMenu.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', (e) => {
          const href = link.getAttribute('href');
          setNavState(false);
          if (href && !href.startsWith('#')) {
            // Allow normal page navigation to proceed
            window.location.href = href;
          }
        });
      });

      navMenu.querySelectorAll('.btn-quote-trigger').forEach((btn) => {
        btn.addEventListener('click', () => {
          setNavState(false);
        });
      });
    }
  }

  function renderSharedFooter() {
    const footerPlaceholder = document.getElementById('shared-footer');
    if (!footerPlaceholder) return;

    footerPlaceholder.innerHTML = `
      <footer class="site-footer" role="contentinfo">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <a href="index.html" class="brand-logo" aria-label="Clevix Tech Home">
                <img src="assets/img/logo-full-transparent.png" alt="Clevix Tech - We Build Your Digital Tomorrow" class="brand-logo-img" width="220" height="68" />
              </a>
              <p>
                <strong>Build. Launch. Grow.</strong> High-performance software engineering, modern websites, custom mobile apps, and result-oriented digital marketing tailored for ambitious businesses across India and worldwide.
              </p>
              <div class="social-links" aria-label="Social Media Links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="LinkedIn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Twitter / X">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="GitHub">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="social-icon-btn" aria-label="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 class="footer-heading">Services & Products</h4>
              <ul class="footer-links">
                <li><a href="vorquenta.html" style="color: var(--accent-cyan); font-weight: 600;">Our Product: Vorquenta 🌟</a></li>
                <li><a href="services.html#web-development">Website Development</a></li>
                <li><a href="services.html#mobile-apps">Mobile App Development</a></li>
                <li><a href="services.html#digital-marketing">Digital Marketing</a></li>
                <li><a href="services.html#seo-optimization">SEO Optimization</a></li>
                <li><a href="services.html#custom-software">Custom Software & ERP</a></li>
                <li><a href="pricing.html">Pricing & Packages</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-heading">Company</h4>
              <ul class="footer-links">
                <li><a href="about.html">About Clevix Tech</a></li>
                <li><a href="about.html#values">Core Values</a></li>
                <li><a href="about.html#process">Our Workflow</a></li>
                <li><a href="contact.html">Contact Us</a></li>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
                <li><a href="terms-and-conditions.html">Terms & Conditions</a></li>
                <li><a href="disclaimer.html">Disclaimer</a></li>
              </ul>
            </div>

            <div>
              <h4 class="footer-heading">Contact</h4>
              <div class="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>India - 641001</span>
              </div>
              <div class="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>contact@clevixtech.com</span>
              </div>
              <div class="footer-contact-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>+91 98765 43210</span>
              </div>
              <div style="margin-top: 1rem;">
                <span class="badge badge-green">Serving All India & Global Clients</span>
              </div>
            </div>
          </div>

          <div class="footer-bottom">
            <div>
              &copy; 2026 Clevix Tech. All rights reserved.
            </div>
            <div style="display: flex; gap: 1.5rem;">
              <a href="privacy-policy.html">Privacy</a>
              <a href="terms-and-conditions.html">Terms</a>
              <a href="disclaimer.html">Disclaimer</a>
              <a href="sitemap.xml">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      <!-- STICKY VERTICAL SOCIAL MEDIA BAR -->
      <aside class="sticky-social-bar" aria-label="Social Media Direct Links">
        <a href="https://wa.me/919876543210?text=Hello%20Clevix%20Tech" target="_blank" rel="noopener noreferrer" class="sticky-social-btn" data-tooltip="WhatsApp" aria-label="WhatsApp">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.64c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.25-1.49-1.4-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.12.17 1.78 2.71 4.31 3.8.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.59.21-1.09.15-1.18-.06-.11-.22-.17-.47-.3z"/>
          </svg>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="sticky-social-btn" data-tooltip="LinkedIn" aria-label="LinkedIn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
          </svg>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="sticky-social-btn" data-tooltip="Twitter" aria-label="Twitter">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" class="sticky-social-btn" data-tooltip="Instagram" aria-label="Instagram">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="mailto:contact@clevixtech.com" class="sticky-social-btn" data-tooltip="Email" aria-label="Send Email">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </a>
      </aside>

      <!-- Floating Action Buttons -->
      <div class="floating-widgets" aria-label="Quick Actions">
        <button type="button" class="btn-float btn-back-to-top" id="backToTopBtn" aria-label="Scroll back to top">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
          </svg>
        </button>
      </div>
    `;
  }

  if (document.getElementById('shared-header')) {
    renderSharedHeader();
    renderSharedFooter();
  } else if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      renderSharedHeader();
      renderSharedFooter();
    });
  } else {
    renderSharedHeader();
    renderSharedFooter();
  }
})();
