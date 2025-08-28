document.addEventListener('DOMContentLoaded', () => {
    // Establecer tema claro por defecto
    document.documentElement.setAttribute('data-theme', 'light');
    
    // Efecto de typing para el texto de bienvenida
    const welcomeText = document.querySelector('.animated-text');
    if (welcomeText) {
        welcomeText.classList.add('typing-effect');
    }
    
    // Efecto de scroll suave para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Filtrado de habilidades
    const skillFilters = document.querySelectorAll('[data-skill-filter]');
    const skillCards = document.querySelectorAll('.skill-card');
    
    if (skillFilters.length > 0 && skillCards.length > 0) {
        skillFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Actualizar estado activo de los botones
                skillFilters.forEach(btn => btn.classList.remove('active'));
                filter.classList.add('active');
                
                const filterValue = filter.getAttribute('data-skill-filter');
                
                // Filtrar las tarjetas de habilidades
                skillCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    // Filtrado de proyectos del portafolio
    const portfolioFilters = document.querySelectorAll('[data-portfolio-filter]');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioFilters.length > 0 && portfolioItems.length > 0) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Actualizar estado activo de los filtros
                portfolioFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');
                
                const filterValue = filter.getAttribute('data-portfolio-filter');
                
                // Filtrar los proyectos
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
        
        // Efecto hover mejorado para proyectos
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.querySelector('.overlay').style.opacity = '1';
            });
            
            item.addEventListener('mouseleave', () => {
                item.querySelector('.overlay').style.opacity = '0';
            });
        });
    }
    
    // 1. Menú Hamburguesa
    const navbar = document.getElementById('navbar');
    const navList = navbar.querySelector('ul');
    const hamburger = document.createElement('div');
    hamburger.innerHTML = '<i class="bx bx-menu"></i>';
    hamburger.className = 'hamburger';
    navbar.appendChild(hamburger);

    hamburger.addEventListener('click', () => {
        navList.classList.toggle('show');
    });

    // 2. Mostrar/Ocultar Navbar al hacer scroll
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });

    // 3. Enviar datos a Google Forms silenciosamente
    const contactForm = document.getElementById('contact-form');
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    const notificationClose = document.getElementById('notification-close');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const subject = contactForm.querySelector('input[name="subject"]').value.trim();
        const type = contactForm.querySelector('select[name="type"]').value;
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();

        // Validaciones
        if (!name || !email || !phone || !subject || !type || !message) {
            showNotification('Por favor, completa todos los campos.', true);
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(name)) {
            showNotification('El nombre solo debe contener letras y espacios.', true);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Por favor, ingresa un correo electrónico válido.', true);
            return;
        }

        if (!/^\+?\d{9,12}$/.test(phone)) {
            showNotification('Por favor, ingresa un número de teléfono válido (ej. +51987654321).', true);
            return;
        }

        const formData = new FormData();
        formData.append('entry.687869695', name);
        formData.append('entry.1181229991', email);
        formData.append('entry.1450037853', phone);
        formData.append('entry.1459458064', subject);
        formData.append('entry.318520069', type);
        formData.append('entry.1051858607', message);

        try {
            const response = await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfNsVw3_vB9v1yBu1HUhsqn2DPBEglpqgpzAdpEswf8rYe8Kw/formResponse', {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });

            showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.');
            contactForm.reset();
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            showNotification('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.', true);
        }
    });

    // Función para mostrar notificaciones
    function showNotification(message, isError = false) {
        notificationMessage.textContent = message;
        notification.classList.toggle('error', isError);
        notification.classList.add('show');

        // Icono dinámico según el tipo de mensaje
        const icon = notification.querySelector('.notification-icon');
        icon.className = `bx ${isError ? 'bx-x-circle' : 'bx-check-circle'} notification-icon`;

        // Ocultar automáticamente después de 5 segundos
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
    
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });
    
    // Slider de testimonios
    const testimonialsTrack = document.querySelector('.testimonials-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dotsContainer = document.querySelector('.testimonials-dots');
    const prevButton = document.querySelector('.testimonial-arrow.prev');
    const nextButton = document.querySelector('.testimonial-arrow.next');
    
    if (testimonialsTrack && testimonialCards.length > 0) {
        let currentIndex = 0;
        const cardWidth = testimonialCards[0].offsetWidth;
        
        // Crear puntos indicadores
        testimonialCards.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('testimonial-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Función para ir a un slide específico
        function goToSlide(index) {
            currentIndex = index;
            testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            updateDots();
        }
        
        // Actualizar puntos indicadores
        function updateDots() {
            const dots = document.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        // Botones de navegación
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
            goToSlide(currentIndex);
        });
        
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            goToSlide(currentIndex);
        });
        
        // Auto-rotación
        let interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % testimonialCards.length;
            goToSlide(currentIndex);
        }, 5000);
        
        // Detener auto-rotación al interactuar
        const sliderContainer = document.querySelector('.testimonials-slider');
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                goToSlide(currentIndex);
            }, 5000);
        });
    }
    
    // Contadores animados para la sección de Estadísticas
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // Cuanto menor sea, más rápido
        
        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            animate();
        });
    }
    
    // Intersection Observer para la sección de Estadísticas
    const statsSection = document.querySelector('.Estadisticas');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }

    // Cerrar manualmente la notificación
    notificationClose.addEventListener('click', () => {
        notification.classList.remove('show');
    });

    // 4. Botón "Volver arriba"
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="bx bx-chevron-up"></i>';
    backToTopBtn.className = 'back-to-top';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 5. Efecto de revelación al hacer scroll
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});