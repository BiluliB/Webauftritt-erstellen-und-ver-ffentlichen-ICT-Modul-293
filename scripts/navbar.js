// Toggle für das Burger-Menü
document.addEventListener("DOMContentLoaded", function () {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".inner-nav");

  burger.addEventListener("click", function () {
    nav.classList.toggle("active");
    burger.textContent = nav.classList.contains("active") ? "✕" : "☰";
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && nav.classList.contains("active")) {
      nav.classList.remove("active");
      burger.textContent = "☰";
    }
  });

  // Setze die `active` Klasse basierend auf der aktuellen URL
  const navLinks = document.querySelectorAll(".inner-nav a");
  const currentUrl =
    window.location.pathname === "/" ? "/index.html" : window.location.pathname;

  navLinks.forEach((link) => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentUrl) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
