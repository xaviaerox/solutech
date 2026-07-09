// Three.js Background Particles (Home page only, desktop screens > 768px)
if (document.body.classList.contains('home') && window.innerWidth > 768 && typeof THREE !== "undefined") {
    // Create canvas dynamically and prepend to body
    const canvas = document.createElement('canvas');
    canvas.id = 'three-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-2';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.45';
    canvas.style.mixBlendMode = 'screen';
    canvas.style.transform = 'translate3d(0,0,0)'; // GPU acceleration layer promotion
    canvas.style.willChange = 'transform';
    document.body.prepend(canvas);

    let scene, camera, renderer, points;
    const count = 75; // Soft floating particles
    const positions = new Float32Array(count * 3);
    const velocities = [];

    // Helper to generate a soft glowing circle texture
    function createCircleTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 16;
        canvas.height = 16;
        const ctx = canvas.getContext('2d');
        const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(232, 98, 26, 0.8)'); // Brand color
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 16, 16);
        return new THREE.CanvasTexture(canvas);
    }

    function initThree() {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 8;

        renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: false }); // Disable antialias for performance (particles are soft)
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(1);

        // Generate particles random positions and velocities
        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            positions[i3] = (Math.random() - 0.5) * 16;     // X
            positions[i3 + 1] = (Math.random() - 0.5) * 10; // Y
            positions[i3 + 2] = (Math.random() - 0.5) * 10; // Z

            velocities.push({
                x: (Math.random() - 0.5) * 0.003,
                y: (Math.random() - 0.5) * 0.003,
                z: (Math.random() - 0.5) * 0.003
            });
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            color: 0xe8621a, // Brand Orange
            size: 0.18, // soft glowing circle
            map: createCircleTexture(),
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            depthWrite: false // Performance optimization for transparent materials
        });

        points = new THREE.Points(geometry, material);
        scene.add(points);

        // Mouse interaction setup
        let mouseX = 0, mouseY = 0;
        let targetMouseX = 0, targetMouseY = 0;

        window.addEventListener('mousemove', (e) => {
            targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);

            // Update particle positions
            const posAttr = points.geometry.attributes.position;
            const pos = posAttr.array;

            for (let i = 0; i < count; i++) {
                const i3 = i * 3;
                pos[i3] += velocities[i].x;
                pos[i3 + 1] += velocities[i].y;
                pos[i3 + 2] += velocities[i].z;

                // Bound checks
                if (Math.abs(pos[i3]) > 10) velocities[i].x *= -1;
                if (Math.abs(pos[i3 + 1]) > 6) velocities[i].y *= -1;
                if (Math.abs(pos[i3 + 2]) > 6) velocities[i].z *= -1;
            }
            posAttr.needsUpdate = true;

            // Smooth mouse parallax
            mouseX += (targetMouseX - mouseX) * 0.05;
            mouseY += (targetMouseY - mouseY) * 0.05;

            points.rotation.y = mouseX * 0.15;
            points.rotation.x = -mouseY * 0.15;

            // Move and rotate camera with scroll progress (read from window.scrollProgress set by main.js)
            const scrollProgress = window.scrollProgress || 0;
            camera.position.y = -scrollProgress * 6;
            camera.position.z = 8 - scrollProgress * 3;
            camera.rotation.y = scrollProgress * 0.25;

            renderer.render(scene, camera);
        }

        animate();
    }

    initThree();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
