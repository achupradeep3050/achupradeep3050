/**
 * Achu Pradeep Portfolio v2 — script.js
 * Particle field + scroll reveal + typing effect + nav scroll + counters
 */

'use strict';

/* ============================================================
   1. PARTICLE FIELD
   ============================================================ */
(function initParticles() {
    const canvas = document.getElementById('particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const count = Math.min(Math.floor(window.innerWidth / 8), 100);
    const particles = [];

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            radius: Math.random() * 1.4 + 0.4,
            opacity: Math.random() * 0.35 + 0.08,
        });
    }

    let mouse = { x: -1000, y: -1000 };
    document.addEventListener('mousemove', e => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (const p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(245, 197, 66, ${p.opacity})`;
            ctx.fill();

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            for (const q of particles) {
                const dx = p.x - q.x;
                const dy = p.y - q.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = `rgba(245, 197, 66, ${0.035 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            const mx = p.x - mouse.x;
            const my = p.y - mouse.y;
            const md = Math.sqrt(mx * mx + my * my);
            if (md < 160) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.strokeStyle = `rgba(245, 197, 66, ${0.07 * (1 - md / 160)})`;
                ctx.lineWidth = 0.7;
                ctx.stroke();
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
})();


/* ============================================================
   2. TYPING EFFECT
   ============================================================ */
(function initTyping() {
    const el = document.getElementById('typed-role');
    if (!el) return;

    const phrases = [
        'Linux DevOps Engineer',
        'AI Agent Developer',
        'SOC / Security Engineer',
        'Automation Architect',
        'RHCSA · RHCE Certified',
        'CrewAI · LangChain · Python',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pause = false;

    function tick() {
        const current = phrases[phraseIndex];

        if (pause) {
            pause = false;
            setTimeout(tick, 2200);
            return;
        }

        if (!isDeleting) {
            el.textContent = current.slice(0, ++charIndex);
            if (charIndex === current.length) {
                isDeleting = true;
                pause = true;
            } else {
                setTimeout(tick, 65 + Math.random() * 45);
            }
        } else {
            el.textContent = current.slice(0, --charIndex);
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(tick, 400);
            } else {
                setTimeout(tick, 30 + Math.random() * 25);
            }
        }
    }
    tick();
})();


/* ============================================================
   3. SCROLL REVEAL ENGINE
   ============================================================ */
(function initScrollReveal() {
    const els = document.querySelectorAll('[data-scroll-reveal]');
    if (!els.length) return;

    // Parse delay from data-delay attribute
    function getDelay(el) {
        return parseInt(el.dataset.delay || 0, 10);
    }

    // Use a single IO for all reveals
    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = getDelay(el);

                // Small delay handled per-element via setTimeout
                setTimeout(() => {
                    el.classList.add('is-visible');
                }, delay);

                io.unobserve(el);
            }
        });
    }, {
        threshold: 0.06,
        rootMargin: '0px 0px -30px 0px',
    });

    els.forEach(el => io.observe(el));
})();


/* ============================================================
   4. STICKY NAV — hide/show on scroll
   ============================================================ */
(function initNav() {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    let lastY = 0;
    let ticking = false;

    function update() {
        const y = window.scrollY;
        if (y > 80) {
            nav.classList.add('scrolled');
            if (y > lastY + 5) {
                nav.classList.add('hidden');
            } else if (y < lastY - 5) {
                nav.classList.remove('hidden');
            }
        } else {
            nav.classList.remove('scrolled', 'hidden');
        }
        lastY = y;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
})();


/* ============================================================
   5. HAMBURGER MENU
   ============================================================ */
(function initHamburger() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            menu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menu.classList.contains('open')) {
            toggle.classList.remove('open');
            menu.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
})();


/* ============================================================
   6. ACTIVE NAV HIGHLIGHT
   ============================================================ */
(function initActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');

    function highlight() {
        const scrollY = window.scrollY + 120;
        let current = '';

        sections.forEach(section => {
            if (scrollY >= section.offsetTop) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlight, { passive: true });
    highlight();
})();


/* ============================================================
   7. STAT COUNTER ANIMATION
   ============================================================ */
(function initCounters() {
    const counters = document.querySelectorAll('[data-target]');
    if (!counters.length) return;

    const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseFloat(el.dataset.target);
                const duration = 1600;
                const start = performance.now();
                const isFloat = target % 1 !== 0;

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Cubic ease-out
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = target * eased;
                    el.textContent = isFloat ? current.toFixed(1) : Math.round(current);

                    if (progress < 1) requestAnimationFrame(update);
                }

                requestAnimationFrame(update);
                io.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => io.observe(c));
})();


/* ============================================================
   8. SMOOTH SCROLL for hash links
   ============================================================ */
(function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
})();


/* ============================================================
   9. PAGE LOAD ENTRANCE ��� Hero elements stagger in
   ============================================================ */
(function pageEntrance() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
})();