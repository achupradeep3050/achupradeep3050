/* ═══════════════════════════════════════════════════════════
   ACHU PRADEEP — PORTFOLIO v3 · script.js
   Features: Scroll progress · Parallax · Tab filtering
              Continuous reveals · Nav state
═══════════════════════════════════════════════════════════ */

'use strict';

// ─── SCROLL PROGRESS TRACKER ───
const bgMesh = document.getElementById('bgMesh');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  // Parallax factor: background moves at 40% of scroll speed
  if (bgMesh) bgMesh.style.transform = `translateY(${y * 0.35}px)`;
  // Switch to dark theme after 80px scroll
  if (y > 80) document.body.classList.add('scrolled');
  else        document.body.classList.remove('scrolled');
}, { passive: true });

// ─── INTERSECTION OBSERVER — CONTINUOUS SCROLL REVEALS ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el    = entry.target;
      const delay = parseInt(el.dataset.delay) || 0;
      const type  = el.dataset.reveal || 'up';

      setTimeout(() => {
        el.classList.add('revealed');
        // Remove from observer after first reveal (avoid re-animation)
        revealObserver.unobserve(el);
      }, delay);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

document.querySelectorAll('[data-reveal]').forEach(el => {
  revealObserver.observe(el);
});

// ─── PROJECT TAB FILTERING ───
function filterProjects(category) {
  // Update tab button states
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === category ||
      (category === 'all' && btn.textContent.trim().toLowerCase() === 'all'));
  });

  // Filter cards
  document.querySelectorAll('.tab-item').forEach(card => {
    const cat = card.dataset.category;
    const show = category === 'all' || cat === category;
    if (show) {
      card.style.display = '';
      // Re-trigger reveal animation for newly shown cards
      card.classList.remove('revealed');
      setTimeout(() => {
        revealObserver.observe(card);
        card.classList.add('revealed');
      }, 50);
    } else {
      card.style.display = 'none';
    }
  });
}

// Expose globally for inline onclick
window.filterProjects = filterProjects;

// ─── NAV ACTIVE LINK ───
const navLinks  = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections  = document.querySelectorAll('section[id]');

function updateNavActive() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    if (window.scrollY >= top) current = section.id;
  });
  navLinks.forEach(link => {
    link.style.color = '';
    if (link.getAttribute('href') === `#${current}`) {
      link.style.color = 'var(--accent-cyan)';
    }
  });
}

window.addEventListener('scroll', updateNavActive, { passive: true });
updateNavActive();

// ─── NAVBAR SCROLL BEHAVIOR ───
let lastScroll = 0;
const navbar   = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 300) {
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.transition = 'transform 0.3s ease';
  } else {
    navbar.style.transform = 'translateY(0)';
  }
  lastScroll = current;
}, { passive: true });

// ─── FLOATING CARDS PARALLAX ───
const floatCards = document.querySelectorAll('.hero-float-card');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  floatCards.forEach((card, i) => {
    const speed = i === 0 ? 0.08 : 0.05;
    card.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });

// ─── TYPING EFFECT IN HERO (optional if not done in CSS) ───

// ─── FORM SUBMIT HANDLER ───
function handleFormSubmit(e) {
  e.preventDefault();
  const form    = e.target;
  const btn     = form.querySelector('.form-submit');
  const origTxt = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  btn.style.background = 'linear-gradient(135deg, #00e676, #00bcd4)';
  setTimeout(() => {
    btn.innerHTML = origTxt;
    btn.style.background = '';
    form.reset();
  }, 3000);
}
window.handleFormSubmit = handleFormSubmit;

// ─── SMOOTH SCROLL FOR ANCHOR LINKS ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    const top = target.offsetTop - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ─── STAGGERED ENTRY FOR SKILL CARDS ON LOAD ───
window.addEventListener('load', () => {
  // Trigger reveals for above-fold elements
  setTimeout(() => {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        revealObserver.observe(el);
      }
    });
  }, 200);
});

// ─── COUNTER ANIMATION FOR STATS ───
function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    const dur    = 1500;
    const step   = target / (dur / 16);
    let current  = 0;
    const tick   = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current < target) requestAnimationFrame(tick);
    };
    tick();
  });
}

// ─── CARD HOVER PARALLAX (subtle) ───
document.querySelectorAll('.skill-card, .proj-card, .proj-featured').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = (e.clientX - rect.left) / rect.width  - 0.5;
    const y      = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateY(-4px)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

console.log('✅ Portfolio v3 loaded — scroll reveals, parallax, filtering active');