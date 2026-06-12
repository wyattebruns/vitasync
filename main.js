// ── Family Modal ──────────────────────────────────────────────

function openFamilyModal() {
  document.getElementById('familyModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  // Set today as default date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('sendDate').value = today;
  document.getElementById('sendTime').value = '08:00';
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
    <input type="text" placeholder="Name" required />
    <input type="text" placeholder="Phone or email" required />
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

function goToStep2(e) {
  e.preventDefault();

  // Collect members from step 1
  const rows = document.querySelectorAll('#familyInvites .invite-row');
  const tags = document.getElementById('recipientTags');
  tags.innerHTML = '';
  rows.forEach(row => {
    const name = row.querySelector('input[type="text"]').value.trim();
    const role = row.querySelector('select').value;
    if (name) {
      const tag = document.createElement('div');
      tag.className = 'recipient-tag';
      tag.innerHTML = `<span>${name}</span>${role ? `<em>${role}</em>` : ''}`;
      tags.appendChild(tag);
    }
  });

  document.getElementById('step1').style.display = 'none';
  document.getElementById('step2').style.display = 'block';
  document.getElementById('stepDot1').classList.remove('active');
  document.getElementById('stepDot2').classList.add('active');
  document.querySelector('.modal').scrollTop = 0;
}

function backToStep1() {
  document.getElementById('step2').style.display = 'none';
  document.getElementById('step1').style.display = 'block';
  document.getElementById('stepDot1').classList.add('active');
  document.getElementById('stepDot2').classList.remove('active');
}

function useTemplate(btn) {
  document.getElementById('reminderMessage').value = btn.textContent;
}

function submitFamilyForm(e) {
  e.preventDefault();

  const date = document.getElementById('sendDate').value;
  const time = document.getElementById('sendTime').value;
  const repeat = document.getElementById('repeatOption').value;
  const names = [...document.querySelectorAll('.recipient-tag span')].map(s => s.textContent);

  const repeatLabel = { once: 'one time', daily: 'daily', weekly: 'weekly', custom: 'on a custom schedule' }[repeat];
  const formatted = new Date(`${date}T${time}`).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });

  document.getElementById('step2').style.display = 'none';
  const success = document.getElementById('familySuccess');
  document.getElementById('successMsg').textContent =
    `${names.join(', ')} will receive your message on ${formatted}, ${repeatLabel}.`;
  success.classList.add('show');

  setTimeout(() => {
    document.getElementById('familyModal').classList.remove('open');
    document.body.style.overflow = '';
    // Reset everything
    setTimeout(() => {
      success.classList.remove('show');
      document.getElementById('step1').style.display = 'block';
      document.getElementById('step1Form').reset();
      document.getElementById('step2Form').reset();
      document.getElementById('stepDot1').classList.add('active');
      document.getElementById('stepDot2').classList.remove('active');
      const invites = document.getElementById('familyInvites');
      while (invites.children.length > 1) invites.lastChild.remove();
      invites.querySelector('input[type="text"]').value = '';
      invites.querySelector('input[type="tel"]').value = '';
    }, 400);
  }, 3500);
}

// ── FAQ ───────────────────────────────────────────────────────

function toggleFaq(item) {
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── Nav ───────────────────────────────────────────────────────

function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.classList.toggle('open');
}

// ── Toast ─────────────────────────────────────────────────────

function showToast(message) {
  const toast = document.getElementById('cartToast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector('input');
  showToast('✓ Subscribed! Welcome to VitaSync.');
  input.value = '';
}

// ── Scroll animations ─────────────────────────────────────────

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step, .feature-card, .fmember, .product-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.2s';
  observer.observe(el);
});
