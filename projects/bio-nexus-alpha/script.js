// Mouse movement for fluid background
document.addEventListener('mousemove', (e) => {
    const bg = document.querySelector('.fluid-overlay');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    bg.style.background = `radial-gradient(circle at ${10 + x * 5}% ${20 + y * 5}%, rgba(16, 185, 129, 0.08) 0%, transparent 40%),
                           radial-gradient(circle at ${90 - x * 5}% ${80 - y * 5}%, rgba(16, 185, 129, 0.12) 0%, transparent 50%)`;
});

// Initialize Lucide
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
