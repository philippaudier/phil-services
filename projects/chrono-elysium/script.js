const cursor = document.querySelector('.cursor');
const main = document.querySelector('.horizontal-container');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Horizontal Scroll
window.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
        window.scrollBy({
            left: e.deltaY * 2,
            behavior: 'smooth'
        });
        e.preventDefault();
    }
}, { passive: false });

// Initialize Lucide
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
