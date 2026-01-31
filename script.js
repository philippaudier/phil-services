// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Sticky Navigation
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

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
    if (typeof initHUD === 'function') initHUD();
});

// Sync Pricing Selection with Form
document.querySelectorAll('.pricing-card .cta-button').forEach(button => {
    button.addEventListener('click', function () {
        const packValue = this.getAttribute('data-pack');
        const packSelect = document.getElementById('pack');
        if (packValue && packSelect) {
            packSelect.value = packValue;
        }
    });
});

// Form Submission Handler (Formspree Integration + Quantum Guardian)
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
    const inputs = quoteForm.querySelectorAll('input, textarea, select');
    const hudStatusBar = document.querySelector('.hud-status-bar');
    const hudCoords = document.querySelector('.status-node'); // Using first node for status

    // Clear error states on input
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('input-invalid');
            input.parentElement.classList.remove('invalid');
            if (hudStatusBar) {
                hudStatusBar.classList.remove('error');
                if (hudCoords) hudCoords.textContent = "COORDS: 48.85 / 2.35";
            }
        });
    });

    quoteForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Quantum Guardian Pre-flight check
        let isInvalid = false;
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                input.classList.add('input-invalid');
                input.parentElement.classList.add('invalid');
                isInvalid = true;
            }
        });

        if (isInvalid) {
            // Trigger HUD Error State
            if (hudStatusBar) {
                hudStatusBar.classList.add('error');
                if (hudCoords) hudCoords.textContent = "ERROR: DATA INCOMPLETE";

                // Vibrate HUD briefly
                hudStatusBar.style.transform = 'translateX(-52%) translateY(2px)';
                setTimeout(() => {
                    hudStatusBar.style.transform = 'translateX(-50%) translateY(0)';
                }, 100);
            }
            return; // Block submission
        }

        const submitBtn = this.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;

        // Show loading state
        submitBtn.innerHTML = "Transmission en cours... 📡";
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
                        <div class="success-icon">✅</div>
                        <h3>Séquence Initiée, ${name} ! 🚀</h3>
                        <p>Connexion établie avec succès. Je reviens vers vous sous 24h pour finaliser le plan de vol.</p>
                        <button onclick="location.reload()" class="submit-btn" style="margin-top: 1.5rem;">Ouvrir un nouveau canal</button>
                    </div>
                `;
                this.reset();
                if (hudCoords) hudCoords.textContent = "MISSION SECURE";
            } else {
                const errorData = await response.json();
                throw new Error(errorData.errors ? errorData.errors.map(err => err.message).join(', ') : "Transmission interrompue");
            }
        } catch (error) {
            console.error('Error:', error);
            submitBtn.innerHTML = "❌ Echec de Connexion";
            submitBtn.style.opacity = "1";
            submitBtn.disabled = false;
            if (hudCoords) hudCoords.textContent = "LINK FAILURE";
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

// Spaceship HUD Scroll Progression Engine (Optimized: Vitesse Lumière)
const initHUD = () => {
    const hudScanners = document.querySelectorAll('.hud-scanner');
    const hudGrids = document.querySelectorAll('.hud-grid');
    const hudStatusBar = document.querySelector('.hud-status-bar');
    const hudBrackets = document.querySelectorAll('.hud-bracket');
    const missionIndicator = document.querySelector('.hud-quantum-pulse');

    let ticking = false;

    const updateHUD = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (window.scrollY / scrollHeight) * 100;

        // Update CSS variable for mobile scanline
        document.documentElement.style.setProperty('--scroll-percent', scrollPercent);

        // Stage 2: Scanners (5% - 100%)
        hudScanners.forEach(s => {
            if (scrollPercent > 5) {
                s.style.opacity = Math.min(0.5, (scrollPercent - 5) / 10);
                s.style.transform = `translateY(-50%) scaleY(${Math.min(1, (scrollPercent - 5) / 10)})`;
            } else {
                s.style.opacity = '0';
                s.style.transform = 'translateY(-50%) scaleY(0)';
            }
        });

        // Stage 3: Grids (25% - 100%)
        hudGrids.forEach(g => {
            if (scrollPercent > 25) {
                g.style.opacity = Math.min(0.2, (scrollPercent - 25) / 10);
                g.style.transform = `translateY(${Math.max(0, 30 - (scrollPercent - 25) * 2)}px)`;
            } else {
                g.style.opacity = '0';
                g.style.transform = 'translateY(50px)';
            }
        });

        // Stage 4: Status Bar (50% - 100%)
        if (hudStatusBar) {
            if (scrollPercent > 50) {
                hudStatusBar.style.opacity = Math.min(1, (scrollPercent - 50) / 10);
                hudStatusBar.style.transform = `translateX(-50%) translateY(${Math.max(0, 20 - (scrollPercent - 50) * 2)}px)`;
            } else {
                hudStatusBar.style.opacity = '0';
                hudStatusBar.style.transform = 'translateX(-50%) translateY(-20px)';
            }
        }

        // Stage 5: Mission Brackets & Final Indicator (75% - 100%)
        hudBrackets.forEach(b => {
            if (scrollPercent > 75) {
                b.style.opacity = Math.min(0.6, (scrollPercent - 75) / 10);
                b.style.transform = `scale(${Math.max(1, 1.2 - (scrollPercent - 75) / 50)})`;
            } else {
                b.style.opacity = '0';
                b.style.transform = 'scale(1.2)';
            }
        });

        if (missionIndicator) {
            if (scrollPercent > 85) {
                if (!missionIndicator.classList.contains('active')) {
                    // Trigger rapid tearing effect on specific content
                    const glitchTargets = document.querySelectorAll('#contact h2, #contact p, .contact-info-card, .quote-form-card');
                    glitchTargets.forEach(target => {
                        target.classList.add('section-glitch-active');
                        setTimeout(() => {
                            target.classList.remove('section-glitch-active');
                        }, 500);
                    });
                }
                missionIndicator.classList.add('active');
            } else {
                missionIndicator.classList.remove('active');
            }
        }
    };

    window.addEventListener('scroll', updateHUD);
    updateHUD();

    // 3D Flip Page Transition
    // Wrap main content for flip effect
    const mainContent = document.querySelector('main') || document.body.firstElementChild;

    // Create flip overlay (shown during transition)
    const flipOverlay = document.createElement('div');
    flipOverlay.className = 'quantum-morph-overlay';
    flipOverlay.innerHTML = `
        <span class="flip-destination"></span>
        <span class="flip-status">TRANSFERT EN COURS</span>
        <div class="flip-progress">
            <div class="flip-progress-bar"></div>
        </div>
    `;
    document.body.appendChild(flipOverlay);

    document.querySelectorAll('.project-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            const projectName = this.closest('.portfolio-tile')?.dataset.project || 'Projet';

            // Set destination name
            flipOverlay.querySelector('.flip-destination').textContent = projectName;

            // Start 3D flip animation
            document.body.classList.add('flipping-out');

            // Show overlay midway through flip
            setTimeout(() => {
                flipOverlay.classList.add('active');
            }, 300);

            // Navigate after animation
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 900);
        });
    });
};
