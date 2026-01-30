// Theme Switching
const themeToggle = document.getElementById('theme-toggle');
const isMobileOrTablet = window.innerWidth < 992; // Tablet/Mobile threshold

// Default logic: Force dark on mobile/tablet, otherwise use storage or light
let initialTheme = localStorage.getItem('theme');

if (isMobileOrTablet) {
    initialTheme = 'dark';
} else if (!initialTheme) {
    initialTheme = 'light';
}

// Apply theme immediately
document.documentElement.setAttribute('data-theme', initialTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Sticky Navigation
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const scrollReveal = () => {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        const revealTop = element.getBoundingClientRect().top;

        if (revealTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', scrollReveal);

// Trigger on load
document.addEventListener('DOMContentLoaded', () => {
    scrollReveal();
});

// Form Submission Handler
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');

        // Simulate success
        const card = document.querySelector('.quote-form-card');
        card.innerHTML = `
            <div class="form-success">
                <h3>Merci ${name} ! 🚀</h3>
                <p>Votre demande de devis a bien été envoyée. Je reviens vers vous sous 24h à 48h pour discuter de votre projet.</p>
                <button onclick="location.reload()" class="submit-btn" style="margin-top: 1.5rem;">Envoyer un autre message</button>
            </div>
        `;
    });
}

// Smooth Scroll for local links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

