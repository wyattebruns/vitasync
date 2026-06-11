function openFamilyModal() {
  document.getElementById('familyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeFamilyModal(e) {
  if (e && e.target !== document.getElementById('familyModal')) return;
  document.getElementById('familyModal').classList.remove('open');
  document.body.style.overflow = '';
}

function addInviteRow() {
  const container = document.getElementById('familyInvites');
  if (container.children.length >= 5) {
    showToast('Maximum 5 family members reached.');
    return;
  }
  const row = document.createElement('div');
  row.className = 'invite-row';
  row.innerHTML = `
    <input type="text" placeholder="Name" />
    <input type="tel" placeholder="Phone number" />
    <select>
      <option value="">Role</option>
      <option>Child</option>
      <option>Grandparent</option>
      <option>Partner</option>
      <option>Other</option>
    </select>
    <button type="button" class="invite-remove" onclick="removeInvite(this)" title="Remove">&times;</button>
  `;
  container.appendChild(row);
}

function removeInvite(btn) {
  const container = document.getElementById('familyInvites');
  if (container.children.length > 1) btn.closest('.invite-row').remove();
}

function submitFamilyForm(e) {
  e.preventDefault();
  const form = e.target;
  form.style.display = 'none';
  const success = document.getElementById('familySuccess');
  success.classList.add('show');
  setTimeout(() => {
    closeFamilyModal({ target: document.getElementById('familyModal') });
    form.style.display = '';
    success.classList.remove('show');
    form.reset();
  }, 3000);
}

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
