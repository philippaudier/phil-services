const cursor = document.querySelector('.cursor');
const container = document.querySelector('.horizontal-container');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

let scrollPos = 0;
const maxScroll = window.innerWidth * 2;

window.addEventListener('wheel', (e) => {
    scrollPos += e.deltaY;
    scrollPos = Math.max(0, Math.min(scrollPos, maxScroll));

    container.style.transform = `translateX(-${scrollPos}px)`;
});

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}
