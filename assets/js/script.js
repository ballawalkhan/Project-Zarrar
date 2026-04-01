/* =============================================
   ZARRAR ADVENTURES — MAIN JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Hamburger Menu ---- */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    // Close on link click (mobile)
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ---- Active Nav Link ---- */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === currentPath ||
      (currentPath === '/' && href === '/') ||
      (href !== '/' && currentPath.endsWith(href.replace('/', '')))
    ) {
      link.classList.add('active');
    }
  });

  /* ---- Domestic / International Toggle ---- */
  const modeToggle = document.getElementById('modeToggle');
  const modeText = document.getElementById('modeText');
  let isDomestic = true;

  if (modeToggle && modeText) {
    modeToggle.addEventListener('click', function () {
      isDomestic = !isDomestic;
      modeText.textContent = isDomestic ? 'Domestic' : 'International';
      // Update all price elements
      document.querySelectorAll('[data-pkr]').forEach(el => {
        el.textContent = isDomestic ? el.dataset.pkr : el.dataset.usd;
      });
      // Store preference
      localStorage.setItem('zarrar_mode', isDomestic ? 'domestic' : 'international');
    });
    // Restore preference
    const saved = localStorage.getItem('zarrar_mode');
    if (saved === 'international') {
      isDomestic = false;
      modeText.textContent = 'International';
    }
  }

  /* ---- Smooth Scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--navbar-height')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ---- Category Tabs (Shop page) ---- */
  document.querySelectorAll('.category-tab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      const category = this.dataset.category;
      document.querySelectorAll('[data-category-item]').forEach(item => {
        if (category === 'all' || item.dataset.categoryItem === category) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ---- Cost Calculator (placeholder) ---- */
  const calcForm = document.getElementById('calcForm');
  if (calcForm) {
    calcForm.addEventListener('input', function () {
      const people = parseInt(document.getElementById('calcPeople')?.value) || 1;
      const days = parseInt(document.getElementById('calcDays')?.value) || 1;
      const type = document.getElementById('calcType')?.value || 'standard';
      const rates = { standard: 8500, premium: 14000, custom: 18000 };
      const rate = rates[type] || 8500;
      const total = people * days * rate;
      const resultEl = document.getElementById('calcResult');
      if (resultEl) {
        resultEl.innerHTML = `<strong>Estimated Cost:</strong> PKR ${total.toLocaleString()} &nbsp;|&nbsp; USD ${Math.round(total / 280).toLocaleString()} <br><small>50% advance required: PKR ${Math.round(total/2).toLocaleString()}</small>`;
      }
    });
  }

  /* ---- Form Submission (placeholder) ---- */
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      if (btn) {
        const orig = btn.textContent;
        btn.textContent = 'Sending...';
        btn.disabled = true;
        setTimeout(() => {
          btn.textContent = '✓ Sent Successfully!';
          btn.style.background = '#16a34a';
          setTimeout(() => {
            btn.textContent = orig;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
          }, 3000);
        }, 1200);
      }
    });
  });

  /* ---- Scroll Animation (fade-in) ---- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

});
