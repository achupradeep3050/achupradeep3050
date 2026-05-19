/* ═══════════════════════════════════════════════════════════
   ACHU PRADEEP — PORTFOLIO v6 script.js
   Features: Particles · 3D tilt · Glassmorphism · Reveals
═══════════════════════════════════════════════════════════ */

'use strict';

// ─── PARTICLES GENERATOR ───
(function generateParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 40; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 3 + 1;
    p.style.cssText = [
      `left:${Math.random() * 100}%`,
      `bottom:${Math.random() * 30}%`,
      `width:${size}px`,
      `height:${size}px`,
      `animation-duration:${Math.random() * 15 + 10}s`,
      `animation-delay:${Math.random() * 20}s`,
    ].join(';');
    container.appendChild(p);
  }
})();

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = parseInt(entry.target.dataset.delay) || 0;
      setTimeout(() => entry.target.classList.add('revealed'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

// ─── NAVBAR SCROLL BEHAVIOR ──��
let lastScrollY = 0;
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  const y = window.scrollY;

  // Glass effect
  navbar.classList.toggle('scrolled', y > 60);

  // Hide on scroll down
  if (y > lastScrollY && y > 300) {
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.transition = 'transform 0.3s ease';
  } else {
    navbar.style.transform = 'translateY(0)';
    navbar.style.transition = 'transform 0.3s ease';
  }

  lastScrollY = y;
}, { passive: true });

// ─── PROJECT FILTER TABS ───
function filterProjects(category) {
  document.querySelectorAll('.tab-btn').forEach(b => {
    b.classList.toggle('active',
      b.textContent.trim().toLowerCase() === category ||
      (category === 'all' && b.textContent.trim() === 'All')
    );
  });

  document.querySelectorAll('.tab-item').forEach(item => {
    const show = category === 'all' || item.dataset.category === category;
    if (show) {
      item.classList.remove('hidden');
      item.classList.remove('revealed');
      setTimeout(() => revealObserver.observe(item), 50);
    } else {
      item.classList.add('hidden');
    }
  });
}
window.filterProjects = filterProjects;

// ─── 3D CARD TILT ───
document.querySelectorAll('.skill-card, .exp-card, .tab-item, .proj-featured').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-6px)`;
    card.style.transition = 'transform 0.1s ease';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.4s ease';
  });
});

// ─── FLOAT BADGE PARALLAX ───
const floatBadges = document.querySelectorAll('.float-badge');
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  floatBadges.forEach((badge, i) => {
    const speed = [0.06, 0.04, 0.08][i % 3];
    badge.style.transform = `translateY(${y * speed}px)`;
  });
}, { passive: true });

// ─── SMOOTH SCROLL FOR ANCHORS ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
  });
});

// ─── COUNTER ANIMATION ───
function animateCounters() {
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.dataset.counter);
    const dur    = 1200;
    const step   = target / (dur / 16);
    let current  = 0;
    const tick   = () => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current) + (target > 9 ? '+' : '');
      if (current < target) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

// ─── LAUNCH ───
window.addEventListener('load', () => {
  setTimeout(animateCounters, 400);
  setTimeout(() => {
    document.querySelectorAll('[data-reveal]').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) revealObserver.observe(el);
    });
  }, 200);
});

console.log('✅ Portfolio v6 — particles, 3D tilt, glassmorphism, smooth scroll active');