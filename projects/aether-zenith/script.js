const stars = document.querySelector('.starfield');
const main = document.querySelector('.depth-container');

main.addEventListener('scroll', () => {
    const scroll = main.scrollTop;
    stars.style.transform = `translateY(${scroll * 0.5}px)`;
});

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
