// Customize optional public links here. Empty entries are intentionally hidden.
const PROFILE = {
  github: 'https://github.com/kervino', // Public profile; project repos can be added later
  resume: '', // Example: 'assets/Kervin_Ong_Resume.pdf' (add the file first)
  email: '',  // Example: 'hello@example.com'
};

const menuButton = document.querySelector('.menu-toggle');
const nav = document.getElementById('primary-nav');
if (menuButton && nav) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('is-open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMenu(); });
}

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('is-visible'));
}

const extraLinks = document.getElementById('additional-links');
if (extraLinks) {
  const links = [
    PROFILE.github && { label: 'GitHub ↗', href: PROFILE.github },
    PROFILE.resume && { label: 'Resume ↗', href: PROFILE.resume },
    PROFILE.email && { label: 'Email ↗', href: `mailto:${PROFILE.email}` },
  ].filter(Boolean);
  links.forEach(({ label, href }) => {
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.textContent = label;
    if (!href.startsWith('mailto:')) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
    extraLinks.appendChild(anchor);
  });
}
const year = document.getElementById('footer-year');
if (year) year.textContent = String(new Date().getFullYear());
