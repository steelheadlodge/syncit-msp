/* SyncIT MSP — interactions: mobile nav, scroll reveal, count-up, nav shrink */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Mobile nav toggle ──────────────────────────────── */
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => { links.classList.remove('open'); toggle.classList.remove('open'); })
    );
  }

  /* ── Navbar shadow/shrink on scroll ─────────────────── */
  const nav = document.querySelector('.navbar');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── Duplicate marquee content for seamless loop ────── */
  document.querySelectorAll('.marquee').forEach(m => {
    m.innerHTML += m.innerHTML;
  });

  /* ── Scroll reveal ──────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ── Count-up stats ─────────────────────────────────── */
  const nums = document.querySelectorAll('[data-count]');
  const runCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dur = 1400;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target % 1 === 0 ? Math.round(target * eased) : (target * eased).toFixed(1);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && nums.length) {
    const io2 = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { runCount(e.target); io2.unobserve(e.target); } });
    }, { threshold: 0.5 });
    nums.forEach(n => io2.observe(n));
  }

  /* ── Footer year ────────────────────────────────────── */
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
