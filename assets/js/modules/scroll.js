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

  // Reading Progress Bar (for single blog posts & guides)
  const progressBar = document.getElementById("reading-progress-bar");
  const articleEl = document.querySelector(".blog-post-article");
  if (progressBar && articleEl) {
    const updateProgressBar = () => {
      const rect = articleEl.getBoundingClientRect();
      const articleHeight = rect.height;
      const windowHeight = window.innerHeight;
      const articleTop = rect.top;
      const totalDistance = articleHeight - windowHeight;
      if (totalDistance <= 0) {
        progressBar.style.width = "100%";
        return;
      }
      const scrolled = -articleTop;
      const pct = Math.min(100, Math.max(0, (scrolled / totalDistance) * 100));
      progressBar.style.width = `${pct}%`;
    };

    if (lenis) {
      lenis.on("scroll", updateProgressBar);
    } else {
      window.addEventListener("scroll", updateProgressBar, { passive: true });
    }
  }

  // Table of Contents Scrollspy
  const tocLinks = document.querySelectorAll(".blog-toc-widget #TableOfContents a, .blog-toc-mobile #TableOfContents a");
  const headings = document.querySelectorAll(".blog-content h2, .blog-content h3");
  if (tocLinks.length > 0 && headings.length > 0) {
    const headingObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          if (id) {
            tocLinks.forEach(link => {
              const href = link.getAttribute("href");
              if (href === `#${id}`) {
                link.classList.add("toc-active");
              } else {
                link.classList.remove("toc-active");
              }
            });
          }
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px" });

    headings.forEach(h => headingObserver.observe(h));
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
