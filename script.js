(function () {
  'use strict';
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('[data-theme-toggle]');
  const stored = (() => { try { return localStorage.getItem('ko-theme'); } catch { return null; } })();
  // Light-first design, but honor an explicit choice from a previous visit.
  root.dataset.theme = stored === 'dark' ? 'dark' : 'light';
  const syncTheme = () => {
    const isDark = root.dataset.theme === 'dark';
    toggle?.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle?.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', isDark ? '#1E1E1D' : '#FAF8F5');
  };
  syncTheme();
  toggle?.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('ko-theme', root.dataset.theme); } catch { /* no storage is fine */ }
    syncTheme();
  });

  // Subtle scroll-responsive navigation, with no navigation delay.
  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 18);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // The content starts visible if JS is unavailable or motion is reduced.
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    }, { threshold: .07, rootMargin: '0px 0px -25px 0px' });
    reveals.forEach((element) => observer.observe(element));
    root.classList.add('js-ready');
  }

  // Project categories: default shows all projects, and no content requires filtering.
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...document.querySelectorAll('[data-category]')];
  const emptyNotice = document.querySelector('.no-results');
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let shown = 0;
    cards.forEach((card) => {
      const matches = selected === 'all' || card.dataset.category.split(' ').includes(selected);
      card.classList.toggle('is-filtered-out', !matches);
      card.hidden = !matches;
      if (matches) shown++;
    });
    if (emptyNotice) emptyNotice.hidden = shown > 0;
  }));

  // Pointer ripples are purely decorative: no custom cursor, no moving links.
  // Limit updates to actual hover-capable pointer devices, and respect reduced motion.
  const canHoverAnimate = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (canHoverAnimate) {
    document.querySelectorAll('.reactive-surface').forEach((surface) => {
      let lastWave = 0;
      let lastX = -1000;
      let lastY = -1000;
      let queuedFrame = 0;
      let pendingPosition = null;
      const updateGlow = () => {
        queuedFrame = 0;
        if (!pendingPosition) return;
        const { x, y, width, height } = pendingPosition;
        surface.style.setProperty('--spot-x', `${(100 * x / width).toFixed(2)}%`);
        surface.style.setProperty('--spot-y', `${(100 * y / height).toFixed(2)}%`);
      };
      const makeWave = (x, y) => {
        const ripple = document.createElement('span');
        ripple.className = 'hover-ripple';
        ripple.setAttribute('aria-hidden', 'true');
        ripple.style.setProperty('--ripple-x', `${x}px`);
        ripple.style.setProperty('--ripple-y', `${y}px`);
        ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
        surface.appendChild(ripple);
      };
      surface.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse') return;
        surface.classList.add('is-pointer-active');
        // Let the first move create the first ripple, so the interaction feels gentle.
        lastWave = 0;
        lastX = -1000;
        lastY = -1000;
      });
      surface.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return;
        const rect = surface.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        pendingPosition = { x, y, width: rect.width, height: rect.height };
        if (!queuedFrame) queuedFrame = requestAnimationFrame(updateGlow);
        const now = performance.now();
        const traveled = Math.hypot(x - lastX, y - lastY);
        // Throttle decorative DOM nodes; no continuous physics loop is needed.
        if (traveled > 48 && now - lastWave > 270) {
          makeWave(x, y);
          lastWave = now;
          lastX = x;
          lastY = y;
        }
      }, { passive: true });
      surface.addEventListener('pointerleave', () => {
        surface.classList.remove('is-pointer-active');
        pendingPosition = null;
        if (queuedFrame) cancelAnimationFrame(queuedFrame);
        queuedFrame = 0;
      });
    });
  }

  // Give navigation links a quiet active-state cue while scrolling.
  const sectionLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  if ('IntersectionObserver' in window && sectionLinks.length) {
    const targets = sectionLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const sectionObserver = new IntersectionObserver((entries) => {
      const matches = entries.filter(e => e.isIntersecting).sort((a,b)=> b.intersectionRatio-a.intersectionRatio);
      if (!matches.length) return;
      sectionLinks.forEach(link => {
        link.classList.toggle('is-current', link.getAttribute('href') === '#' + matches[0].target.id);
      });
    }, { rootMargin: '-24% 0px -55% 0px' });
    targets.forEach(node => sectionObserver.observe(node));
  }
})();