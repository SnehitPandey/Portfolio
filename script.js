// 🌌 OPTIMIZED STAR FIELD (Mobile-Responsive)
function createStars() {
  // Remove existing stars first
  document.querySelectorAll(".star").forEach(s => s.remove());
  
  // Adjust star count based on screen size for performance
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

// Debounce resize to prevent performance issues
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    createStars();
    
    // Close mobile menu on resize to desktop
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

// ☄️ OPTIMIZED COMETS (Fewer on mobile)
function spawnComet() {
  // Reduce comet frequency on mobile
  const isMobile = window.innerWidth <= 768;
  if (isMobile && Math.random() > 0.5) return;

  const comet = document.createElement("div");
  comet.classList.add("comet");

  comet.style.top = Math.random() * window.innerHeight + "px";
  comet.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(comet);
  setTimeout(() => comet.remove(), 4000);
}

// Adjust comet spawn rate based on device
const cometInterval = window.innerWidth <= 768 ? 4000 : 2500;
setInterval(spawnComet, cometInterval);

// ⌨️ TYPING TEXT EFFECT
const typingEl = document.querySelector(".typing");

if (typingEl) {
  const words = ["Experiences", "Projects", "Resume"];
  let i = 0, j = 0, removing = false;

  function typeLoop() {
    let word = words[i];

    if (!removing) {
      typingEl.textContent = word.slice(0, ++j);
      if (j === word.length) {
        removing = true;
        setTimeout(typeLoop, 1200);
        return;
      }
    } else {
      typingEl.textContent = word.slice(0, --j);
      if (j === 0) {
        removing = false;
        i = (i + 1) % words.length;
      }
    }

    setTimeout(typeLoop, removing ? 90 : 130);
  }
  typeLoop();
}

// 👀 OPTIMIZED SCROLL-REVEAL ANIMATION (Works both up and down)
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {
  const isMobile = window.innerWidth <= 768;
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          // Remove visible class when scrolling back up/down
          entry.target.classList.remove("visible");
        }
      });
    },
    { 
      threshold: isMobile ? 0.1 : 0.2,
      rootMargin: "0px 0px -50px 0px"
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));
}

// ========== HAMBURGER MENU FUNCTIONALITY ==========
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle && navMenu) {
  // Toggle menu on hamburger click
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    }
  });

  // Close menu on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
}

// 🔗 SMOOTH SCROLL FOR NAVIGATION LINKS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "#home") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    } else {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth"
        });
      }
    }
  });
});

// 🎯 ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-menu a");

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinksAll.forEach(link => {
        link.style.color = "#0ff";
        link.style.textShadow = "none";
        
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.style.color = "#fff";
          link.style.textShadow = "0 0 8px #0ff";
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavOnScroll);

// 📱 TOUCH DEVICE DETECTION AND OPTIMIZATION
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

if (isTouchDevice()) {
  document.body.classList.add("touch-device");
  
  const hoverElements = document.querySelectorAll(
    ".tech-card, .socials .icon, .footer-icon, .info-card"
  );
  
  hoverElements.forEach(el => {
    el.addEventListener("touchstart", function() {
      this.style.transform = "scale(0.95)";
    });
    
    el.addEventListener("touchend", function() {
      this.style.transform = "";
    });
  });
}

// 🎨 REDUCE MOTION FOR ACCESSIBILITY
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll("*").forEach(el => {
    el.style.animationDuration = "0.01ms";
    el.style.transitionDuration = "0.01ms";
  });
}

// 🔄 ORIENTATION CHANGE HANDLER
window.addEventListener("orientationchange", () => {
  setTimeout(() => {
    createStars();
  }, 200);
});

// 🎯 VIEWPORT HEIGHT FIX FOR MOBILE (100vh issue)
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

setVH();
window.addEventListener("resize", setVH);
window.addEventListener("orientationchange", setVH);