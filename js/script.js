/* ============================================================
   SANDEEP SINGH RATHORE — PORTFOLIO v2
   JavaScript: Canvas AI visual, Navbar, Reveals, Form
   ============================================================ */

/* ── 1. Navbar Scroll Behavior ───────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  // Scroll → add .scrolled class
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    navLinks.classList.contains('open')
      ? spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)'
      : spans[0].style.transform = '';
    navLinks.classList.contains('open')
      ? spans[1].style.opacity = '0'
      : spans[1].style.opacity = '';
    navLinks.classList.contains('open')
      ? spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)'
      : spans[2].style.transform = '';
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.querySelectorAll('span').forEach(s => {
        s.style.transform = '';
        s.style.opacity   = '';
      });
    });
  });
})();

/* ── 2. Hero Canvas — AI Neural Network ─────────────────── */
(function initHeroCanvas() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  const ctx    = canvas.getContext('2d');
  let W, H, nodes = [], animFrameId;

  const NODE_COUNT  = 48;
  const LINK_DIST   = 130;
  const NODE_RADIUS = 2.2;
  const SPEED       = 0.35;

  // Colors (match CSS accent palette)
  const NODE_COLOR  = 'rgba(0, 229, 160, 0.7)';
  const LINK_BASE   = [0, 229, 160];

  function resize() {
    W = canvas.offsetWidth;
    H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
  }

  function createNode() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r:  NODE_RADIUS + Math.random() * 1.5,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.015 + Math.random() * 0.02
    };
  }

  function init() {
    resize();
    nodes = Array.from({ length: NODE_COUNT }, createNode);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Update positions
    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      n.pulse += n.pulseSpeed;

      if (n.x < -20) n.x = W + 20;
      if (n.x > W + 20) n.x = -20;
      if (n.y < -20) n.y = H + 20;
      if (n.y > H + 20) n.y = -20;
    });

    // Draw links
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < LINK_DIST) {
          const opacity = (1 - dist / LINK_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${LINK_BASE[0]}, ${LINK_BASE[1]}, ${LINK_BASE[2]}, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    nodes.forEach(n => {
      const pulse = Math.sin(n.pulse);
      const r     = n.r + pulse * 0.5;

      // Outer glow
      const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 4);
      grd.addColorStop(0, `rgba(0, 229, 160, ${0.08 + pulse * 0.04})`);
      grd.addColorStop(1, 'rgba(0, 229, 160, 0)');
      ctx.beginPath();
      ctx.arc(n.x, n.y, r * 4, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();

      // Core dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = NODE_COLOR;
      ctx.fill();
    });

    animFrameId = requestAnimationFrame(draw);
  }

  // Start
  init();
  draw();

  window.addEventListener('resize', () => {
    cancelAnimationFrame(animFrameId);
    init();
    draw();
  }, { passive: true });

  // Mouse interaction — attract nearby nodes
  canvas.addEventListener('mousemove', (e) => {
    const rect  = canvas.getBoundingClientRect();
    const mx    = e.clientX - rect.left;
    const my    = e.clientY - rect.top;

    nodes.forEach(n => {
      const dx = mx - n.x, dy = my - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        n.vx += dx / dist * 0.02;
        n.vy += dy / dist * 0.02;
        // Clamp velocity
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed > 2) { n.vx = (n.vx / speed) * 2; n.vy = (n.vy / speed) * 2; }
      }
    });
  }, { passive: true });
})();

/* ── 3. Scroll Reveal (IntersectionObserver) ─────────────── */
(function initReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealEls.forEach(el => observer.observe(el));
})();

/* ── 4. Active Nav Link on Scroll ───────────────────────── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.style.color = 'var(--text)';
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
})();

/* ── 5. Contact Form (simple client-side) ────────────────── */
(function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn  = form.querySelector('button[type="submit"]');
    const span = btn.querySelector('span');

    // Loading state
    btn.disabled = true;
    span.textContent = 'Sending...';

    // Collect form data
    const name    = form.querySelector('#name').value.trim();
    const email   = form.querySelector('#email').value.trim();
    const service = form.querySelector('#service').value;
    const message = form.querySelector('#message').value.trim();

    // Build WhatsApp message (fallback delivery method)
    const waText = encodeURIComponent(
      `Hi Sandeep Rathore! I found you through your portfolio.\n\n` +
      `Name: ${name}\nContact: ${email}\nService: ${service || 'Not specified'}\n\nMessage: ${message}`
    );

    // Simulate a brief processing time, then redirect to WhatsApp
    setTimeout(() => {
      form.classList.add('hidden');
      form.style.display = 'none';
      success.classList.add('active');

      // Update WhatsApp link with prefilled message
      const waLink = success.querySelector('a[href*="wa.me"]');
      if (waLink) {
        waLink.href = `https://wa.me/9116723294?text=${waText}`;
      }
    }, 900);
  });
})();

/* ── 6. Smooth number counter on visible ─────────────────── */
(function initCounters() {
  // If you want animated number counters in future, hook here
  // Currently stats are static, this is a placeholder
})();

/* ── 7. Tiny UX: cursor dot on desktop ──────────────────── */
(function initCursorGlow() {
  // Only on non-touch devices and large screens
  if (window.matchMedia('(hover: none)').matches) return;
  if (window.innerWidth < 1024) return;

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 8px; height: 8px; border-radius: 50%;
    background: var(--accent); opacity: 0;
    box-shadow: 0 0 12px var(--accent);
    transition: opacity 0.3s, transform 0.1s;
    transform: translate(-50%, -50%);
  `;
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let visible = false;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left  = mouseX + 'px';
    cursor.style.top   = mouseY + 'px';
    if (!visible) {
      cursor.style.opacity = '0.85';
      visible = true;
    }
  });

  // Scale on clickable elements
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      cursor.style.opacity   = '0.5';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity   = '0.85';
    });
  });
})();
