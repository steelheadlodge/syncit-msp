/* SyncIT MSP — homepage interactions */
document.addEventListener('DOMContentLoaded', () => {

  /* Failsafe: never let reveal elements stay hidden (e.g. stale/broken JS). */
  const forceReveal = () => {
    document.querySelectorAll('.reveal, .reveal-scale').forEach(el => el.classList.add('in'));
    document.querySelectorAll('.home .step').forEach(el => el.classList.add('in'));
  };
  window.addEventListener('load', () => setTimeout(forceReveal, 2600));

  /* Cursor spotlight on cards */
  if (!window.matchMedia('(hover: none)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.service-card, .why-card, .quote-card').forEach(card => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    });
  }

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

  /* Cinematic onboarding → security flow: play on scroll + replay */
  const flow = document.getElementById('onboard-flow');
  if (flow) {
    const playFlow = () => flow.classList.add('playing');
    if ('IntersectionObserver' in window) {
      const fObs = new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { playFlow(); fObs.disconnect(); }
        });
      }, { threshold: 0.3 });
      fObs.observe(flow);
    } else {
      playFlow();
    }
    setTimeout(playFlow, 3200); // failsafe if observer never fires
    const replay = flow.querySelector('.flow-replay');
    if (replay) {
      replay.addEventListener('click', () => {
        flow.classList.remove('playing');
        void flow.offsetWidth; // force reflow to restart transitions
        requestAnimationFrame(playFlow);
      });
    }
  }

  /* Hero discovery-call capture form */
  const dForm = document.getElementById('discovery');
  const dSuccess = document.getElementById('discovery-success');
  if (dForm && dSuccess) {
    dForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = dForm.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Booking…';
      btn.disabled = true;
      try {
        const res = await fetch(dForm.action, {
          method: 'POST',
          body: new FormData(dForm),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          dForm.hidden = true;
          dSuccess.hidden = false;
        } else {
          btn.textContent = 'Error — call (516) 774-9700';
          btn.disabled = false;
        }
      } catch {
        btn.textContent = 'Error — call (516) 774-9700';
        btn.disabled = false;
      }
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
