(function () {
  'use strict';

  const header = document.querySelector('[data-site-header]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');
  const navLinks = siteNav ? Array.from(siteNav.querySelectorAll('a')) : [];

  const updateHeader = () => {
    if (header) {
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
  };

  const setMenuAccessibility = (isOpen) => {
    if (!siteNav) return;
    const isMobileMenu = window.innerWidth <= 1080;
    if (!isMobileMenu) {
      siteNav.removeAttribute('aria-hidden');
      navLinks.forEach((link) => link.removeAttribute('tabindex'));
      return;
    }

    siteNav.setAttribute('aria-hidden', String(!isOpen));
    navLinks.forEach((link) => {
      if (isOpen) link.removeAttribute('tabindex');
      else link.setAttribute('tabindex', '-1');
    });
  };

  const closeMenu = () => {
    if (!menuToggle || !siteNav || !header) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
    header.classList.remove('menu-active');
    document.body.classList.remove('menu-open');
    setMenuAccessibility(false);
  };

  if (menuToggle && siteNav && header) {
    menuToggle.addEventListener('click', () => {
      const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      siteNav.classList.toggle('is-open', willOpen);
      header.classList.toggle('menu-active', willOpen);
      document.body.classList.toggle('menu-open', willOpen);
      setMenuAccessibility(willOpen);
    });

    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1080) closeMenu();
      else {
        const menuIsOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        if (!menuIsOpen && siteNav.contains(document.activeElement)) menuToggle.focus();
        setMenuAccessibility(menuIsOpen);
      }
    });

    setMenuAccessibility(false);
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const revealItems = document.querySelectorAll('[data-reveal]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const videos = Array.from(document.querySelectorAll('video'));
  videos.forEach((video) => {
    video.addEventListener('play', () => {
      videos.forEach((otherVideo) => {
        if (otherVideo !== video && !otherVideo.paused) otherVideo.pause();
      });
    });
  });

  const galleryItems = Array.from(document.querySelectorAll('.gallery__item'));
  const lightbox = document.querySelector('[data-lightbox]');
  const lightboxImage = document.querySelector('[data-lightbox-image]');
  const lightboxCaption = document.querySelector('[data-lightbox-caption]');
  const lightboxClose = document.querySelector('[data-lightbox-close]');
  const lightboxPrevious = document.querySelector('[data-lightbox-previous]');
  const lightboxNext = document.querySelector('[data-lightbox-next]');

  let activeGalleryIndex = 0;
  let galleryReturnFocus = null;

  const renderLightbox = (index) => {
    if (!galleryItems.length || !lightboxImage || !lightboxCaption) return;
    activeGalleryIndex = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[activeGalleryIndex];
    const thumbnail = item.querySelector('img');
    lightboxImage.src = item.dataset.full || thumbnail.src;
    lightboxImage.alt = thumbnail.alt;
    lightboxCaption.textContent = item.dataset.caption || thumbnail.alt;
  };

  const openLightbox = (index, trigger) => {
    if (!lightbox) return;
    galleryReturnFocus = trigger;
    renderLightbox(index);
    document.body.classList.add('lightbox-open');

    if (typeof lightbox.showModal === 'function') {
      lightbox.showModal();
    } else {
      lightbox.setAttribute('open', '');
    }

    if (lightboxClose) lightboxClose.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    if (typeof lightbox.close === 'function' && lightbox.open) {
      lightbox.close();
    } else {
      lightbox.removeAttribute('open');
      document.body.classList.remove('lightbox-open');
      if (galleryReturnFocus) galleryReturnFocus.focus();
    }
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index, item));
  });

  if (lightbox) {
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrevious) lightboxPrevious.addEventListener('click', () => renderLightbox(activeGalleryIndex - 1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => renderLightbox(activeGalleryIndex + 1));

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    lightbox.addEventListener('close', () => {
      document.body.classList.remove('lightbox-open');
      if (galleryReturnFocus) galleryReturnFocus.focus();
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuToggle && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
    if (!lightbox || !lightbox.open) return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      renderLightbox(activeGalleryIndex - 1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      renderLightbox(activeGalleryIndex + 1);
    }
  });
})();
