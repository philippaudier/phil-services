const cursor = document.querySelector('.cursor');
const container = document.querySelector('.horizontal-container');
const gear1 = document.querySelector('.gear-1');
const gear2 = document.querySelector('.gear-2');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .watch-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(2.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
});

let scrollPos = 0;
const maxScroll = window.innerWidth * 2;

window.addEventListener('wheel', (e) => {
    scrollPos += e.deltaY;
    scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));

    container.style.transform = `translateX(-${scrollPos}px)`;

    // Gear Parallax
    if (gear1) gear1.style.transform = `rotate(${scrollPos * 0.1}deg)`;
    if (gear2) gear2.style.transform = `rotate(${-scrollPos * 0.2}deg)`;
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
        alert('Demande de réservation reçue !');
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
