// ─── COOLER COMPUTERS — shared JS ───

// ─── NAV ───
function renderNav(activePage) {
  const nav = document.querySelector('nav');
  if (!nav) return;

  nav.innerHTML = `
    <a href="/" class="nav-logo">
      <div class="nav-logo-icon">❄</div>
      <span>COOLER<span style="color:var(--accent)">.</span></span>
    </a>

    <ul class="nav-links">
      <li class="nav-dropdown-wrap">
        <span class="nav-item" id="services-trigger">
          Services <span class="chevron">▾</span>
        </span>
        <div class="nav-dropdown" id="services-dropdown">
          <a href="/ios">
            <div class="dd-icon" style="background:rgba(0,229,255,0.1);color:var(--accent)">🍎</div>
            iOS Development
          </a>
          <a href="/android">
            <div class="dd-icon" style="background:rgba(6,255,165,0.1);color:var(--accent3)">🤖</div>
            Android Development
          </a>
          <a href="/publishing">
            <div class="dd-icon" style="background:rgba(124,58,237,0.1);color:#a78bfa">🚀</div>
            App Publishing
          </a>
        </div>
      </li>
      <li class="${activePage === 'contacts' ? 'active' : ''}"><a href="/contacts">Contacts</a></li>
      <li class="${activePage === 'team' ? 'active' : ''}"><a href="/team">Our Team</a></li>
      <li class="${activePage === 'about' ? 'active' : ''}"><a href="/about">About Us</a></li>
      <li class="${activePage === 'policy' ? 'active' : ''}"><a href="/policy">Policy</a></li>
    </ul>

    <button class="btn-cta" onclick="openModal()">Get in Touch</button>

    <button class="nav-hamburger" id="hamburger-btn" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;

  // ─── DROPDOWN: JS-controlled, stays open while hovering trigger OR dropdown ───
  const wrap = nav.querySelector('.nav-dropdown-wrap');
  const dropdown = nav.querySelector('#services-dropdown');
  let closeTimer = null;

  function openDropdown() {
    if (closeTimer) { clearTimeout(closeTimer); closeTimer = null; }
    wrap.classList.add('open');
    dropdown.classList.add('open');
  }
  function scheduleClose() {
    closeTimer = setTimeout(() => {
      wrap.classList.remove('open');
      dropdown.classList.remove('open');
    }, 120);
  }

  wrap.addEventListener('mouseenter', openDropdown);
  wrap.addEventListener('mouseleave', scheduleClose);
  dropdown.addEventListener('mouseenter', openDropdown);
  dropdown.addEventListener('mouseleave', scheduleClose);

  // ─── MOBILE MENU ───
  const hamburger = document.getElementById('hamburger-btn');
  if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
}

// ─── MOBILE MENU ───
function renderMobileMenu() {
  let menu = document.getElementById('mobile-menu');
  if (!menu) {
    menu = document.createElement('div');
    menu.id = 'mobile-menu';
    menu.className = 'mobile-menu';
    document.body.appendChild(menu);
  }
  menu.innerHTML = `
    <span class="mm-section">Services</span>
    <a href="/ios">🍎 iOS Development</a>
    <a href="/android">🤖 Android Development</a>
    <a href="/publishing">🚀 App Publishing</a>
    <span class="mm-section">Company</span>
    <a href="/contacts">Contacts</a>
    <a href="/team">Our Team</a>
    <a href="/about">About Us</a>
    <a href="/policy">Policy</a>
    <a class="mm-cta" onclick="openModal();toggleMobileMenu()">Get in Touch</a>
  `;
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('open');
}

// ─── FOOTER ───
function renderFooter() {
  const footer = document.querySelector('footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h4>Services</h4>
          <a href="/ios">iOS Development</a>
          <a href="/android">Android Development</a>
          <a href="/publishing">App Publishing in Stores</a>
        </div>
        <div class="footer-col">
          <h4>Company</h4>
          <a href="/">Home</a>
          <a href="/contacts">Contacts</a>
          <a href="/team">Our Team</a>
          <a href="/about">About Us</a>
          <a href="/policy">Privacy Policy</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <p>COOLER COMPUTERS Spółka z ograniczoną odpowiedzialnością</p>
          <p>Al. Aleje Jerozolimskie 89-43<br>02-001 Warszawa, Polska</p>
          <p>NIP: 5871703871<br>REGON: 361298155<br>KRS: 0000553944</p>
          <p>support@quantum-2027.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        <span>COOLER COMPUTERS SP Z O O</span>
        <span>© 2026 COOLER COMPUTERS Sp. z o.o. — All rights reserved.</span>
      </div>
    </div>
  `;
}

// ─── MODAL ───
function renderModal() {
  if (document.getElementById('modal-overlay')) return;
  const overlay = document.createElement('div');
  overlay.id = 'modal-overlay';
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal">
      <button class="modal-close" onclick="closeModal()">×</button>
      <h2>Leave a Request</h2>
      <div class="form-field"><label>Name</label><input type="text" placeholder="Your name" /></div>
      <div class="form-field"><label>Company</label><input type="text" placeholder="Company name" /></div>
      <div class="form-field"><label>Email</label><input type="email" placeholder="your@email.com" /></div>
      <div class="form-field"><label>Comment</label><textarea placeholder="Tell us about your project..."></textarea></div>
      <button class="modal-submit" onclick="submitForm()">Send Request</button>
      <p class="modal-legal">
        By clicking "Send Request", you agree to the processing of personal data
        in accordance with the <a href="/policy">Privacy Policy</a>.
      </p>
    </div>
  `;
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeModal();
  });
  document.body.appendChild(overlay);
}

function openModal() {
  // Ensure modal exists (defensive)
  renderModal();
  const overlay = document.getElementById('modal-overlay');
  if (overlay) { overlay.classList.add('open'); document.body.style.overflow = 'hidden'; }
}

function closeModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) { overlay.classList.remove('open'); document.body.style.overflow = ''; }
}

function submitForm() {
  const modal = document.querySelector('.modal');
  if (!modal) return;
  modal.innerHTML = `
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:52px;margin-bottom:16px">✅</div>
      <h2 style="margin-bottom:12px">Request Sent!</h2>
      <p style="color:var(--text-muted);margin-bottom:28px">We'll get back to you within 24 hours.</p>
      <button class="modal-submit" style="width:auto;padding:12px 36px" onclick="closeModal()">Close</button>
    </div>
  `;
}

// ─── SCROLL REVEAL ───
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => obs.observe(el));
}

// ─── INIT ───
document.addEventListener('DOMContentLoaded', () => {
  renderModal();
  renderMobileMenu();
  renderFooter();
  initReveal();
});
