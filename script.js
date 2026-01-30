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

// Form Submission Handler (Formspree Integration)
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    quoteForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = "Envoi en cours... ⏳";
        submitBtn.style.opacity = "0.7";
        submitBtn.disabled = true;

        const formData = new FormData(this);
        const name = formData.get('name');

        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success: Show custom premium message
                const card = document.querySelector('.quote-form-card');
                card.innerHTML = `
                    <div class="form-success">
                        <h3>Merci ${name} ! 🚀</h3>
                        <p>Votre demande de devis a bien été envoyée. Je reviens vers vous sous 24h à 48h pour discuter de votre projet.</p>
                        <button onclick="location.reload()" class="submit-btn" style="margin-top: 1.5rem;">Envoyer un autre message</button>
                    </div>
                `;
                this.reset();
            } else {
                // Error handling
                const errorData = await response.json();
                throw new Error(errorData.errors ? errorData.errors.map(err => err.message).join(', ') : "Erreur lors de l'envoi");
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = "❌ Erreur - Réessayer";
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
            alert("Oups ! Une erreur est survenue : " + error.message);
        }
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
