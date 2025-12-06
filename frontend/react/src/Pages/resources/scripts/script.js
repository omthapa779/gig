document.addEventListener('DOMContentLoaded', () => {
    console.log('Gig Landing Page Loaded');

    // 1. Initialize Lenis (Smooth Scrolling)
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // 2. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('shadow-md');
            navbar.classList.replace('py-4', 'py-2');
        } else {
            navbar.classList.remove('shadow-md');
            navbar.classList.replace('py-2', 'py-4');
        }
    });

    // Hero Section Animations (Staggered Fade In)
    gsap.to('.gsap-hero-element', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
    });

    // Infinite Marquee Animation
    // Hero Parallax Effect
    const heroSection = document.querySelector('section.relative');
    const heroElements = document.querySelectorAll('.gsap-hero-element');
    const heroSVG = document.getElementById('hero-svg');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX - window.innerWidth / 2) / 20;
            const y = (e.clientY - window.innerHeight / 2) / 20;

            // Move the main text elements slightly
            heroElements.forEach((el, index) => {
                const depth = (index + 1) * 0.5;
                gsap.to(el, {
                    x: x * depth,
                    y: y * depth,
                    duration: 1,
                    ease: 'power2.out'
                });
            });

            // Move the background SVG more significantly
            if (heroSVG) {
                gsap.to(heroSVG, {
                    x: -x * 2,
                    y: -y * 2,
                    duration: 1.5,
                    ease: 'power2.out'
                });
            }
        });
    }

    // --- NEW: Canvas Particle Network ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const particleCount = 80; // Number of particles

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            }

            draw() {
                ctx.fillStyle = 'rgba(100, 255, 218, 0.5)'; // Brand accent color
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            connectParticles();
            requestAnimationFrame(animateParticles);
        }

        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(100, 255, 218, ${1 - distance / 150})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }

        // Mouse interaction
        let mouse = { x: null, y: null };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.x;
            mouse.y = e.y;

            // Add a temporary particle at mouse position to connect lines
            // Ideally we'd integrate this into the loop, but for simplicity:
        });

        initParticles();
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        });
    }

    // --- NEW: Magnetic Buttons ---
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                x: x * 0.3, // Magnetic strength
                y: y * 0.3,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // --- NEW: Floating Images Animation ---
    gsap.to('.floating-img', {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });


    // Fade In Elements on Scroll
    const fadeElements = document.querySelectorAll('.gsap-fade-in');
    fadeElements.forEach(el => {
        gsap.to(el, {
            scrollTrigger: {
                trigger: el,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // Service Cards Stagger
    gsap.to('.gsap-service-card', {
        scrollTrigger: {
            trigger: '#services',
            start: 'top 75%',
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)'
    });

    // Features Left/Right Slide
    gsap.to('.gsap-fade-in-left', {
        scrollTrigger: {
            trigger: '#features',
            start: 'top 70%',
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.to('.gsap-fade-in-right', {
        scrollTrigger: {
            trigger: '#features',
            start: 'top 70%',
        },
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
    });

    // CTA Scale Up
    gsap.to('.gsap-scale-up', {
        scrollTrigger: {
            trigger: '.gsap-scale-up',
            start: 'top 85%',
        },
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1.5)'
    });

    // Smooth Scrolling for Anchor Links (delegated to Lenis)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                lenis.scrollTo(targetElement);
            }
        });
    });
});
