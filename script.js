// ===================================
// Modern Portfolio - JavaScript
// Featuring: Shader Gradients, Animations, Interactivity
// ===================================

// ===================================
// Shader Gradient Background
// Enhanced with Spline-inspired 3D effects and mouse interaction
// ===================================
class GradientCanvas {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.time = 0;
        this.mouseX = 0.5;
        this.mouseY = 0.5;
        this.colors = [
            { r: 99, g: 102, b: 241 },   // Primary
            { r: 236, g: 72, b: 153 },   // Secondary
            { r: 245, g: 158, b: 11 },   // Accent
            { r: 16, g: 185, b: 129 },   // Success
        ];
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX / window.innerWidth;
            this.mouseY = e.clientY / window.innerHeight;
        });
        
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    drawGradient() {
        const { width, height } = this.canvas;
        const imageData = this.ctx.createImageData(width, height);
        const data = imageData.data;
        
        for (let y = 0; y < height; y += 2) {
            for (let x = 0; x < width; x += 2) {
                const index = (y * width + x) * 4;
                
                // Create animated gradient pattern with mouse interaction
                const mouseInfluence = 0.3;
                const wave1 = Math.sin(x * 0.003 + this.time * 0.5 + this.mouseX * mouseInfluence * 3) * 0.5 + 0.5;
                const wave2 = Math.cos(y * 0.003 + this.time * 0.3 + this.mouseY * mouseInfluence * 3) * 0.5 + 0.5;
                const wave3 = Math.sin((x + y) * 0.002 + this.time * 0.4) * 0.5 + 0.5;
                const wave4 = Math.cos((x - y) * 0.0015 + this.time * 0.2) * 0.5 + 0.5;
                
                // Mix colors based on waves (Shader-like effect)
                const r = (this.colors[0].r * wave1 + this.colors[1].r * wave2 + this.colors[2].r * wave3 + this.colors[3].r * wave4) / 2;
                const g = (this.colors[0].g * wave1 + this.colors[1].g * wave2 + this.colors[2].g * wave3 + this.colors[3].g * wave4) / 2;
                const b = (this.colors[0].b * wave1 + this.colors[1].b * wave2 + this.colors[2].b * wave3 + this.colors[3].b * wave4) / 2;
                
                data[index] = r / 2.5;
                data[index + 1] = g / 2.5;
                data[index + 2] = b / 2.5;
                data[index + 3] = 255;
                
                // Fill neighboring pixels for performance
                if (x + 1 < width) {
                    const nextIndex = (y * width + (x + 1)) * 4;
                    data[nextIndex] = data[index];
                    data[nextIndex + 1] = data[index + 1];
                    data[nextIndex + 2] = data[index + 2];
                    data[nextIndex + 3] = 255;
                }
                
                if (y + 1 < height) {
                    const belowIndex = ((y + 1) * width + x) * 4;
                    data[belowIndex] = data[index];
                    data[belowIndex + 1] = data[index + 1];
                    data[belowIndex + 2] = data[index + 2];
                    data[belowIndex + 3] = 255;
                }
                
                if (x + 1 < width && y + 1 < height) {
                    const diagIndex = ((y + 1) * width + (x + 1)) * 4;
                    data[diagIndex] = data[index];
                    data[diagIndex + 1] = data[index + 1];
                    data[diagIndex + 2] = data[index + 2];
                    data[diagIndex + 3] = 255;
                }
            }
        }
        
        this.ctx.putImageData(imageData, 0, 0);
    }
    
    animate() {
        this.time += 0.01;
        this.drawGradient();
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Typing Effect
// ===================================
class TypeWriter {
    constructor(element, texts, typingSpeed = 100, deletingSpeed = 50, delayBetween = 2000) {
        this.element = element;
        this.texts = texts;
        this.typingSpeed = typingSpeed;
        this.deletingSpeed = deletingSpeed;
        this.delayBetween = delayBetween;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.textIndex];
        
        if (this.isDeleting) {
            this.charIndex--;
            this.element.textContent = currentText.substring(0, this.charIndex);
        } else {
            this.charIndex++;
            this.element.textContent = currentText.substring(0, this.charIndex);
        }
        
        let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            speed = this.delayBetween;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            speed = 500;
        }
        
        setTimeout(() => this.type(), speed);
    }
}

