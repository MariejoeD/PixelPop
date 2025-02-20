const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = [];

// Create a snowflake object
function createSnowflake() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 4 + 1,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3
    };
}

// Generate snowflakes
for (let i = 0; i < 100; i++) {
    snowflakes.push(createSnowflake());
}

// Animate the snow
function drawSnowflakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"; // White color with transparency
    ctx.beginPath();

    snowflakes.forEach((flake) => {
        ctx.globalAlpha = flake.opacity;
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    });

    ctx.fill();

    updateSnowflakes();
}

// Update snowflake positions
function updateSnowflakes() {
    snowflakes.forEach((flake) => {
        flake.y += flake.speed;

        // Reset snowflake if it moves off-screen
        if (flake.y > canvas.height) {
            flake.y = 0;
            flake.x = Math.random() * canvas.width;
        }
    });
}

// Resize canvas when window size changes
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Run animation
function animateSnow() {
    drawSnowflakes();
    requestAnimationFrame(animateSnow);
}

animateSnow();
