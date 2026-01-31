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

const cursor = document.querySelector('.cursor');
const container = document.querySelector('.horizontal-container');
const gear1 = document.querySelector('.gear-1');
const gear2 = document.querySelector('.gear-2');

// Throttled cursor movement
if (cursor) {
    const updateCursor = (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', throttle(updateCursor, 16), { passive: true });
}

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .watch-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
    });
    el.addEventListener('mouseleave', () => {
        if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

let scrollPos = 0;
const panels = document.querySelectorAll('.panel');
let maxScroll = (panels.length - 1) * window.innerWidth;

window.addEventListener('resize', () => {
    maxScroll = (panels.length - 1) * window.innerWidth;
    scrollPos = Math.min(scrollPos, maxScroll);
    if (container) container.style.transform = `translateX(-${scrollPos}px)`;
});

// Throttled wheel for horizontal scroll + gear parallax
const handleWheel = (e) => {
    const speedFactor = window.innerWidth > 2000 ? 1.5 : 1;
    scrollPos += e.deltaY * speedFactor;
    scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));

    if (container) container.style.transform = `translateX(-${scrollPos}px)`;

    // Gear Parallax
    if (gear1) gear1.style.transform = `rotate(${scrollPos * 0.1}deg)`;
    if (gear2) gear2.style.transform = `rotate(${-scrollPos * 0.2}deg)`;
};

window.addEventListener('wheel', throttle(handleWheel, 16), { passive: true });

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

        // Hide form and header
        form.style.display = 'none';
        const h2 = modal.querySelector('h2');
        const eyebrow = modal.querySelector('.eyebrow');
        if (h2) h2.style.display = 'none';
        if (eyebrow) eyebrow.style.display = 'none';

        // Show success
        const successMsg = modal.querySelector('.success-message');
        if (successMsg) successMsg.style.display = 'block';

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    // Close success button
    const successClose = document.querySelector('.close-success');
    if (successClose) {
        successClose.addEventListener('click', () => {
            modal.classList.remove('active');
            // Reset form after delay
            setTimeout(() => {
                form.style.display = 'flex';
                form.reset();
                const h2 = modal.querySelector('h2');
                const eyebrow = modal.querySelector('.eyebrow');
                const successMsg = modal.querySelector('.success-message');
                if (h2) h2.style.display = 'block';
                if (eyebrow) eyebrow.style.display = 'block';
                if (successMsg) successMsg.style.display = 'none';
            }, 500);
        });
    }
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
