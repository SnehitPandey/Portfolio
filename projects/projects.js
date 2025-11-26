// Tab switching for projects page
document.addEventListener('DOMContentLoaded', () => {
  const tabBtns = document.querySelectorAll('.nav-menu .tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  if (!tabBtns.length || !tabContents.length) return;

  // Ensure one button is active on load: prefer one with .active, otherwise first
  let hasActive = false;
  tabBtns.forEach(b => { if (b.classList.contains('active')) hasActive = true; });
  if (!hasActive) tabBtns[0].classList.add('active');

  // Show matching content for initial active button
  const initial = document.querySelector('.nav-menu .tab-btn.active');
  if (initial && initial.dataset.tab) {
    tabContents.forEach(c => c.classList.toggle('active', c.id === initial.dataset.tab));
  }

  // Set initial aria states for buttons and panels
  tabBtns.forEach(b => {
    const selected = b.classList.contains('active');
    b.setAttribute('aria-selected', selected ? 'true' : 'false');
  });
  tabContents.forEach(c => {
    c.setAttribute('aria-hidden', c.classList.contains('active') ? 'false' : 'true');
  });

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      if (!target) return;

      // toggle active class on buttons and update ARIA
      tabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // show/hide contents and set aria-hidden
      tabContents.forEach(c => {
        if (c.id === target) {
          c.classList.add('active');
          c.setAttribute('aria-hidden', 'false');
        } else {
          c.classList.remove('active');
          c.setAttribute('aria-hidden', 'true');
        }
      });

      // smooth scroll to main content (optional UX)
      const main = document.querySelector('.main-content');
      if (main) main.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
// 🌌 OPTIMIZED STAR FIELD (Mobile-Responsive)
function createStars() {
  document.querySelectorAll(".star").forEach(s => s.remove());
  const isMobile = window.innerWidth <= 768;
  const numberOfStars = isMobile ? 100 : 250;
  const pageHeight = document.documentElement.scrollHeight;

  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * pageHeight}px`;
    star.style.animationDuration = `${Math.random() * 3 + 1}s`;
    document.body.appendChild(star);
  }
}

window.addEventListener("load", createStars);

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    createStars();
    if (window.innerWidth > 768) {
      const navToggle = document.querySelector('.nav-toggle');
      const navMenu = document.querySelector('.nav-menu');
      if (navToggle && navMenu) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    }
  }, 250);
});

// // ☄️ OPTIMIZED COMETS
// function spawnComet() {
//   const isMobile = window.innerWidth <= 768;
//   if (isMobile && Math.random() > 0.5) return;
//   const comet = document.createElement("div");
//   comet.classList.add("comet");
//   comet.style.top = Math.random() * window.innerHeight + "px";
//   comet.style.left = Math.random() * window.innerWidth + "px";
//   document.body.appendChild(comet);
//   setTimeout(() => comet.remove(), 4000);
// }

// const cometInterval = window.innerWidth <= 768 ? 4000 : 2500;
// setInterval(spawnComet, cometInterval);

// 📱 TOUCH DEVICE OPTIMIZATION
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
  document.body.classList.add("touch-device");
  const hoverElements = document.querySelectorAll(
    ".tech-card, .socials .icon, .footer-icon, .info-card"
  );
  hoverElements.forEach((el) => {
    el.addEventListener("touchstart", function () {
      this.style.transform = "scale(0.95)";
    });
    el.addEventListener("touchend", function () {
      this.style.transform = "";
    });
  });
}

// 🎨 REDUCE MOTION FOR ACCESSIBILITY
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("*").forEach((el) => {
    el.style.animationDuration = "0.01ms";
    el.style.transitionDuration = "0.01ms";
  });
}

// 🔄 ORIENTATION CHANGE
window.addEventListener("orientationchange", () => {
  setTimeout(() => createStars(), 200);
});

// 🎯 VIEWPORT HEIGHT FIX
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}
setVH();
window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);

// Tab functionality
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");

    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabContents.forEach((content) => content.classList.remove("active"));

    // Add active class to clicked button and target content
    button.classList.add("active");
    document.getElementById(targetTab).classList.add("active");
  });
});

// ========== HAMBURGER MENU ==========
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navButtons = document.querySelectorAll('.nav-menu .tab-btn');

if (navToggle && navMenu) {
  // Initialize aria-expanded
  navToggle.setAttribute('aria-expanded', 'false');

  // Helper to close menu
  function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
    document.body.classList.remove('menu-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }

  // Only allow toggling on small viewports (mobile)
  navToggle.addEventListener('click', (e) => {
    if (!window.matchMedia('(max-width: 768px)').matches) return;
    e.stopPropagation();
    const isOpen = navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // Close menu when any tab button (mobile) is clicked
  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      if (navMenu.classList.contains('open')) closeMenu();
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) closeMenu();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
  });

  // Close menu automatically if viewport is resized above mobile breakpoint
  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 768px)').matches && navMenu.classList.contains('open')) {
      closeMenu();
    }
  });
}
