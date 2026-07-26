/**
 * Navigation Module
 * Handles mobile burger menu toggle, click-outside dismissal,
 * and section active state via IntersectionObserver.
 */
export function initNavigation() {
  const sections = document.querySelectorAll("section[id], div[id]");
  const navLinks = document.querySelectorAll("nav .nav-links a[data-section]");
  const nav = document.getElementById("main-nav");
  const burger = document.getElementById("burger-menu");
  const linksContainer = document.getElementById("nav-links");

  if (burger && linksContainer) {
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = linksContainer.classList.contains("open");
      linksContainer.classList.toggle("open", !isOpen);
      burger.classList.toggle("open", !isOpen);
      burger.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", (e) => {
      if (linksContainer.classList.contains("open") && !linksContainer.contains(e.target) && e.target !== burger) {
        linksContainer.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        linksContainer.classList.remove("open");
        burger.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Active section highlights via IntersectionObserver
  if (sections.length > 0 && navLinks.length > 0) {
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle("nav-active", a.dataset.section === e.target.id);
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(s => navObs.observe(s));
  }

  if (nav) {
    window.addEventListener("scroll", () => {
      nav.style.borderBottomColor = window.scrollY > 10 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.07)";
    }, { passive: true });
  }
}