// ===================================
// Navigation
// ===================================
class Navigation {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });
        
        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
                
                // Update active link
                this.navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
        
        // Update active link on scroll
        window.addEventListener('scroll', () => this.updateActiveLink());
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===================================
// Scroll Animations
// ===================================
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-scroll]');
        this.init();
    }
    
    init() {
        this.observeElements();
        window.addEventListener('scroll', () => this.checkElements());
        // Initial check
        this.checkElements();
    }
    
    observeElements() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scrolled');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        
        this.elements.forEach(element => observer.observe(element));
    }
    
    checkElements() {
        this.elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('scrolled');
            }
        });
    }
}

// ===================================
// Skills Animation
// ===================================
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.dataset.progress;
                    entry.target.style.width = `${progress}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        this.skillBars.forEach(bar => observer.observe(bar));
    }
}

// ===================================
// Particle System around Hero Image
// Spline-inspired particle effects
// ===================================
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.maxParticles = 30;
        this.resize();
        
        window.addEventListener('resize', () => this.resize());
        this.init();
        this.animate();
    }
    
    resize() {
        const wrapper = this.canvas.parentElement;
        if (wrapper) {
            this.canvas.width = wrapper.offsetWidth;
            this.canvas.height = wrapper.offsetHeight;
        }
    }
    
    init() {
        for (let i = 0; i < this.maxParticles; i++) {
            this.particles.push(this.createParticle());
        }
    }
    
    createParticle() {
        const { width, height } = this.canvas;
        return {
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 3 + 1,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.2,
            color: ['#6366f1', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 3)]
        };
    }
    
    animate() {
        const { width, height } = this.canvas;
        this.ctx.clearRect(0, 0, width, height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = width;
            if (particle.x > width) particle.x = 0;
            if (particle.y < 0) particle.y = height;
            if (particle.y > height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.strokeStyle = particle.color;
                        this.ctx.globalAlpha = (1 - distance / 100) * 0.2;
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            });
        });
        
        this.ctx.globalAlpha = 1;
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// 3D Card Tilt Effect (Spline-inspired)
// ===================================
class CardTilt {
    constructor() {
        this.cards = document.querySelectorAll('[data-card-3d]');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => this.handleMove(e, card));
            card.addEventListener('mouseleave', () => this.handleLeave(card));
        });
    }
    
    handleMove(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        
        // Move glow effect
        const glow = card.querySelector('.card-glow');
        if (glow) {
            glow.style.left = `${(x / rect.width) * 100}%`;
            glow.style.top = `${(y / rect.height) * 100}%`;
        }
    }
    
    handleLeave(card) {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }
}

// ===================================
// Project Card Tilt (Rive-inspired)
// ===================================
class ProjectTilt {
    constructor() {
        this.projects = document.querySelectorAll('[data-tilt-project]');
        this.init();
    }
    
    init() {
        this.projects.forEach(project => {
            project.addEventListener('mousemove', (e) => this.handleMove(e, project));
            project.addEventListener('mouseleave', () => this.handleLeave(project));
        });
    }
    
    handleMove(e, project) {
        const rect = project.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 20;
        const rotateX = (centerY - y) / 20;
        
        project.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    }
    
    handleLeave(project) {
        project.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    }
}

// ===================================
// Floating Icon Tilt (Icons8-inspired)
// ===================================
class IconTilt {
    constructor() {
        this.icons = document.querySelectorAll('[data-tilt]');
        this.init();
    }
    
    init() {
        this.icons.forEach(icon => {
            icon.addEventListener('mouseenter', (e) => this.handleEnter(icon));
            icon.addEventListener('mouseleave', () => this.handleLeave(icon));
        });
    }
    
    handleEnter(icon) {
        icon.style.transform = 'scale(1.2) rotate(10deg)';
    }
    
    handleLeave(icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
    }
}

// ===================================
// Contact Form
// ===================================
class ContactForm {
    constructor(formId) {
        this.form = document.getElementById(formId);
        if (!this.form) return;
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show success message
        this.showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Reset form
        this.form.reset();
        
        // Log form data (in production, send to backend)
        console.log('Form Data:', data);
    }
    
    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `form-message form-message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            border-radius: 0.5rem;
            background: ${type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
            color: ${type === 'success' ? '#10b981' : '#ef4444'};
            border: 1px solid ${type === 'success' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'};
            animation: fadeInUp 0.5s ease-out;
        `;
        
        // Remove existing message if any
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Add message
        this.form.appendChild(messageEl);
        
        // Remove after 5 seconds
        setTimeout(() => {
            messageEl.style.opacity = '0';
            setTimeout(() => messageEl.remove(), 300);
        }, 5000);
    }
}

// ===================================
// Smooth Scroll
// ===================================
class SmoothScroll {
    constructor() {
        this.init();
    }
    
    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===================================
// Particle Cursor Effect (Optional)
// ===================================
class ParticleCursor {
    constructor() {
        this.particles = [];
        this.maxParticles = 15;
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            this.createParticle();
        });
        
        this.animate();
    }
    
    createParticle() {
        if (this.particles.length >= this.maxParticles) {
            this.particles.shift()?.element.remove();
        }
        
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.style.cssText = `
            position: fixed;
            width: 5px;
            height: 5px;
            background: linear-gradient(135deg, #6366f1, #ec4899);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${this.mouse.x}px;
            top: ${this.mouse.y}px;
            opacity: 1;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(particle);
        
        this.particles.push({
            element: particle,
            x: this.mouse.x,
            y: this.mouse.y,
            life: 1
        });
    }
    
    animate() {
        this.particles.forEach((particle, index) => {
            particle.life -= 0.02;
            particle.element.style.opacity = particle.life;
            particle.element.style.transform = `translate(-50%, -50%) scale(${particle.life})`;
            
            if (particle.life <= 0) {
                particle.element.remove();
                this.particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize shader gradient background
    new GradientCanvas('gradient-canvas');
    
    // Initialize particle system around hero image
    new ParticleSystem('particle-canvas');
    
    // Initialize typing effect
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        new TypeWriter(typingElement, [
            'Software Developer',
            'Full-Stack Developer',
            'Front-End Developer',
            'Application Developer',
            'Angular Expert',
            'React Developer',
            'Node.js Specialist',
            'Cloud Architect'
        ]);
    }
    
    // Initialize navigation
    new Navigation();
    
    // Initialize scroll animations
    new ScrollAnimations();
    
    // Initialize skills animation
    new SkillsAnimation();
    
    // Initialize contact form
    new ContactForm('contact-form');
    
    // Initialize smooth scroll
    new SmoothScroll();
    
    // Initialize 3D card effects (Spline-inspired)
    new CardTilt();
    
    // Initialize project tilt effects (Rive-inspired)
    new ProjectTilt();
    
    // Initialize icon tilt effects (Icons8-inspired)
    new IconTilt();
    
    // Initialize GSAP ScrollTrigger animations if available
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Animate sections on scroll
        gsap.utils.toArray('.section-header').forEach(section => {
            gsap.from(section, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1
            });
        });
    }
    
    // Initialize particle cursor (optional - can be disabled for performance)
    // new ParticleCursor();
    
    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// ===================================
// Performance Optimizations
// ===================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// ===================================
// Theme Toggle (Optional Feature)
// ===================================
class ThemeToggle {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }
    
    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Create toggle button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        toggleBtn.style.cssText = `
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient-primary);
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
            box-shadow: var(--shadow-xl);
            z-index: 1000;
            transition: var(--transition-base);
            display: none; /* Hidden by default - can be enabled */
        `;
        
        toggleBtn.addEventListener('click', () => this.toggle());
        document.body.appendChild(toggleBtn);
        
        this.toggleBtn = toggleBtn;
    }
    
    toggle() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        
        this.toggleBtn.innerHTML = this.theme === 'dark' 
            ? '<i class="fas fa-moon"></i>' 
            : '<i class="fas fa-sun"></i>';
    }
}

