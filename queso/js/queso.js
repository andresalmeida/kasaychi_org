// JavaScript específico para la página de Inti Churi Queso

document.addEventListener("DOMContentLoaded", function () {
  // Animaciones en scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  }, observerOptions);

  // Observar elementos para animación
  const animateElements = document.querySelectorAll(
    ".variedad-card, .tradicion-card, .feature-item, .about-image"
  );
  animateElements.forEach((el) => observer.observe(el));

  // Efecto parallax en hero
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background img");

    if (heroBackground) {
      const rate = scrolled * -0.5;
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
  });

  // Smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Contador animado para estadísticas
  function animateCounters() {
    const counters = document.querySelectorAll(".stat h3");

    counters.forEach((counter) => {
      const target = parseInt(counter.textContent.replace(/\D/g, ""));
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target + "+";
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current) + "+";
        }
      }, 16);
    });
  }

  // Activar contador cuando sea visible
  const statsSection = document.querySelector(".about-stats");
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          statsObserver.unobserve(entry.target);
        }
      });
    });

    statsObserver.observe(statsSection);
  }

  // Modal para vista rápida de productos
  const quickViewButtons = document.querySelectorAll(".btn-quick-view");

  quickViewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const card = this.closest(".variedad-card");
      const title = card.querySelector(".variedad-titulo").textContent;
      const description = card.querySelector(
        ".variedad-descripcion"
      ).textContent;
      const image = card.querySelector(".variedad-imagen img").src;

      // Crear modal (implementación básica)
      showProductModal(title, description, image);
    });
  });

  function showProductModal(title, description, image) {
    // Crear modal dinámicamente
    const modal = document.createElement("div");
    modal.className = "product-modal";
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(5px);
        `;

    modal.innerHTML = `
            <div class="modal-content" style="
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                position: relative;
                animation: slideInUp 0.3s ease-out;
            ">
                <span class="modal-close" style="
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                    z-index: 1;
                ">&times;</span>
                <img src="${image}" alt="${title}" style="
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    border-radius: 12px 12px 0 0;
                ">
                <div style="padding: 20px;">
                    <h3 style="
                        color: #333;
                        margin-bottom: 15px;
                        font-size: 1.5rem;
                    ">${title}</h3>
                    <p style="
                        color: #666;
                        line-height: 1.6;
                        margin-bottom: 20px;
                    ">${description}</p>
                    <div class="modal-actions">
                        <a href="#contacto" class="cta-button primary" style="
                            display: inline-flex;
                            align-items: center;
                            gap: 0.5rem;
                            background: linear-gradient(135deg, #ff6600, #ff8533);
                            color: white;
                            padding: 12px 24px;
                            border-radius: 8px;
                            text-decoration: none;
                            font-weight: 600;
                            transition: transform 0.3s ease;
                        ">
                            <i class="fab fa-whatsapp"></i> Hacer Pedido
                        </a>
                    </div>
                </div>
            </div>
        `;

    document.body.appendChild(modal);

    // Cerrar modal
    const closeBtn = modal.querySelector(".modal-close");
    closeBtn.addEventListener("click", () => {
      modal.style.animation = "fadeOut 0.3s ease-in";
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 300);
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.animation = "fadeOut 0.3s ease-in";
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 300);
      }
    });
  }

  // Integración con WhatsApp
  function sendWhatsAppMessage(productName = "") {
    const phoneNumber = "593XXXXXXXX"; // Reemplazar con número real
    let message =
      "¡Hola! Me interesa obtener más información sobre los quesos Inti Churi.";

    if (productName) {
      message += ` Específicamente sobre: ${productName}`;
    }

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  }

  // Agregar funcionalidad WhatsApp a botones
  document.querySelectorAll(".btn-pedido").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const productCard = btn.closest(".variedad-card");
      const productName = productCard
        ? productCard.querySelector(".variedad-titulo").textContent
        : "";
      sendWhatsAppMessage(productName);
    });
  });

  // Agregar estilos de animación
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(50px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeOut {
            from {
                opacity: 1;
            }
            to {
                opacity: 0;
            }
        }
        
        .animate {
            animation: fadeInUp 0.8s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
  document.head.appendChild(style);

  console.log("Página de Inti Churi Queso cargada correctamente");
});
