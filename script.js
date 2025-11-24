// 🌌 STAR FIELD
function createStars() {
  const numberOfStars = 250;
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
window.addEventListener("resize", () => {
  document.querySelectorAll(".star").forEach(s => s.remove());
  createStars();
});


// ☄️ COMETS
function spawnComet() {
  const comet = document.createElement("div");
  comet.classList.add("comet");

  comet.style.top = Math.random() * window.innerHeight + "px";
  comet.style.left = Math.random() * window.innerWidth + "px";

  document.body.appendChild(comet);
  setTimeout(() => comet.remove(), 4000);
}

setInterval(spawnComet, 2500);


// ⌨️ TYPING TEXT EFFECT
const words = ["Projects", "Experience", "Resume"];
const typingEl = document.querySelector(".typing");
let i = 0, j = 0, removing = false;

function typeLoop() {
  let word = words[i];

  if (!removing) {
    typingEl.textContent = word.slice(0, ++j);
    if (j === word.length) {
      removing = true;
      setTimeout(typeLoop, 900);
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


// 👀 SCROLL-REVEAL ANIMATION (UP + DOWN)
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle("visible", entry.isIntersecting);
  });
}, { threshold: 0.2 });

revealElements.forEach(el => revealObserver.observe(el));

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    const to = "snehit2004@gmail.com";

    const subject = encodeURIComponent(
      `Portfolio contact from ${name || "Someone"}`
    );

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}


// // ========== HYBRID NAV: HAMBURGER + CLOSE ON CLICK ==========
// const navToggle = document.querySelector('.nav-toggle');
// const navMenu  = document.querySelector('.nav-menu');

// if (navToggle && navMenu) {
//   navToggle.addEventListener('click', () => {
//     navMenu.classList.toggle('open');
//   });

//   // Close menu when a link is clicked (mobile UX)
//   navMenu.querySelectorAll('a').forEach(link => {
//     link.addEventListener('click', () => {
//       navMenu.classList.remove('open');
//     });
//   });
// }

// const navToggle = document.getElementById("navToggle");
// const navOverlay = document.getElementById("navOverlay");

// navToggle.addEventListener("click", () => {
//   navToggle.classList.toggle("active");
//   navOverlay.classList.toggle("active");
//   document.body.classList.toggle("menu-open");
// });

// // Close menu when clicking a link
// document.querySelectorAll(".overlay-link").forEach(link => {
//   link.addEventListener("click", () => {
//     navToggle.classList.remove("active");
//     navOverlay.classList.remove("active");
//     document.body.classList.remove("menu-open");
//   });
// });