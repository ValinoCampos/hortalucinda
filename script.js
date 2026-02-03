function filtrar(categoria) {
  const productos = document.querySelectorAll('.producto');
  productos.forEach(p => {
    if(categoria === 'todos') {
      p.style.display = 'block';
    } else {
      p.style.display = p.classList.contains(categoria) ? 'block' : 'none';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.filtros button');
  botones.forEach(btn => {
    btn.addEventListener('click', () => {
      botones.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  const todosBtn = Array.from(botones).find(b => b.getAttribute('onclick') && b.getAttribute('onclick').includes('todos'));
  if (todosBtn) todosBtn.classList.add('active');
  
  // Feria interactivity: toggle details on click (for touch) and allow keyboard toggle
  const feriaItems = document.querySelectorAll('#ferias .feria-item');
  feriaItems.forEach(item => {
    item.addEventListener('click', (e) => {
      // don't toggle when clicking the maps link
      if (e.target.tagName.toLowerCase() === 'a') return;
      item.classList.toggle('expanded');
      const details = item.querySelector('.feria-details');
      if (details) details.setAttribute('aria-hidden', !item.classList.contains('expanded'));
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('expanded');
        const details = item.querySelector('.feria-details');
        if (details) details.setAttribute('aria-hidden', !item.classList.contains('expanded'));
      }
    });
  });
  
  // Smooth scroll for internal anchors with controlled duration
  function smoothScrollTo(targetY, duration = 550) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;

    function easeInOutQuad(t) { return t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t; }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const time = Math.min(1, (timestamp - startTime) / duration);
      const eased = easeInOutQuad(time);
      window.scrollTo(0, Math.round(startY + distance * eased));
      if (time < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#' ) return;
    const targetEl = document.querySelector(href);
    if (!targetEl) return;
    a.addEventListener('click', (e) => {
      // allow default for links that open in new tab
      if (a.target === '_blank') return;
      e.preventDefault();
      const offset = 18; // small offset from top
      const targetY = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
      smoothScrollTo(targetY, 550);
    });
  });
});
