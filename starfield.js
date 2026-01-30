/**
 * COSMIC STARFIELD ENGINE
 * Procedural, Parallax, High-Performance Canvas Animation
 */

class Starfield {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        this.stars = [];
        this.count = 400;
        this.baseSpeed = 0.05;
        this.scrollOffset = 0;

        this.resize();
        this.initStars();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.initStars(); // Re-init stars on resize to fill screen
    }

    initStars() {
        this.stars = [];
        for (let i = 0; i < this.count; i++) {
            const colorVariation = Math.random();
            let color;
            if (colorVariation > 0.9) {
                color = 'rgba(0, 217, 255, '; // Cyan
            } else if (colorVariation > 0.85) {
                color = 'rgba(191, 64, 191, '; // Purple
            } else {
                color = 'rgba(255, 255, 255, '; // White
            }

            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                depth: Math.random() * 0.8 + 0.2,
                twinkle: Math.random() * Math.PI,
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                brightness: Math.random() * 0.5 + 0.5,
                color: color
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.initStars();
        });
        window.addEventListener('scroll', () => {
            this.scrollOffset = window.scrollY;
        });
    }

    drawNebula() {
        // Clear background with deep space base color
        this.ctx.fillStyle = '#0a0e27';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Layer 1: Deep Blue
        const g1 = this.ctx.createRadialGradient(
            this.canvas.width * 0.8, this.canvas.height * 0.2, 0,
            this.canvas.width * 0.8, this.canvas.height * 0.2, this.canvas.width * 0.6
        );
        g1.addColorStop(0, 'rgba(30, 58, 138, 0.15)');
        g1.addColorStop(1, 'transparent');

        // Layer 2: Deep Purple
        const g2 = this.ctx.createRadialGradient(
            this.canvas.width * 0.2, this.canvas.height * 0.8, 0,
            this.canvas.width * 0.2, this.canvas.height * 0.8, this.canvas.width * 0.7
        );
        g2.addColorStop(0, 'rgba(74, 20, 140, 0.12)');
        g2.addColorStop(1, 'transparent');

        this.ctx.fillStyle = g1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = g2;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawStars() {
        this.stars.forEach(star => {
            star.twinkle += star.twinkleSpeed;
            const opacity = star.brightness * (0.6 + Math.sin(star.twinkle) * 0.4);

            const height = Math.max(1, this.canvas.height);
            const scroll = this.scrollOffset || 0;
            const parallaxY = (star.y - (scroll * star.depth * 0.2)) % height;
            const finalY = parallaxY < 0 ? parallaxY + height : parallaxY;

            this.ctx.beginPath();
            this.ctx.arc(star.x, finalY, star.size, 0, Math.PI * 2);
            this.ctx.fillStyle = star.color + opacity + ')';
            this.ctx.fill();
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw space depth
        this.drawNebula();
        this.drawStars();

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new Starfield('starfield');
});
