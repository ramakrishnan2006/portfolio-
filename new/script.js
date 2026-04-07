/* ══════════════════════════════════════════
   Ramakrishnan S — Portfolio Scripts
   script.js
══════════════════════════════════════════ */

/* ── 1. Scroll Reveal ── */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

/* ── 2. Skill Bar Animation ── */
function initSkillBars() {
  const barSection = document.querySelector('.skill-bar-list');
  if (!barSection) return;

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        document.querySelectorAll('.skill-bar-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
        barObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  barObserver.observe(barSection);
}

/* ── 3. Certificate Modal ── */
const certMeta = {
  ibm: {
    title: 'IBM Certificate',
    badge: 'WD0102EN · Verified'
  },
  infosys: {
    title: 'Infosys Springboard Certificate',
    badge: 'DevOps · Verified'
  }
};

function openCert(id) {
  // Hide all cert panels, show the right one
  document.querySelectorAll('.cert-content').forEach(el => el.classList.remove('active'));
  const panel = document.getElementById('cert-' + id);
  if (panel) panel.classList.add('active');

  // Update modal header
  document.getElementById('modalTitle').textContent = certMeta[id].title;
  document.getElementById('modalBadge').textContent = certMeta[id].badge;

  // Open modal
  document.getElementById('certModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  document.getElementById('certModal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('certModal')) closeCert();
}

// Close on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeCert();
});

/* ── 4. Contact Form ── */
function handleSend() {
  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  alert(`Thanks ${name}! Ramakrishnan will get back to you at ${email} soon. 🚀`);

  // Reset form
  document.getElementById('contactName').value    = '';
  document.getElementById('contactEmail').value   = '';
  document.getElementById('contactMessage').value = '';
}

/* ── 5. Init on DOM Ready ── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initSkillBars();
});
