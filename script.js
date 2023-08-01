// Particle configuration
const particleCount = 100;
const particleMinSize = 2;
const particleMaxSize = 5;
const particleMinSpeed = 0.5;
const particleMaxSpeed = 1.5;
const particleColors = ['#4CAF50', '#2196F3', '#FFC107', '#E91E63'];

// Particle class
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * (particleMaxSize - particleMinSize) + particleMinSize;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
        this.speedX = (Math.random() - 0.5) * (particleMaxSpeed - particleMinSpeed);
        this.speedY = (Math.random() - 0.5) * (particleMaxSpeed - particleMinSpeed);
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Bounce off the walls
        if (this.x + this.size > this.canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX;
        }
        if (this.y + this.size > this.canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY;
        }
    }
}

// Particle Animation
function animateParticles() {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    const particles = [];

    // Set canvas size to match the window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }

    // Animation loop
    function animate() {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });

        // Request the next animation frame
        requestAnimationFrame(animate);
    }

    // Start the animation loop
    animate();
}

// Call the particle animation function when the page loads
window.addEventListener('load', animateParticles);
