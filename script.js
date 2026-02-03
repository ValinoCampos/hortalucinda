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