// Uncomment to enable theme toggle
// new ThemeToggle();

// ===================================
// Project Category Filter
// ===================================
class ProjectFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projects = document.querySelectorAll('.project-card');
        if (this.filterBtns.length === 0) return;
        this.init();
    }

    init() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active button
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter projects
                this.projects.forEach(project => {
                    const category = project.dataset.category;
                    
                    if (filter === 'all' || category === filter) {
                        project.classList.remove('filter-hidden');
                        project.classList.add('filter-visible');
                        project.style.display = '';
                    } else {
                        project.classList.remove('filter-visible');
                        project.classList.add('filter-hidden');
                    }
                });
            });
        });
    }
}

// ===================================
// Stats Counter Animation
// ===================================
class StatsCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number[data-count]');
        if (this.stats.length === 0) return;
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.stats.forEach(stat => observer.observe(stat));
    }

    animateCount(element) {
        const target = parseInt(element.dataset.count);
        const duration = 1500;
        const start = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            
            element.textContent = current + '+';
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }
}

// Initialize Project Filter and Stats
document.addEventListener('DOMContentLoaded', () => {
    new ProjectFilter();
    new StatsCounter();
});

// ===================================
// Console Message
// ===================================
console.log('%c👋 Welcome to Atul\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cInterested in the code? Check it out on GitHub!', 'font-size: 14px; color: #ec4899;');
