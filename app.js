// Smooth scrolling pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Effet de transparence sur le header au scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// Animation d'apparition au scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer les éléments à animer
document.querySelectorAll('.feature-card, .tech-content, .cta-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Animation du hero au chargement
window.addEventListener('load', () => {
    const heroContent = document.querySelector('.hero-content');
    const heroTitle = heroContent.querySelector('h1');
    const heroText = heroContent.querySelector('p');
    const heroButtons = heroContent.querySelector('.hero-buttons');

    heroTitle.style.animation = 'fadeInUp 1s ease-out';
    heroText.style.animation = 'fadeInUp 1s ease-out 0.2s both';
    heroButtons.style.animation = 'fadeInUp 1s ease-out 0.4s both';
});

// Effet de parallaxe subtil sur le hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const speed = scrolled * 0.5;
    hero.style.transform = `translateY(${speed}px)`;
});

// Gestion du menu mobile (si activé plus tard)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Compteur de stats (optionnel - à utiliser si vous ajoutez une section stats)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 200;
        let current = 0;

        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        updateCounter();
    });
}

// Événement au scroll pour déclencher les compteurs
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            counterObserver.unobserve(entry.target);
        }
    });
});

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mon Trajet - Site chargé avec succès !');
    
    // Vérifier si les animations CSS sont supportées
    if (CSS.supports('animation', 'fadeInUp')) {
        console.log('Animations CSS activées');
    }
});
// Vérification et chargement images
document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item, index) => {
        const img = new Image();
        img.onload = function() {
            // Image OK ✅
            item.style.backgroundImage = item.style.backgroundImage;
        };
        img.onerror = function() {
            // Image KO → Fallback
            const fallbacks = [
                'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&w=800&h=600&fit=crop&q=80',
                'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&w=800&h=600&fit=crop&q=80',
                'https://images.unsplash.com/photo-1518546305927-5a555f837def?ixlib=rb-4.0.3&w=800&h=600&fit=crop&q=80'
            ];
            item.style.backgroundImage = `url('${fallbacks[index % fallbacks.length]}')`;
        };
        img.src = getComputedStyle(item).backgroundImage.slice(5, -2);
    });
});