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

  // Funcionalidad para el enlace "Síguenos" en el footer
  const footerBrand = document.querySelector('.footer-brand');
  if (footerBrand) {
    // URL de la página de Facebook (la obtenemos del enlace existente)
    const facebookUrl = document.querySelector('.social-connection a')?.getAttribute('href') || 
                        "https://www.facebook.com/people/Inti-Churi/100057352064394/";
      // Crear un área clickeable para el texto "Síguenos"
    const siguenos = document.createElement('a');
    siguenos.href = facebookUrl;
    siguenos.target = "_blank";
    siguenos.style.position = "absolute";
    siguenos.style.bottom = "30px";
    siguenos.style.left = "0";
    siguenos.style.width = "100px"; // Aumentado para cubrir mejor el texto
    siguenos.style.height = "25px";
    siguenos.style.zIndex = "20";
    siguenos.style.opacity = "0";
    siguenos.style.cursor = "pointer"; // Mostrar cursor de mano al pasar por encima
    siguenos.title = "Visita nuestra página de Facebook";
    footerBrand.appendChild(siguenos);
      // Hacer que el ícono visual de Facebook también sea clickeable
    const facebookIcon = document.createElement('a');
    facebookIcon.href = facebookUrl;
    facebookIcon.target = "_blank";
    facebookIcon.style.position = "absolute";
    facebookIcon.style.bottom = "5px";
    facebookIcon.style.left = "0";
    facebookIcon.style.width = "24px";
    facebookIcon.style.height = "24px";
    facebookIcon.style.zIndex = "20";
    facebookIcon.style.opacity = "0";
    facebookIcon.style.cursor = "pointer"; // Mostrar cursor de mano al pasar por encima
    facebookIcon.title = "Visita nuestra página de Facebook";
    
    // También podemos añadir un efecto visual al pasar el mouse por encima
    facebookIcon.addEventListener('mouseover', () => {
      const beforeElement = window.getComputedStyle(footerBrand, '::before');
      if (beforeElement) {
        document.documentElement.style.setProperty('--facebook-hover-background', '#ff6600');
        document.documentElement.style.setProperty('--facebook-hover-color', 'white');
      }
    });
    
    facebookIcon.addEventListener('mouseout', () => {
      document.documentElement.style.setProperty('--facebook-hover-background', 'transparent');
      document.documentElement.style.setProperty('--facebook-hover-color', '#ff6600');
    });
    
    footerBrand.appendChild(facebookIcon);
    
    // Ajustar posiciones en pantallas pequeñas
    const adjustPositions = () => {
      if (window.innerWidth <= 768) {
        siguenos.style.left = "50%";
        siguenos.style.transform = "translateX(-50%)";
        facebookIcon.style.left = "50%";
        facebookIcon.style.transform = "translateX(-50%)";
      } else {
        siguenos.style.left = "0";
        siguenos.style.transform = "none";
        facebookIcon.style.left = "0";
        facebookIcon.style.transform = "none";
      }
    };
    
    // Ejecutar una vez al cargar y luego cada vez que se redimensione la ventana
    adjustPositions();
    window.addEventListener('resize', adjustPositions);
  }
});
