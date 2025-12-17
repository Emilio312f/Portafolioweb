// ============================================
// MODERN PORTFOLIO - ULTRA CONTEMPORARY INTERACTIONS
// ============================================

// ========== LOADER ========== 
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);
});

// ========== CUSTOM CURSOR ========== 
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Cursor scale on hover
const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, input, textarea');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// ========== NAVIGATION ========== 
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Sticky navigation
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.padding = '1rem 0';
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        nav.style.padding = '2rem 0';
        nav.style.background = 'rgba(15, 23, 42, 0.8)';
    }
});

// Active section highlighting
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinksContainer?.classList.toggle('active');
});

// ========== GSAP ANIMATIONS ========== 

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero animations
gsap.from('.hero-label', {
    y: -30,
    opacity: 0,
    duration: 1,
    delay: 0.5
});

gsap.from('.title-small', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.7
});

// Typewriter effect for name
const nameElement = document.getElementById('nameTypewriter');
const rotatingTextElement = document.getElementById('rotatingText');

const name = 'Emilio Miguel Ramirez Noreiga';
const descriptions = [
    'Frontend: Angular & React',
    'Backend: PHP & Golang',
    'Desarrollo Full Stack moderno',
    'Creando aplicaciones escalables'
];

// Animación para el nombre
let nameCharIndex = 0;
let isNameDeleting = false;
let nameTypeSpeed = 100;

function typeWriterName() {
    if (!isNameDeleting) {
        // Escribiendo nombre
        nameElement.textContent = name.substring(0, nameCharIndex + 1);
        nameCharIndex++;
        
        if (nameCharIndex === name.length) {
            // Termino de escribir, esperar antes de borrar
            isNameDeleting = true;
            nameTypeSpeed = 2000; // Pausa
        } else {
            nameTypeSpeed = 80;
        }
    } else {
        // Borrando nombre
        nameElement.textContent = name.substring(0, nameCharIndex);
        nameCharIndex--;
        nameTypeSpeed = 50;
        
        if (nameCharIndex === 0) {
            isNameDeleting = false;
            nameTypeSpeed = 500; // Pausa antes de empezar a escribir de nuevo
        }
    }
    
    setTimeout(typeWriterName, nameTypeSpeed);
}

// Animación para las descripciones
let descIndex = 0;
let descCharIndex = 0;
let isDescDeleting = false;
let descTypeSpeed = 100;

function typeWriterDescription() {
    const currentDesc = descriptions[descIndex];
    
    if (!isDescDeleting) {
        // Escribiendo descripción
        rotatingTextElement.textContent = currentDesc.substring(0, descCharIndex + 1);
        descCharIndex++;
        
        if (descCharIndex === currentDesc.length) {
            // Termino de escribir, esperar antes de borrar
            isDescDeleting = true;
            descTypeSpeed = 2000; // Pausa
        } else {
            descTypeSpeed = 90;
        }
    } else {
        // Borrando descripción
        rotatingTextElement.textContent = currentDesc.substring(0, descCharIndex);
        descCharIndex--;
        descTypeSpeed = 40;
        
        if (descCharIndex === 0) {
            isDescDeleting = false;
            descIndex = (descIndex + 1) % descriptions.length; // Siguiente descripción
            descTypeSpeed = 500; // Pausa antes de empezar a escribir de nuevo
        }
    }
    
    setTimeout(typeWriterDescription, descTypeSpeed);
}

// Iniciar ambas animaciones después de las animaciones iniciales
setTimeout(() => {
    typeWriterName();
}, 1500);

setTimeout(() => {
    typeWriterDescription();
}, 1800);

gsap.from('.title-main', {
    y: 30,
    opacity: 0,
    scale: 0.95,
    duration: 1.2,
    delay: 0.9,
    ease: 'power3.out'
});

gsap.from('.hero-description', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 1.1
});

gsap.from('.hero-buttons .btn', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 1.3,
    stagger: 0.2
});

gsap.from('.hero-stats', {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 1.5
});

// Visual cards animation
gsap.from('.code-window', {
    scale: 0.9,
    opacity: 0,
    y: 40,
    duration: 1.2,
    delay: 1,
    ease: 'power3.out'
});

gsap.from('.floating-card', {
    scale: 0.8,
    opacity: 0,
    duration: 1,
    delay: 1.3,
    stagger: 0.2,
    ease: 'back.out(1.4)'
});

