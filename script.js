
/* ================================================
   SABBIR DENTAL CARE — Premium Animation System
   award-winning level micro-interactions & animations
   ================================================ */

/* ---- 1. PAGE PRELOADER ---- */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('preloader--hidden');
      setTimeout(() => preloader.remove(), 700);
    }, 900);
  });
})();

/* ---- 2. SCROLL PROGRESS BAR ---- */
(function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = Math.min((scrolled / total) * 100, 100) + '%';
  }, { passive: true });
})();

/* ---- 3. STICKY NAVBAR ---- */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
})();

/* ---- 4. MOBILE HAMBURGER ---- */
(function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    const [s0, s1, s2] = toggle.querySelectorAll('span');
    if (isOpen) {
      s0.style.transform = 'rotate(45deg) translate(5px,5px)';
      s1.style.opacity   = '0';
      s2.style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      s0.style.transform = s2.style.transform = '';
      s1.style.opacity   = '';
    }
  });

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.classList.remove('active');
      const [s0, s1, s2] = toggle.querySelectorAll('span');
      s0.style.transform = s2.style.transform = '';
      s1.style.opacity   = '';
    });
  });
})();

/* ---- 5. SMOOTH SCROLL ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
});

/* ---- 6. COUNTER ANIMATION ---- */
(function initCounters() {
  const counters = document.querySelectorAll('.counter');
  if (!counters.length || !('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const suffix = el.dataset.suffix || '';
      let start = 0;
      const step = target / (1500 / 16);
      const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = Math.floor(start) + suffix;
        if (start >= target) clearInterval(timer);
      }, 16);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => obs.observe(c));
})();

/* ---- 7. PREMIUM SCROLL REVEAL SYSTEM (custom, no library needed) ---- */
(function initScrollReveal() {
  const ANIMATIONS = {
    'fade-up':    'translateY(50px)',
    'fade-down':  'translateY(-50px)',
    'fade-left':  'translateX(-60px)',
    'fade-right': 'translateX(60px)',
    'zoom-in':    'scale(0.85)',
    'zoom-out':   'scale(1.1)',
    'flip-left':  'rotateY(-25deg) translateX(-40px)',
  };

  // Mark all elements automatically
  function autoTag() {
    // Trust bar items
    document.querySelectorAll('.trust-bar__item').forEach((el, i) => {
      el.dataset.reveal = 'fade-up';
      el.dataset.delay  = i * 80;
    });
    // About / intro columns
    document.querySelectorAll('.intro__image-wrap').forEach(el => { el.dataset.reveal = 'fade-right'; });
    document.querySelectorAll('.intro__text').forEach(el => { el.dataset.reveal = 'fade-left'; el.dataset.delay = '150'; });
    // Service cards
    document.querySelectorAll('.service-card').forEach((el, i) => {
      el.dataset.reveal = 'fade-up';
      el.dataset.delay  = i * 100;
    });
    // Why us cards
    document.querySelectorAll('.why-us__card').forEach((el, i) => {
      el.dataset.reveal = 'zoom-in';
      el.dataset.delay  = i * 80;
    });
    // Testimonials
    document.querySelectorAll('.testimonial-card').forEach((el, i) => {
      el.dataset.reveal = 'fade-up';
      el.dataset.delay  = i * 120;
    });
    // Gallery items
    document.querySelectorAll('.gallery__item').forEach((el, i) => {
      el.dataset.reveal = 'zoom-in';
      el.dataset.delay  = i * 80;
    });
    // Hours rows
    document.querySelectorAll('.hours__row').forEach((el, i) => {
      el.dataset.reveal = 'fade-left';
      el.dataset.delay  = i * 100;
    });
    // Doctor credentials
    document.querySelectorAll('.doctor-cred-item').forEach((el, i) => {
      el.dataset.reveal = 'fade-left';
      el.dataset.delay  = i * 70;
    });
    // Section headers
    document.querySelectorAll('.section-header').forEach(el => {
      el.dataset.reveal = 'fade-up';
    });
    // Contact items
    document.querySelectorAll('.contact__item').forEach((el, i) => {
      el.dataset.reveal = 'fade-up';
      el.dataset.delay  = i * 100;
    });
    // Appointment card
    document.querySelectorAll('.appointment__card').forEach(el => { el.dataset.reveal = 'zoom-in'; });
    // Hours inner
    document.querySelectorAll('.hours__text').forEach(el => { el.dataset.reveal = 'fade-right'; });
    document.querySelectorAll('.hours__schedule').forEach(el => { el.dataset.reveal = 'fade-left'; el.dataset.delay = '150'; });
  }

  autoTag();

  const elements = document.querySelectorAll('[data-reveal]');

  // Set initial hidden state
  elements.forEach(el => {
    const anim = ANIMATIONS[el.dataset.reveal] || 'translateY(40px)';
    el.style.opacity = '0';
    el.style.transform = anim;
    el.style.transition = 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1)';
    if (el.dataset.delay) {
      el.style.transitionDelay = el.dataset.delay + 'ms';
    }
    el.style.willChange = 'opacity, transform';
  });

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => { el.style.opacity='1'; el.style.transform='none'; });
    return;
  }

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.style.opacity   = '1';
      el.style.transform = 'none';
      // Remove will-change after animation completes for performance
      setTimeout(() => { el.style.willChange = 'auto'; }, 1000);
      revealObs.unobserve(el);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => revealObs.observe(el));
})();

