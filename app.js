// ==========================================================================
// NovaReader Product Website Client Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive 3D Bookshelf Demo Inspector
  const books = document.querySelectorAll('.demo-book');
  const inspectorCard = document.getElementById('demo-inspector');
  const inspFmt = document.getElementById('insp-fmt');
  const inspSize = document.getElementById('insp-size');
  const inspTitle = document.getElementById('insp-title');
  const inspPath = document.getElementById('insp-path');

  books.forEach(book => {
    book.addEventListener('click', () => {
      books.forEach(b => b.classList.remove('is-selected'));
      book.classList.add('is-selected');

      const title = book.getAttribute('data-title');
      const format = book.getAttribute('data-format');
      const size = book.getAttribute('data-size');
      const folder = book.getAttribute('data-folder');

      if (inspectorCard) {
        inspectorCard.classList.remove('is-updating');
        void inspectorCard.offsetWidth; // restart lightweight CSS pulse
        inspectorCard.classList.add('is-updating');
      }

      inspTitle.textContent = title;
      inspFmt.textContent = format;
      inspSize.textContent = size;
      inspPath.textContent = `Source: ${folder}\\${title.replace(/[: ]/g, '_')}.${format.toLowerCase()}`;

      // Format pill color class
      inspFmt.className = `inspector-format fmt-${format.toLowerCase()}`;
    });
  });

  // 2. Mobile Drawer Navigation
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileCloseBtn = document.getElementById('mobileCloseBtn');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, #mobileDrawerDownload');

  function openMobileMenu() {
    if (mobileNavDrawer && mobileNavOverlay) {
      mobileNavDrawer.classList.add('active');
      mobileNavOverlay.classList.add('active');
      mobileMenuBtn?.classList.add('active');
      mobileNavDrawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeMobileMenu() {
    if (mobileNavDrawer && mobileNavOverlay) {
      mobileNavDrawer.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      mobileMenuBtn?.classList.remove('active');
      mobileNavDrawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  mobileMenuBtn?.addEventListener('click', () => {
    if (mobileNavDrawer?.classList.contains('active')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileCloseBtn?.addEventListener('click', closeMobileMenu);
  mobileNavOverlay?.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNavDrawer?.classList.contains('active')) {
      closeMobileMenu();
    }
  });

  // 3. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      faqItems.forEach(i => i.classList.remove('active'));
      // Toggle clicked
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 3. Download Feedback Toasts
  const winButtons = document.querySelectorAll('a[href*="NovaReader-Windows-x64.zip"]');
  const androidButtons = document.querySelectorAll('a[href*="NovaReader.apk"]');

  function showDownloadNotification(platform) {
    const toast = document.createElement('div');
    toast.className = 'nova-toast';
    toast.innerHTML = `<span>✨</span><span>Starting download of <strong>NovaReader for ${platform}</strong>...</span>`;

    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('is-visible'));
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 350);
    }, 3800);
  }

  winButtons.forEach(btn => {
    btn.addEventListener('click', () => showDownloadNotification('Windows'));
  });

  androidButtons.forEach(btn => {
    btn.addEventListener('click', () => showDownloadNotification('Android'));
  });

  // 4. Lightweight Offline Scroll Reveal (IntersectionObserver)
  const revealTargets = document.querySelectorAll(
    '.feature-card, .spec-box, .faq-item, .formats-showcase-grid > div'
  );
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !reducedMotion && revealTargets.length > 0) {
    revealTargets.forEach((el, idx) => {
      el.classList.add('reveal-on-scroll');
      el.style.transitionDelay = `${(idx % 6) * 55}ms`;
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
    );

    revealTargets.forEach(el => observer.observe(el));
  }
});