// Floating animation for cards
gsap.to('.achievement-card', {
    y: -15,
    duration: 3,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

gsap.to('.tech-stack-card', {
    y: -20,
    duration: 3.5,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

gsap.to('.code-window', {
    y: -10,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'power1.inOut'
});

// Scroll-triggered animations
const scrollElements = document.querySelectorAll('[data-scroll]');
scrollElements.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        },
        y: 60,
        opacity: 0,
        duration: 1
    });
});

// Section headers animation
const sectionHeaders = document.querySelectorAll('.section-header');
sectionHeaders.forEach(header => {
    gsap.from(header.querySelectorAll('.section-number, .section-title, .section-description'), {
        scrollTrigger: {
            trigger: header,
            start: 'top 80%'
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2
    });
});

// Projects animation with modern stagger
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%'
        },
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Removed 3D tilt animation
});

// ========== STATS COUNTER ========== 
const stats = document.querySelectorAll('[data-count]');
const observerOptions = {
    threshold: 0.5
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stat = entry.target;
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
            statsObserver.unobserve(stat);
        }
    });
}, observerOptions);

stats.forEach(stat => statsObserver.observe(stat));

// ========== SKILLS PROGRESS BARS ========== 
const skillBars = document.querySelectorAll('.skill-progress');

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const progress = bar.getAttribute('data-progress');
            
            setTimeout(() => {
                bar.style.width = progress + '%';
            }, 300);
            
            skillsObserver.unobserve(bar);
        }
    });
}, observerOptions);

skillBars.forEach(bar => skillsObserver.observe(bar));

// ========== FORM VALIDATION ========== 
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validación básica
    if (!data.nombre || !data.email || !data.mensaje) {
        showNotification('Por favor, completa todos los campos requeridos', 'error');
        return;
    }
    
    if (!isValidEmail(data.email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    // Simular envío
    const submitBtn = contactForm.querySelector('.btn-primary');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('¡Mensaje enviado exitosamente!', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showNotification(message, type) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#EF4444'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(notification);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== SCROLL INDICATOR ========== 
const scrollIndicator = document.querySelector('.scroll-indicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        gsap.to(scrollIndicator, {
            opacity: 0,
            duration: 0.3
        });
    } else {
        gsap.to(scrollIndicator, {
            opacity: 1,
            duration: 0.3
        });
    }
});

// ========== LOGO LINK ========== 
const logo = document.querySelector('.nav-logo');
logo?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== PROJECT SLIDER ==========
const initProjectSlider = () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        const slider = card.querySelector('.project-slider');
        if (!slider) return;
        
        const images = slider.querySelectorAll('.slider-image');
        const dots = slider.querySelectorAll('.dot');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        
        if (images.length <= 1) return; // Si solo hay 1 imagen, no hacer nada
        
        let currentIndex = 0;
        let autoplayInterval;
        
        const showSlide = (index) => {
            images.forEach(img => img.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            images[index].classList.add('active');
            dots[index].classList.add('active');
            currentIndex = index;
        };
        
        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % images.length;
            showSlide(nextIndex);
        };
        
        const prevSlide = () => {
            const prevIndex = (currentIndex - 1 + images.length) % images.length;
            showSlide(prevIndex);
        };
        
        const startAutoplay = () => {
            autoplayInterval = setInterval(nextSlide, 4000);
        };
        
        const stopAutoplay = () => {
            clearInterval(autoplayInterval);
        };
        
        // Event listeners
        prevBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });
        
        nextBtn?.addEventListener('click', (e) => {
            e.stopPropagation();
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                showSlide(index);
                stopAutoplay();
                startAutoplay();
            });
        });
        
        // Pausar en hover
        card.addEventListener('mouseenter', stopAutoplay);
        card.addEventListener('mouseleave', startAutoplay);
        
        // Iniciar autoplay
        startAutoplay();
    });
};

// Inicializar slider después de que cargue el DOM
setTimeout(initProjectSlider, 2000);

// ========== MAGNETIC BUTTONS ========== 
const magneticButtons = document.querySelectorAll('.btn');
magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
    
    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// ========== PARALLAX SCROLL ========== 
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const codeWindow = document.querySelector('.code-window');
    const floatingCards = document.querySelectorAll('.floating-card');
    
    if (codeWindow) {
        gsap.to(codeWindow, {
            y: scrolled * 0.3,
            duration: 0.5,
            ease: 'power1.out'
        });
    }
    
    floatingCards.forEach((card, index) => {
        gsap.to(card, {
            y: scrolled * (0.2 + index * 0.1),
            duration: 0.5,
            ease: 'power1.out'
        });
    });
});


// ========== FOOTER YEAR ========== 
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
}

console.log('🚀 Portfolio cargado exitosamente');
