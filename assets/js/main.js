document.documentElement.classList.add("js");

const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

const whatsappMessage = encodeURIComponent(
  "Olá, gostaria de um orçamento para higienização de estofados em Campo Grande."
);
const whatsappUrl = `https://wa.me/5567991081241?text=${whatsappMessage}`;

document.querySelectorAll("[data-whatsapp]").forEach((link) => {
  link.setAttribute("href", whatsappUrl);
});

window.addEventListener("scroll", () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 8);
});

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", navLinks?.classList.contains("is-open") ? "true" : "false");
});

const observer = "IntersectionObserver" in window
  ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 })
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (observer) observer.observe(element);
  else element.classList.add("is-visible");
});

document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const text = encodeURIComponent(
      `Olá, gostaria de um orçamento para higienização de estofados em Campo Grande.

Nome: ${data.get("nome") || ""}
WhatsApp: ${data.get("whatsapp") || ""}
Serviço: ${data.get("servico") || ""}
Mensagem: ${data.get("mensagem") || ""}`
    );
    window.location.href = `https://wa.me/5567991081241?text=${text}`;
  });
});
