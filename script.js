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

// ☄️ OPTIMIZED COMETS
function spawnComet() {
  const isMobile = window.innerWidth <= 768;
  if (isMobile && Math.random() > 0.5) return;
  const comet = document.createElement("div");
  comet.classList.add("comet");
  comet.style.top = Math.random() * window.innerHeight + "px";
  comet.style.left = Math.random() * window.innerWidth + "px";
  document.body.appendChild(comet);
  setTimeout(() => comet.remove(), 4000);
}

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

// 👀 SCROLL-REVEAL ANIMATION
const revealElements = document.querySelectorAll(".reveal");
if (revealElements.length > 0) {
  const isMobile = window.innerWidth <= 768;
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
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

// ========== HAMBURGER MENU ==========
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.classList.remove('menu-open');
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('open')) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
}

// 🔗 SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#" || href === "#home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }
    }
  });
});

// 🎯 ACTIVE NAV LINK ON SCROLL
const sections = document.querySelectorAll("section[id]");
const navLinksAll = document.querySelectorAll(".nav-menu a");

function highlightNavOnScroll() {
  const scrollY = window.pageYOffset;
  navLinksAll.forEach(link => {
    link.style.color = "#00faff";
    link.style.textShadow = "none";
  });

  if (scrollY < 100) {
    const homeLink = document.querySelector('.nav-menu a[href="#home"]');
    if (homeLink) {
      homeLink.style.color = "#fff";
      homeLink.style.textShadow = "0 0 10px #00faff";
    }
    return;
  }

  let currentSection = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  if (currentSection) {
    const activeLink = document.querySelector(`.nav-menu a[href="#${currentSection}"]`);
    if (activeLink) {
      activeLink.style.color = "#fff";
      activeLink.style.textShadow = "0 0 10px #00faff";
    }
  }
}

window.addEventListener("scroll", highlightNavOnScroll);
window.addEventListener("load", highlightNavOnScroll);
highlightNavOnScroll();

// 📱 TOUCH DEVICE OPTIMIZATION
function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

if (isTouchDevice()) {
  document.body.classList.add("touch-device");
  const hoverElements = document.querySelectorAll(".tech-card, .socials .icon, .footer-icon, .info-card");
  hoverElements.forEach(el => {
    el.addEventListener("touchstart", function() { this.style.transform = "scale(0.95)"; });
    el.addEventListener("touchend", function() { this.style.transform = ""; });
  });
}

// 🎨 REDUCE MOTION FOR ACCESSIBILITY - FIXED
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.classList.add('reduce-motion');
  
  // Only target non-essential animations
  const style = document.createElement('style');
  style.textContent = `
    .reduce-motion .reveal,
    .reduce-motion .nav-menu a::after,
    .reduce-motion .modal-container,
    .reduce-motion .tech-card,
    .reduce-motion .socials .icon,
    .reduce-motion .footer-icon {
      animation: none !important;
      transition: opacity 0.15s ease !important;
    }
    
    /* Keep astronaut animation smooth */
    .reduce-motion .hero-astronaut {
      animation: floatAstro 6s ease-in-out infinite !important;
    }
    
    /* Keep essential animations */
    .reduce-motion .star {
      animation-duration: 2s !important;
    }
    
    .reduce-motion .comet {
      animation-duration: 3.5s !important;
    }
  `;
  document.head.appendChild(style);
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

// 🔧 CONTACT FORM HANDLING - FUNCTIONAL
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector(".send-btn");
    const originalText = submitBtn.innerHTML;
    const formData = new FormData(contactForm);
    
    if (!formData.get('name') || !formData.get('email') || !formData.get('message')) {
      alert('Please fill in all fields');
      return;
    }
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
    
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
        submitBtn.style.background = 'linear-gradient(90deg, #00ff88, #00cc66)';
        setTimeout(() => {
          contactForm.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
        }, 2000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      submitBtn.innerHTML = '<i class="fa-solid fa-exclamation-triangle"></i> Failed to Send';
      submitBtn.style.background = 'linear-gradient(90deg, #ff6b6b, #ee5a6f)';
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
      }, 3000);
      console.error('Error:', error);
    }
  });
}

// 🎯 TECH STACK & SOFTWARE MODAL FUNCTIONALITY
const techStackBtn = document.getElementById('openStackModal');
const softwareBtn = document.getElementById('openSoftwareModal');
const techStackModal = document.getElementById('techStackModal');
const softwareModal = document.getElementById('softwareModal');

function closeModal(modal) {
  if (modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
  }
}

if (techStackBtn && techStackModal) {
  techStackBtn.addEventListener('click', () => {
    techStackModal.classList.add('active');
    document.body.classList.add('modal-open');
  });
}

if (softwareBtn && softwareModal) {
  softwareBtn.addEventListener('click', () => {
    softwareModal.classList.add('active');
    document.body.classList.add('modal-open');
  });
}

document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const modal = e.target.closest('.modal-overlay');
    closeModal(modal);
  });
});

document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal(overlay);
    }
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      closeModal(modal);
    });
  }
});