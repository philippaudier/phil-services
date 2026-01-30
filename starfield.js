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
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 1.5 + 0.5,
                depth: Math.random() * 0.8 + 0.2, // Parallax depth (0 to 1)
                twinkle: Math.random() * Math.PI, // Initial phase
                twinkleSpeed: Math.random() * 0.03 + 0.01,
                brightness: Math.random() * 0.5 + 0.5
            });
        }
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('scroll', () => {
            this.scrollOffset = window.scrollY;
        });
    }

    drawNebula() {
        const time = Date.now() * 0.0001;

        // Simple procedural nebula effect using gradients
        // Layer 1: Deep Blue
        const g1 = this.ctx.createRadialGradient(
            this.canvas.width * 0.8, this.canvas.height * 0.2, 0,
            this.canvas.width * 0.8, this.canvas.height * 0.2, this.canvas.width * 0.6
        );
        g1.addColorStop(0, 'rgba(30, 58, 138, 0.1)');
        g1.addColorStop(1, 'transparent');

        // Layer 2: Deep Purple
        const g2 = this.ctx.createRadialGradient(
            this.canvas.width * 0.2, this.canvas.height * 0.8, 0,
            this.canvas.width * 0.2, this.canvas.height * 0.8, this.canvas.width * 0.7
        );
        g2.addColorStop(0, 'rgba(74, 20, 140, 0.08)');
        g2.addColorStop(1, 'transparent');

        this.ctx.fillStyle = g1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = g2;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawStars() {
        this.stars.forEach(star => {
            // Apply floating movement
            star.twinkle += star.twinkleSpeed;
            const opacity = star.brightness * (0.6 + Math.sin(star.twinkle) * 0.4);

            // Apply Parallax: 
            // Stars move slightly up/down based on scroll, deeper stars move slower
            const parallaxY = (star.y - (this.scrollOffset * star.depth * 0.2)) % this.canvas.height;
            const finalY = parallaxY < 0 ? parallaxY + this.canvas.height : parallaxY;

            this.ctx.beginPath();
            this.ctx.arc(star.x, finalY, star.size, 0, Math.PI * 2);

            // Color variations (slightly cyan, white, or slight purple)
            const colorVariation = Math.random();
            if (colorVariation > 0.9) {
                this.ctx.fillStyle = `rgba(0, 217, 255, ${opacity})`;
            } else if (colorVariation > 0.85) {
                this.ctx.fillStyle = `rgba(191, 64, 191, ${opacity})`;
            } else {
                this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
            }

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
