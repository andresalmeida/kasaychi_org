/* Toggle icon navbar */
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
  };
}

/* Scroll section active link */
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
  sections.forEach(sec => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute('id');

    if (top >= offset && top < offset + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });

  const header = document.querySelector('header');
  if (header) {
    header.classList.toggle('sticky', window.scrollY > 100);
  }

  if (menuIcon && navbar) {
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
  }
};

/* ScrollReveal animations */
if (typeof ScrollReveal !== 'undefined') {
  ScrollReveal({
    distance: '80px',
    duration: 800,
    delay: 200,
  });

  ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
  ScrollReveal().reveal('.home-img, .services-container, .portafolio-box, .contact form', { origin: 'bottom' });
  ScrollReveal().reveal('.home-contact h1, .about-img', { origin: 'left' });
  ScrollReveal().reveal('.home-contact p, .about-content', { origin: 'right' });
}

/* Typed.js animation */
const typedElement = document.querySelector('.multiple-text');
if (typedElement && typeof Typed !== 'undefined') {
  new Typed('.multiple-text', {
    strings: ['Software engineering student'],
    typeSpeed: 90,
    backSpeed: 90,
    backDelay: 1000,
    loop: true,
  });
}

/* Multimedia switching */
function changeMainVideo(videoSrc) {
  const mainDisplay = document.getElementById('main-display');
  const mainVideo = document.getElementById('main-video');
  const videoSource = document.getElementById('video-source');

  if (mainDisplay && mainVideo && videoSource) {
    mainDisplay.style.display = 'none';
    videoSource.src = videoSrc;
    mainVideo.load();
    mainVideo.style.display = 'block';
  }
}

function changeMainImage(imageSrc) {
  const mainDisplay = document.getElementById('main-display');
  const mainVideo = document.getElementById('main-video');

  if (mainDisplay && mainVideo) {
    mainVideo.style.display = 'none';
    mainDisplay.src = imageSrc;
    mainDisplay.style.display = 'block';
  }
}

/* Modales */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-open]").forEach(button => {
    button.addEventListener("click", event => {
      event.preventDefault();
      const modalId = button.getAttribute("data-open");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "block";
    });
  });

  document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-close");
      const modal = document.getElementById(modalId);
      if (modal) modal.style.display = "none";
    });
  });

  window.addEventListener("click", event => {
    document.querySelectorAll(".modal").forEach(modal => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
  });
  
});
