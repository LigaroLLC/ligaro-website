// ==================== PARALLAX SCROLLING ==================== 
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const parallaxValue = element.getAttribute('data-parallax');
        const yOffset = scrollPosition * parallaxValue;
        
        // Apply parallax to background image if it exists
        const bgElement = element.querySelector('.hero-bg, .cta-bg, .approach-bg, .methodology-bg');
        if (bgElement) {
            bgElement.style.transform = `translateY(${yOffset}px)`;
        }
    });
});

// ==================== SMOOTH SCROLLING ==================== 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== MOBILE MENU TOGGLE ==================== 
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
if (navMenu) {
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
            if (hamburger) hamburger.classList.remove('active');
        });
    });
}

// ==================== ACTIVE NAV LINK ==================== 
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        link.classList.remove('active');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

// ==================== CONTACT FORM HANDLING ==================== 
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Collect form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'),
            company: formData.get('company'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            stage: formData.get('stage'),
            message: formData.get('message'),
            timestamp: new Date().toISOString()
        };
        
        // Log form data (in production, this would send to a backend or email service)
        console.log('Form submitted:', data);
        
        // Show success message
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = '✓ Message Received!';
        submitButton.style.backgroundColor = '#28a745';
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
        }, 3000);
        
        // In production, you would send this data to your backend:
        // try {
        //     const response = await fetch('/api/contact', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(data)
        //     });
        //     if (response.ok) {
        //         // Handle success
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
    });
}

// ==================== SCROLL ANIMATIONS ==================== 
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .service-card, .mission-card, .phase').forEach(el => {
    observer.observe(el);
});

// ==================== NAVBAR BACKGROUND ON SCROLL ==================== 
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.pageYOffset > 50) {
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
});

// ==================== FORM FIELD VALIDATION ==================== 
const inputs = document.querySelectorAll('input, select, textarea');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.required && !input.value) {
            input.style.borderColor = '#dc3545';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
});

// ==================== FADE IN ON LOAD ==================== 
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});