/* SyncIT MSP — homepage interactions */
document.addEventListener('DOMContentLoaded', () => {

  /* Steps stagger animation */
  const steps = document.querySelectorAll('.home .step');
  if (steps.length && 'IntersectionObserver' in window) {
    const stepIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          stepIo.unobserve(e.target);
        }
      });
    }, { threshold: 0.3, rootMargin: '0px 0px -20px 0px' });
    steps.forEach((s, i) => {
      s.style.transitionDelay = `${i * 0.1}s`;
      stepIo.observe(s);
    });
  } else {
    steps.forEach(s => s.classList.add('in'));
  }

  /* Sync panel rows — stagger in-view highlight */
  const panelRows = document.querySelectorAll('.sync-panel-row');
  if (panelRows.length && 'IntersectionObserver' in window) {
    const rowIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('in-view'), parseInt(e.target.dataset.delay || '0', 10));
        }
      });
    }, { threshold: 0.5 });
    panelRows.forEach((row, i) => {
      row.dataset.delay = String(i * 120);
      rowIo.observe(row);
    });
  }

  /* Subtle parallax on hero visual */
  const visual = document.querySelector('.hero-visual');
  if (visual && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < 800) visual.style.transform = `translateY(${y * 0.04}px)`;
        ticking = false;
      });
    }, { passive: true });
  }

});
