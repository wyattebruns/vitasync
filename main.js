function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

function showToast(message) {
  const toast = document.getElementById('cartToast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function addToCart(product, price) {
  showToast(`✓ VitaSync ${product} added to cart — $${price}`);
}

function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast(`✓ Subscribed! Welcome to VitaSync.`);
  input.value = '';
}

// Animate elements into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = entry.target.dataset.transform || 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step, .feature-card, .testimonial, .product-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s, transform 0.2s';
  observer.observe(el);
});
