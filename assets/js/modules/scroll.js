/**
 * Scroll Module
 * Integrates Lenis Smooth Scroll, scroll progress tracking,
 * back-to-top button, and section side arrow controls.
 */
export function initScrollEffects() {
  let lenis = null;
  if (typeof window.Lenis !== "undefined") {
    lenis = new window.Lenis({
      lerp: 0.12,
      gestureDirection: "vertical",
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1.0
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    // Track scroll progress
    lenis.on("scroll", (e) => {
      const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollProgress = totalScrollable > 0 ? e.scroll / totalScrollable : 0;
    });

    window.lenis = lenis;

    // Smooth scroll for hash links using Lenis
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
      anchor.addEventListener("click", function(e) {
        try {
          const url = new URL(anchor.href, window.location.href);
          if (url.origin === window.location.origin && url.pathname === window.location.pathname) {
            const targetElement = document.querySelector(url.hash);
            if (targetElement) {
              e.preventDefault();
              lenis.scrollTo(targetElement, { offset: -80, duration: 1.2 });
            }
          }
        } catch (err) {
          // Fallback for malformed hash URLs
        }
      });
    });
  }

  // Scroll reveal animations (.r.in)
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        el.target.classList.add("in");
        revealObs.unobserve(el.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll(".r").forEach(el => revealObs.observe(el));

  // Back-To-Top Button
  const scrollUi = document.getElementById("scroll-ui");
  if (scrollUi) {
    window.addEventListener("scroll", () => {
      const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
      const atTop = window.scrollY < 200;
      scrollUi.classList.toggle("si-end", atBottom);
      scrollUi.style.opacity = atTop ? "0" : "1";
      scrollUi.style.pointerEvents = atTop ? "none" : "auto";
    }, { passive: true });

    scrollUi.addEventListener("click", () => {
      if (scrollUi.classList.contains("si-end") && lenis) {
        lenis.scrollTo(0, { duration: 1.5 });
      }
    });
  }

  // Side Scroll Arrows (Homepage)
  if (document.body.classList.contains("home")) {
    const leftArrow = document.getElementById("scroll-left");
    const rightArrow = document.getElementById("scroll-right");
    const homeSections = Array.from(document.querySelectorAll(".hero, #stack, .impact, #problema, #servicios, #clientes, #sobre-mi, #blog, #contacto"));
    const navOffset = 80;

    if (leftArrow && rightArrow) {
      window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        const atTop = currentScroll < 200;
        const atBottom = (window.innerHeight + currentScroll) >= document.body.offsetHeight - 100;

        leftArrow.style.opacity = atTop ? "0" : "1";
        leftArrow.style.pointerEvents = atTop ? "none" : "auto";

        rightArrow.style.opacity = atBottom ? "0" : "1";
        rightArrow.style.pointerEvents = atBottom ? "none" : "auto";
      }, { passive: true });

      const navigateToSection = (direction) => {
        const currentScroll = window.scrollY;
        const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

        if (direction === "prev") {
          const prevSections = homeSections.filter(s => s.offsetTop - navOffset < currentScroll - 100);
          if (prevSections.length > 0 && lenis) {
            const target = prevSections[prevSections.length - 1];
            lenis.scrollTo(target, { offset: -navOffset, duration: 1.4, easing: easeOutExpo });
          } else if (lenis) {
            lenis.scrollTo(0, { duration: 1.4, easing: easeOutExpo });
          }
        } else if (direction === "next") {
          const nextSection = homeSections.find(s => s.offsetTop - navOffset > currentScroll + 100);
          if (nextSection && lenis) {
            lenis.scrollTo(nextSection, { offset: -navOffset, duration: 1.4, easing: easeOutExpo });
          } else if (lenis) {
            lenis.scrollTo(document.body.offsetHeight, { duration: 1.4, easing: easeOutExpo });
          }
        }
      };

      leftArrow.addEventListener("click", () => navigateToSection("prev"));
      rightArrow.addEventListener("click", () => navigateToSection("next"));
    }
  }

  // Emergency Widget Delay Display
  setTimeout(() => {
    const label = document.getElementById("emergency-label");
    if (label) {
      label.style.opacity = "1";
      label.style.transform = "translateX(0)";
    }
  }, 3000);
}
