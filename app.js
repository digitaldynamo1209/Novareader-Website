hmm // ==========================================================================
// NovaReader Product Website Client Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Interactive 3D Bookshelf Demo Inspector
  const books = document.querySelectorAll('.demo-book');
  const inspFmt = document.getElementById('insp-fmt');
  const inspSize = document.getElementById('insp-size');
  const inspTitle = document.getElementById('insp-title');
  const inspPath = document.getElementById('insp-path');

  books.forEach(book => {
    book.addEventListener('click', () => {
      // Remove active/highlight from others
      books.forEach(b => b.style.outline = 'none');
      book.style.outline = '2px solid #d4af37';
      book.style.outlineOffset = '3px';

      const title = book.getAttribute('data-title');
      const format = book.getAttribute('data-format');
      const size = book.getAttribute('data-size');
      const folder = book.getAttribute('data-folder');

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
    toast.style.position = 'fixed';
    toast.style.bottom = '24px';
    toast.style.right = '24px';
    toast.style.background = '#1e140d';
    toast.style.border = '1px solid #d4af37';
    toast.style.color = '#f5eedf';
    toast.style.padding = '14px 22px';
    toast.style.borderRadius = '10px';
    toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.8)';
    toast.style.zIndex = '9999';
    toast.style.fontFamily = 'Plus Jakarta Sans, sans-serif';
    toast.style.fontSize = '0.9rem';
    toast.style.display = 'flex';
    toast.style.alignItems = 'center';
    toast.style.gap = '10px';
    toast.innerHTML = `<span>✨</span><span>Starting download of <strong>NovaReader for ${platform}</strong>...</span>`;

    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.transition = 'opacity 0.4s ease';
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }

  winButtons.forEach(btn => {
    btn.addEventListener('click', () => showDownloadNotification('Windows'));
  });

  androidButtons.forEach(btn => {
    btn.addEventListener('click', () => showDownloadNotification('Android'));
  });
});
