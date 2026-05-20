const menuButton = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const form = document.querySelector("[data-contact-form]");
const note = document.querySelector("[data-form-note]");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Diagnostic pièce mécanique — ${company || name}`);
    const body = encodeURIComponent(
      [
        `Nom : ${name}`,
        `Entreprise : ${company || "Non précisée"}`,
        `Email : ${email}`,
        "",
        "Problème :",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:contact@minos-meca.fr?subject=${subject}&body=${body}`;
    note.textContent = "Un brouillon d’email vient d’être préparé avec les informations du formulaire.";
  });
}

const revealTargets = document.querySelectorAll("[data-reveal]");
if (revealTargets.length && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add("is-in"));
}
