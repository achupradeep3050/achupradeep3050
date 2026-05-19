/* ═══════════════════════════════════════════════════════════
   ACHU PRADEEP — PORTFOLIO v7 JS
   Enhanced particles · 3D scroll effects · Magnetic hover
   NO gold accent · Deep Ocean cyan/teal theme
═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── PARTICLES ── */
  const container = document.getElementById('particles');
  if (container) {
    const COLORS = ['rgba(0,229,255,0.8)','rgba(0,145,255,0.7)','rgba(0,255,163,0.6)','rgba(124,77,255,0.5)'];
    for (let i = 0; i < 50; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = (Math.random()*100) + '%';
      const sz = Math.random()*2.5+0.5;
      p.style.width = sz+'px'; p.style.height = sz+'px';
      p.style.background = COLORS[Math.floor(Math.random()*COLORS.length)];
      p.style.boxShadow = `0 0 ${sz*3}px ${COLORS[Math.floor(Math.random()*COLORS.length)]}`;
      const dur = Math.random()*12+8, del = Math.random()*15;
      p.style.animationDuration = dur+'s';
      p.style.animationDelay = '-'+del+'s';
      p.style.animationTimingFunction = 'linear';
      p.style.animationIterationCount = 'infinite';
      container.appendChild(p);
    }
  }

  /* ── NAV SCROLL ── */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => observer.observe(el));

  /* ── SMOOTH SCROLL NAV ── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const t = document.querySelector(link.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth', block:'start' }); }
    });
  });

  /* ── 3D CARD TILT ── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const dx = (e.clientX-r.left-r.width/2)/r.width;
      const dy = (e.clientY-r.top-r.height/2)/r.height;
      card.style.transform = `perspective(1000px) translateY(-6px) scale(1.02) rotateX(${-dy*6}deg) rotateY(${dx*8}deg)`;
      card.style.transition = 'transform 0.15s ease-out';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });

  /* ── MAGNETIC BUTTONS ── */
  document.querySelectorAll('.btn-primary,.btn-secondary,.clink,.plink').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*0.2}px,${(e.clientY-r.top-r.height/2)*0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
      btn.style.transition = 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)';
    });
  });

  /* ── SCROLL PROGRESS BAR ── */
  const pb = document.createElement('div');
  pb.id = 'scroll-progress';
  pb.style.cssText = 'position:fixed;top:0;left:0;height:2px;background:linear-gradient(90deg,#0091FF,#00E5FF,#00FFA3);z-index:9999;pointer-events:none';
  document.body.prepend(pb);
  window.addEventListener('scroll', () => {
    const sc = window.scrollY, tot = document.documentElement.scrollHeight-window.innerHeight;
    pb.style.width = (tot>0?(sc/tot)*100:0)+'%';
  }, { passive:true });

  /* ── CURSOR GLOW (desktop) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const cg = document.createElement('div');
    cg.style.cssText = 'position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(0,229,255,0.07),transparent 70%);pointer-events:none;z-index:9998;transform:translate(-50%,-50%);mix-blend-mode:screen';
    document.body.appendChild(cg);
    document.addEventListener('mousemove', e => { requestAnimationFrame(()=>{cg.style.left=e.clientX+'px';cg.style.top=e.clientY+'px';}); }, { passive:true });
    document.addEventListener('mouseleave', ()=>cg.style.opacity='0');
    document.addEventListener('mouseenter', ()=>cg.style.opacity='1');
  }

  /* ── ORB PARALLAX ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', e => {
      const cx = window.innerWidth/2, cy = window.innerHeight/2;
      const dx = (e.clientX-cx)/cx, dy = (e.clientY-cy)/cy;
      document.querySelectorAll('.orb').forEach((o,i) => {
        const f = (i+1)*0.04;
        o.style.transform = `translate(${dx*f*100}px,${dy*f*60}px)`;
      });
    }, { passive:true });
  }

  /* ── AVATAR RING SPIN ── */
  const ring = document.querySelector('.visual-avatar-ring');
  if (ring) {
    let angle = 0;
    function spin() { angle+=0.5; ring.style.background=`conic-gradient(from ${angle}deg,var(--accent),var(--accent2),var(--accent3),var(--accent2),var(--accent))`; requestAnimationFrame(spin); }
    spin();
  }

  /* ── PAGE LOAD ── */
  document.body.style.opacity='0';
  window.addEventListener('load', () => { document.body.style.transition='opacity 0.5s ease'; document.body.style.opacity='1'; });

});