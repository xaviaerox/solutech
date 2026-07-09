// 2D Canvas Background Particles (Home page only, screens > 768px)
if (document.body.classList.contains("home") && window.innerWidth > 768) {
  const canvas = document.createElement("canvas");
  canvas.id = "particles-canvas";
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  canvas.style.zIndex = "-2";
  canvas.style.pointerEvents = "none";
  canvas.style.opacity = "0.4";
  canvas.style.mixBlendMode = "screen";
  canvas.style.transform = "translate3d(0,0,0)";
  canvas.style.willChange = "transform";
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  const particles = [];
  const count = 65; // Soft floating particles

  // Mouse interaction state
  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;

  window.addEventListener("mousemove", (e) => {
    targetMouseX = (e.clientX / window.innerWidth - 0.5) * 40; // max parallax offset
    targetMouseY = (e.clientY / window.innerHeight - 0.5) * 40;
  });

  // Particle Class
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height; // initial random y spread
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100; // start just below screen
      this.size = Math.random() * 8 + 4; // size diameter (4px to 12px)
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.speedY = -(Math.random() * 0.3 + 0.15); // floating upwards
      this.opacity = Math.random() * 0.4 + 0.2;
      this.maxOpacity = this.opacity;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap-around or reset when out of bounds
      if (this.y < -20 || this.x < -20 || this.x > width + 20) {
        this.reset();
      }
    }

    draw(scrollOffset, parallaxX, parallaxY) {
      // Apply mouse parallax and scroll offset (simulating depth)
      const renderX = this.x + parallaxX * (this.size * 0.08);
      const renderY = this.y - scrollOffset * (this.size * 0.15) + parallaxY * (this.size * 0.08);

      // Simple screen bounds check for rendering
      if (renderY < -50 || renderY > height + 50) return;

      const gradient = ctx.createRadialGradient(
        renderX,
        renderY,
        0,
        renderX,
        renderY,
        this.size
      );
      
      // Brand color glowing gradient (#e8621a)
      gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
      gradient.addColorStop(0.3, `rgba(232, 98, 26, ${this.opacity * 0.8})`);
      gradient.addColorStop(1, "rgba(7, 7, 11, 0)");

      ctx.beginPath();
      ctx.fillStyle = gradient;
      ctx.arc(renderX, renderY, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Populate particles list
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    ctx.clearRect(0, 0, width, height);

    // Smooth parallax interpolation
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    // Get current scroll from window
    const currentScroll = window.scrollY || 0;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.update();
      p.draw(currentScroll, mouseX, mouseY);
    }
  }

  animate();

  // Resize canvas handler
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });
}
