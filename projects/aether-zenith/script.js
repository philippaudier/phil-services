const stars = document.querySelector('.starfield');
const main = document.querySelector('.depth-container');

main.addEventListener('scroll', () => {
    const scroll = main.scrollTop;
    stars.style.transform = `translateY(${scroll * 0.5}px)`;
});

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
        alert('Protocole de réservation initié !');
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
