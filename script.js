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
});
