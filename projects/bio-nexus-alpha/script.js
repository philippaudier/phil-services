// Handle browser back/forward navigation - hide transition mask
window.addEventListener('pageshow', function(event) {
    if (event.persisted) {
        const mask = document.querySelector('.transition-mask');
        if (mask) mask.style.display = 'none';
    }
});

// Performance: Throttle utility
const throttle = (fn, delay) => {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            fn(...args);
        }
    };
};

// Throttled mousemove for fluid overlay
const bg = document.querySelector('.fluid-overlay');
if (bg) {
    const updateBackground = (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        bg.style.background = `radial-gradient(circle at ${10 + x * 5}% ${20 + y * 5}%, rgba(16, 185, 129, 0.08) 0%, transparent 40%),
                               radial-gradient(circle at ${90 - x * 5}% ${80 - y * 5}%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)`;
    };
    document.addEventListener('mousemove', throttle(updateBackground, 32), { passive: true });
}

// Appointment Modal Logic
const modal = document.getElementById('appointmentModal');
const openBtn = document.querySelector('.trigger-appointment');
const closeBtn = document.querySelector('.close-modal');
const backdrop = document.querySelector('.modal-backdrop');

if (openBtn && modal) {
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });
}

const form = document.querySelector('.appointment-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Analyse ADN et réservation enregistrées !');
        modal.classList.remove('active');
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

if (backdrop) {
    backdrop.addEventListener('click', () => {
        modal.classList.remove('active');
    });
}

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
