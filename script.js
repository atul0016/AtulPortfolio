// ===================================
// Professional Portfolio — Minimal JavaScript
// Only essential interactivity, no heavy animations
// ===================================

// ===================================
// Typing Effect (kept — lightweight and professional)
// ===================================
class TypeWriter {
    constructor(element, texts, typingSpeed = 80, deletingSpeed = 40, delayBetween = 2500) {
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
        } else {
            this.charIndex++;
        }

        this.element.textContent = currentText.substring(0, this.charIndex);

        let speed = this.isDeleting ? this.deletingSpeed : this.typingSpeed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            speed = this.delayBetween;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
            speed = 400;
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
        window.addEventListener('scroll', () => {
            this.navbar.classList.toggle('scrolled', window.scrollY > 20);
            this.updateActiveLink();
        });

        this.hamburger.addEventListener('click', () => {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        });

        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.hamburger.classList.remove('active');
                this.navMenu.classList.remove('active');
            });
        });
    }

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollY >= top && scrollY < top + height) {
                this.navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }
}

// ===================================
// Scroll Reveal — simple IntersectionObserver
// ===================================
class ScrollReveal {
    constructor() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scrolled');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

        document.querySelectorAll('[data-scroll]').forEach(el => observer.observe(el));
    }
}

// ===================================
// Skills Progress Bars
// ===================================
class SkillsAnimation {
    constructor() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.width = `${entry.target.dataset.progress}%`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.skill-progress').forEach(bar => observer.observe(bar));
    }
}

// ===================================
// Project Category Filter
// ===================================
class ProjectFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projects = document.querySelectorAll('.project-card');
        if (this.filterBtns.length === 0) return;

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                this.projects.forEach(project => {
                    const category = project.dataset.category;
                    if (filter === 'all' || category === filter) {
                        project.classList.remove('filter-hidden');
                        project.style.display = '';
                    } else {
                        project.classList.add('filter-hidden');
                    }
                });
            });
        });
    }
}

// ===================================
// Stats Counter
// ===================================
class StatsCounter {
    constructor() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-number[data-count]').forEach(stat => observer.observe(stat));
    }

    animateCount(el) {
        const target = parseInt(el.dataset.count);
        const duration = 1200;
        const start = performance.now();

        const update = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + '+';
            if (progress < 1) requestAnimationFrame(update);
        };

        requestAnimationFrame(update);
    }
}

// ===================================
// Contact Form
// ===================================
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (!this.form) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = Object.fromEntries(new FormData(this.form));
            console.log('Form Data:', data);

            const msg = document.createElement('div');
            msg.textContent = 'Message sent successfully! I\'ll get back to you soon.';
            msg.style.cssText = `
                margin-top: 1rem; padding: 0.875rem; border-radius: 8px;
                background: #f0fdf4; color: #16a34a; border: 1px solid #bbf7d0;
                font-size: 0.9rem;
            `;

            const existing = this.form.querySelector('.form-message');
            if (existing) existing.remove();
            msg.className = 'form-message';
            this.form.appendChild(msg);
            this.form.reset();

            setTimeout(() => msg.remove(), 5000);
        });
    }
}

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
        }
    });
});

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
    new ScrollReveal();
    new SkillsAnimation();
    new ProjectFilter();
    new StatsCounter();
    new ContactForm();

    const typingEl = document.querySelector('.typing-text');
    if (typingEl) {
        new TypeWriter(typingEl, [
            'Software Developer',
            'Full-Stack Developer',
            'Application Developer',
            'Angular Expert',
        ]);
    }
});
