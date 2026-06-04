/* =============================================
   TALLER INU — Main JavaScript
   ============================================= */

(function () {
  'use strict';

  // ── SPA ROUTER ──────────────────────────────
  const pages = {
    inicio:       document.getElementById('page-inicio'),
    clases:       document.getElementById('page-clases'),
    experiencias: document.getElementById('page-experiencias'),
    inu:          document.getElementById('page-inu'),
    contacto:     document.getElementById('page-contacto'),
    legal:        document.getElementById('page-legal'),
    privacidad:   document.getElementById('page-privacidad'),
  };

  const navLinks = document.querySelectorAll('[data-page]');

  function showPage(pageId) {
    // hide all
    Object.values(pages).forEach(p => { if (p) p.classList.remove('active'); });
    // show target
    const target = pages[pageId];
    if (target) {
      target.classList.add('active');
    } else {
      pages.inicio.classList.add('active');
    }
    // update nav active state
    navLinks.forEach(l => {
      l.classList.toggle('active', l.dataset.page === pageId);
    });
    // update page title for SEO-friendliness / accessibility
    const titles = {
      inicio:       'Taller Inu — Estudio de Cerámica en Cuenca',
      clases:       'Clases — Taller Inu',
      experiencias: 'Experiencias Cerámicas — Taller Inu',
      inu:          'Inu Ceramics — Taller Inu',
      contacto:     'Contacto — Taller Inu',
      legal:        'Aviso Legal — Taller Inu',
      privacidad:   'Política de Privacidad — Taller Inu',
    };
    document.title = titles[pageId] || titles.inicio;
    // update canonical hash
    history.pushState({ page: pageId }, '', '#' + pageId);
    // scroll to top
    window.scrollTo({ top: 0, behavior: 'instant' });
    // re-run reveal for new page
    setTimeout(initReveal, 50);
    // close mobile menu
    document.getElementById('navLinks').classList.remove('open');
  }

  // Handle all [data-page] clicks
  document.addEventListener('click', function (e) {
    const el = e.target.closest('[data-page]');
    if (el) {
      e.preventDefault();
      showPage(el.dataset.page);
    }
  });

  // Handle browser back/forward
  window.addEventListener('popstate', function (e) {
    const pageId = (location.hash || '#inicio').replace('#', '');
    showPage(pageId);
  });

  // Init from URL hash
  function initRouter() {
    const pageId = (location.hash || '#inicio').replace('#', '');
    showPage(pageId);
  }

  // ── HAMBURGER ───────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('navLinks');
  hamburger.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
  });

  // ── SCROLL REVEAL ───────────────────────────
  function initReveal() {
    const els = document.querySelectorAll('.page.active .reveal, .page.active .reveal-left');
    if (!els.length) return;
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { observer.observe(el); });
  }

  // ── CONTACT FORM ────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const msg = document.getElementById('formMsg');
      if (msg) {
        msg.style.display = 'block';
        msg.textContent = '✓ Mensaje enviado. ¡Nos pondremos en contacto pronto!';
      }
      contactForm.reset();
    });
  }

  // ── WHATSAPP LINKS ──────────────────────────
  // Centralise WhatsApp number so it's easy to update
  const WA_NUMBER = '34604923916';
  const WA_MSG_TAZA    = encodeURIComponent('Hola! Me gustaría reservar una experiencia de Taza o Bol de Desayuno en Taller Inu.');
  const WA_MSG_SUSHI   = encodeURIComponent('Hola! Me gustaría reservar una experiencia de Set de Sushi en Taller Inu.');
  const WA_MSG_GENERAL = encodeURIComponent('Hola! Me gustaría obtener más información sobre Taller Inu.');

  document.querySelectorAll('[data-wa]').forEach(function (el) {
    const type = el.dataset.wa;
    let msg = WA_MSG_GENERAL;
    if (type === 'taza')  msg = WA_MSG_TAZA;
    if (type === 'sushi') msg = WA_MSG_SUSHI;
    el.href = 'https://wa.me/' + WA_NUMBER + '?text=' + msg;
    el.target = '_blank';
    el.rel = 'noopener noreferrer';
  });

  // ── DATE TABLE TOGGLE (admin helper) ────────
  // Clicking on a date row while holding Shift toggles full/open status
  // (just a local toggle for demo — hook to a backend if needed)
  document.querySelectorAll('.dates-table tbody tr').forEach(function (row) {
    row.addEventListener('click', function (e) {
      if (!e.shiftKey) return;
      const badge = row.querySelector('.date-open, .date-full');
      if (!badge) return;
      if (badge.classList.contains('date-open')) {
        badge.classList.replace('date-open', 'date-full');
        badge.textContent = 'Completo';
      } else {
        badge.classList.replace('date-full', 'date-open');
        badge.textContent = 'Plazas disponibles';
      }
    });
  });

  // ── INIT ────────────────────────────────────
  initRouter();

})();