/* ---- 8. HERO DOCTOR 3D TILT HOVER ---- */
(function initHeroTilt() {
  const wrap = document.querySelector('.hero__image-wrap');
  const img  = document.querySelector('.hero__doctor-img');
  if (!wrap || !img) return;

  wrap.addEventListener('mousemove', e => {
    const r = wrap.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width  - 0.5);
    const dy = ((e.clientY - r.top)  / r.height - 0.5);
    img.style.transform = `rotateX(${(-dy * 10).toFixed(2)}deg) rotateY(${(dx * 10).toFixed(2)}deg) scale(1.03)`;
  });

  wrap.addEventListener('mouseleave', () => {
    img.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
    img.style.transform  = 'rotateX(0) rotateY(0) scale(1)';
    setTimeout(() => { img.style.transition = ''; }, 600);
  });
})();

/* ---- 9. BUTTON RIPPLE EFFECT ---- */
(function initRipple() {
  document.querySelectorAll('.btn, .btn--sm, .navbar__cta').forEach(btn => {
    if (!btn.style.position || btn.style.position === 'static') {
      btn.style.position = 'relative';
    }
    btn.style.overflow = 'hidden';

    btn.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        background:rgba(255,255,255,0.35);
        border-radius:50%;
        transform:scale(0);
        animation:ripple-anim 0.6s linear;
        pointer-events:none;
      `;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();

/* ---- 10. MAGNETIC CARD HOVER ---- */
(function initMagneticCards() {
  document.querySelectorAll('.why-us__card, .trust-bar__item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = ((e.clientX - r.left) / r.width  - 0.5) * 8;
      const dy = ((e.clientY - r.top)  / r.height - 0.5) * 8;
      card.style.transform = `translateY(-8px) rotateX(${(-dy).toFixed(1)}deg) rotateY(${dx.toFixed(1)}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease';
    });
  });
})();

/* ---- 11. PARALLAX SECTIONS ---- */
(function initParallax() {
  const heroVideo = document.querySelector('.hero__video-bg');
  const heroParts = document.querySelector('.hero__particles');

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroVideo) heroVideo.style.transform = `translateY(${y * 0.3}px)`;
    if (heroParts) heroParts.style.transform = `translateY(${y * 0.15}px)`;
  }, { passive: true });
})();

/* ---- 12. HERO BADGE TYPEWRITER EFFECT ---- */
(function initTypewriter() {
  const badge = document.querySelector('.hero__badge');
  if (!badge) return;
  const text = badge.textContent.trim();
  badge.textContent = '';
  badge.style.opacity = '1';
  let i = 0;
  const interval = setInterval(() => {
    badge.textContent += text[i++];
    if (i >= text.length) clearInterval(interval);
  }, 55);
})();

