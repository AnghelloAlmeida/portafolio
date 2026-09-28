(() => {
  'use strict';

  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('primaryMenu');

  function closeMenu() {
    navMenu.dataset.open = 'false';
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú de navegación');
  }

  function toggleMenu() {
    const isOpen = navMenu.dataset.open === 'true';
    navMenu.dataset.open = String(!isOpen);
    navToggle.setAttribute('aria-expanded', String(!isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Abrir menú de navegación' : 'Cerrar menú de navegación');
  }

  navToggle.addEventListener('click', toggleMenu);

  navMenu.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.dataset.open === 'true') closeMenu();
  });

  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const STORAGE_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggle.setAttribute('aria-pressed', 'true');
      themeToggle.setAttribute('aria-label', 'Cambiar a tema claro');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.setAttribute('aria-pressed', 'false');
      themeToggle.setAttribute('aria-label', 'Cambiar a tema oscuro');
    }
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (err) {}

    if (saved === 'dark' || saved === 'light') {
      applyTheme(saved);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      applyTheme(prefersDark ? 'dark' : 'light');
    }
  }

  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (err) {}
  });

  initTheme();

  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length) {
    const linkFor = (id) => document.querySelector(`.nav-link[href="#${id}"]`);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove('is-active'));
          const link = linkFor(entry.target.id);
          if (link) link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach((s) => observer.observe(s));
  }

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const filterEmpty = document.getElementById('filterEmpty');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      projectCards.forEach((card) => {
        const tags = card.dataset.tags || '';
        const matches = filter === 'todos' || tags.split(' ').includes(filter);
        card.classList.toggle('is-hidden', !matches);
        if (matches) visibleCount += 1;
      });

      filterEmpty.hidden = visibleCount !== 0;
    });
  });

  const modalOverlay = document.getElementById('modalOverlay');
  const openTriggers = document.querySelectorAll('[data-modal-open]');
  let lastFocusedElement = null;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;

    lastFocusedElement = document.activeElement;
    modalOverlay.hidden = false;
    modal.hidden = false;

    const closeBtn = modal.querySelector('[data-modal-close]');
    if (closeBtn) closeBtn.focus();
  }

  function closeAllModals() {
    document.querySelectorAll('.modal').forEach((m) => { m.hidden = true; });
    modalOverlay.hidden = true;
    if (lastFocusedElement) lastFocusedElement.focus();
  }

  openTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.modalOpen));
  });

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeAllModals();
  });

  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', closeAllModals);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modalOverlay.hidden) closeAllModals();
  });

  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formFallback = document.getElementById('formFallback');
  const CONTACT_EMAIL = 'aalmeidac7@unemi.edu.ec';

  const validators = {
    name: (value) => value.trim().length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: (value) => value.trim().length >= 10,
  };

  const errorMessages = {
    name: 'Ingresa tu nombre (mínimo 2 caracteres).',
    email: 'Ingresa un correo electrónico válido.',
    message: 'Cuéntame un poco más (mínimo 10 caracteres).',
  };

  function validateField(field) {
    const wrapper = field.closest('.field');
    const errorEl = wrapper.querySelector('.field-error');
    const isValid = validators[field.name](field.value);

    wrapper.classList.toggle('has-error', !isValid);
    errorEl.textContent = isValid ? '' : errorMessages[field.name];
    return isValid;
  }

  ['name', 'email', 'message'].forEach((fieldName) => {
    const field = form.elements[fieldName];
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.field').classList.contains('has-error')) validateField(field);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    formSuccess.hidden = true;

    const fields = ['name', 'email', 'message'].map((name) => form.elements[name]);
    const allValid = fields.map(validateField).every(Boolean);

    if (!allValid) {
      fields.find((f) => !validators[f.name](f.value))?.focus();
      return;
    }

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();

    const subject = `Contacto desde el portafolio — ${name}`;
    const body = `${message}\n\n— ${name} (${email})`;
    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    formFallback.href = mailtoUrl;
    window.location.href = mailtoUrl;

    formSuccess.hidden = false;
    form.reset();
  });

  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    backToTop.hidden = window.scrollY < 480;
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.getElementById('year').textContent = new Date().getFullYear();

})();
