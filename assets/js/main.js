document.addEventListener("DOMContentLoaded", function() {
  // 1. Initialize Lenis Smooth Scroll (if Lenis library is present)
  let lenis = null;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis({
        lerp: 0.12, // Faster, snappier responsiveness
        gestureDirection: 'vertical',
        smoothWheel: true,
        smoothTouch: false, // Maintain native touch scrolling on mobile
        wheelMultiplier: 1.0
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Track scroll progress globally
    let scrollProgress = 0;
    lenis.on('scroll', (e) => {
        const totalScrollable = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = totalScrollable > 0 ? e.scroll / totalScrollable : 0;
        window.scrollProgress = scrollProgress; // Expose for particles-2d.js
    });

    // Make lenis globally accessible for programmatic scrolling
    window.lenis = lenis;

    // Smooth scroll for hash links using Lenis (WITH URL API FIX)
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
                // Fallback for malformed URLs
            }
        });
    });
  }

  // 2. Navigation Logic (Burger Menu, scroll indicators)
  const sections = document.querySelectorAll('section[id], div[id]');
  const navLinks = document.querySelectorAll('nav .nav-links a[data-section]');
  const nav = document.getElementById('main-nav');
  const burger = document.getElementById('burger-menu');
  const linksContainer = document.getElementById('nav-links');
  
  if (burger && linksContainer) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = linksContainer.classList.contains('open');
      linksContainer.classList.toggle('open', !isOpen);
      burger.classList.toggle('open', !isOpen);
      burger.setAttribute('aria-expanded', !isOpen);
    });

    document.addEventListener('click', (e) => {
      if (linksContainer.classList.contains('open') && !linksContainer.contains(e.target) && e.target !== burger) {
        linksContainer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
    
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        linksContainer.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Active section highlights via IntersectionObserver
  if (sections.length > 0 && navLinks.length > 0) {
    const navObs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          navLinks.forEach(a => {
            a.classList.toggle('nav-active', a.dataset.section === e.target.id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => navObs.observe(s));
  }

  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.borderBottomColor = window.scrollY > 10 ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)';
    }, { passive: true });
  }

  // 3. Scroll reveal animations (.r.in)
  const revealObs = new IntersectionObserver(e => {
    e.forEach(el => {
        if (el.isIntersecting) {
            el.target.classList.add('in');
            revealObs.unobserve(el.target);
        }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.r').forEach(el => revealObs.observe(el));

  // 4. Scroll UI Back-To-Top Button
  const scrollUi = document.getElementById('scroll-ui');
  if (scrollUi) {
    window.addEventListener('scroll', () => {
        const atBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100;
        const atTop = window.scrollY < 200;
        scrollUi.classList.toggle('si-end', atBottom);
        scrollUi.style.opacity = atTop ? '0' : '1';
        scrollUi.style.pointerEvents = atTop ? 'none' : 'auto';
    }, { passive: true });

    scrollUi.addEventListener('click', () => {
        if (scrollUi.classList.contains('si-end') && lenis) {
            lenis.scrollTo(0, { duration: 1.5 });
        }
    });
  }

  // 5. Side Scroll UI arrows (home page only)
  if (document.body.classList.contains('home')) {
    const leftArrow = document.getElementById('scroll-left');
    const rightArrow = document.getElementById('scroll-right');
    
    const homeSections = Array.from(document.querySelectorAll('.hero, #stack, .impact, #problema, #servicios, #clientes, #sobre-mi, #blog, #contacto'));
    const navOffset = 80;

    if (leftArrow && rightArrow) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            const atTop = currentScroll < 200;
            const atBottom = (window.innerHeight + currentScroll) >= document.body.offsetHeight - 100;
            
            leftArrow.style.opacity = atTop ? '0' : '1';
            leftArrow.style.pointerEvents = atTop ? 'none' : 'auto';
            
            rightArrow.style.opacity = atBottom ? '0' : '1';
            rightArrow.style.pointerEvents = atBottom ? 'none' : 'auto';
        }, { passive: true });

        const navigateToSection = (direction) => {
            const currentScroll = window.scrollY;
            const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
            
            if (direction === 'prev') {
                const prevSections = homeSections.filter(s => s.offsetTop - navOffset < currentScroll - 100);
                if (prevSections.length > 0 && lenis) {
                    const target = prevSections[prevSections.length - 1];
                    lenis.scrollTo(target, { offset: -navOffset, duration: 1.4, easing: easeOutExpo });
                } else if (lenis) {
                    lenis.scrollTo(0, { duration: 1.4, easing: easeOutExpo });
                }
            } else if (direction === 'next') {
                const nextSection = homeSections.find(s => s.offsetTop - navOffset > currentScroll + 100);
                if (nextSection && lenis) {
                    lenis.scrollTo(nextSection, { offset: -navOffset, duration: 1.4, easing: easeOutExpo });
                } else if (lenis) {
                    lenis.scrollTo(document.body.offsetHeight, { duration: 1.4, easing: easeOutExpo });
                }
            }
        };

        leftArrow.addEventListener('click', () => navigateToSection('prev'));
        rightArrow.addEventListener('click', () => navigateToSection('next'));
    }
  }

  // 6. Emergency Widget Delay Display
  setTimeout(() => {
    const label = document.getElementById('emergency-label');
    if (label) {
      label.style.opacity = '1';
      label.style.transform = 'translateX(0)';
    }
  }, 3000);

  // 7. Cookie Banner Consent
  const banner = document.getElementById('cookie-banner');
  const btnAccept = document.getElementById('btn-accept-cookies');
  const btnReject = document.getElementById('btn-reject-cookies');

  if (banner && btnAccept && btnReject) {
    if (!localStorage.getItem('solutech_cookie_consent')) {
      banner.style.display = 'block';
    }

    btnAccept.addEventListener('click', function() {
      localStorage.setItem('solutech_cookie_consent', 'granted');
      banner.style.display = 'none';
      if (typeof gtag === 'function') {
        gtag('consent', 'update', {
          'analytics_storage': 'granted',
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted'
        });
      }
    });

    btnReject.addEventListener('click', function() {
      localStorage.setItem('solutech_cookie_consent', 'denied');
      banner.style.display = 'none';
    });
  }
});