/* ---- 13. SERVICE CARD ICON WOBBLE ---- */
(function initIconWobble() {
  document.querySelectorAll('.service-card__icon, .why-us__icon').forEach(icon => {
    icon.closest('.service-card, .why-us__card')?.addEventListener('mouseenter', () => {
      icon.style.animation = 'iconWobble 0.5s ease';
    });
    icon.closest('.service-card, .why-us__card')?.addEventListener('mouseleave', () => {
      icon.style.animation = '';
    });
    icon.addEventListener('animationend', () => { icon.style.animation = ''; });
  });
})();

/* ---- 14. GALLERY STAGGER REVEAL ---- */
(function initGalleryStretch() {
  document.querySelectorAll('.gallery__item img').forEach(img => {
    img.addEventListener('mouseenter', () => {
      img.style.filter = 'brightness(1.05)';
    });
    img.addEventListener('mouseleave', () => {
      img.style.filter = '';
    });
  });
})();

/* ---- 15. WHATSAPP TOOLTIP ---- */
(function initWATooltip() {
  const waBtn = document.getElementById('whatsappFloat');
  if (!waBtn) return;
  const tooltip = waBtn.querySelector('.whatsapp-float__tooltip');
  if (!tooltip) return;
  setTimeout(() => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateX(0)';
    setTimeout(() => {
      if (!waBtn.matches(':hover')) {
        tooltip.style.opacity = '0';
        tooltip.style.transform = 'translateX(10px)';
      }
    }, 4000);
  }, 2500);
})();

/* ---- 16. APPOINTMENT FORM → WHATSAPP ---- */
const form = document.getElementById('appointmentForm');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = document.getElementById('name')?.value    || '';
    const phone   = document.getElementById('phone')?.value   || '';
    const date    = document.getElementById('date')?.value    || '';
    const service = document.getElementById('service')?.value || '';
    const message = document.getElementById('message')?.value || '';

    const text = `🦷 *New Appointment Request*%0A` +
      `---------------------------%0A` +
      `👤 Name: ${name}%0A` +
      `📞 Phone: ${phone}%0A` +
      `📅 Date: ${date}%0A` +
      `🩺 Treatment: ${service}%0A` +
      `📝 Notes: ${message}`;

    window.open(`https://wa.me/8801951029630?text=${text}`, '_blank');

    // Success feedback
    const btn = form.querySelector('[type=submit]');
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Request Sent!';
      btn.style.background = '#27ae60';
      setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 3000);
    }
  });
}

/* ---- 17. SOCIAL FLOAT MOBILE TOOLTIP ---- */
const socialBtns = document.querySelectorAll('.social-float__btn');
socialBtns.forEach(btn => {
  btn.addEventListener('click', function (e) {
    if (window.matchMedia('(hover: none)').matches) {
      if (!btn.classList.contains('active')) {
        e.preventDefault();
        socialBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      }
    }
  });
});
document.addEventListener('click', e => {
  if (!e.target.closest('.social-float__btn')) {
    socialBtns.forEach(btn => btn.classList.remove('active'));
  }
});

/* ---- 18. ACTIVE NAV LINK ON SCROLL ---- */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__links a');
  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.remove('nav-active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('nav-active');
    });
  }, { passive: true });
})();

/* ---- 19. TESTIMONIAL AUTO-HIGHLIGHT ---- */
(function initTestimonialPulse() {
  const cards = document.querySelectorAll('.testimonial-card');
  if (!cards.length) return;
  let current = 0;
  setInterval(() => {
    cards[current].classList.remove('testimonial--active');
    current = (current + 1) % cards.length;
    cards[current].classList.add('testimonial--active');
  }, 3500);
})();

/* ---- 20. FLOATING HERO IMAGE PULSE ---- */
(function initHeroImagePulse() {
  const img = document.querySelector('.hero__doctor-img');
  if (!img) return;
  img.style.animation = 'subtleDoctorFloat 6s ease-in-out infinite';
})();