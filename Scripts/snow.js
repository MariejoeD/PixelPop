document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("snowCanvas");
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakes = [];

    function createSnowflakes() {
        for (let i = 0; i < 50; i++) {
            snowflakes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 4 + 1,
                speedX: Math.random() * 2 - 1,
                speedY: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2
            });
        }
    }

    function drawSnowflakes() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "white";

        snowflakes.forEach(flake => {
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            ctx.fill();
        });
    }

    function moveSnowflakes() {
        snowflakes.forEach(flake => {
            flake.y += flake.speedY;
            flake.x += flake.speedX;

            if (flake.y > height) {
                flake.y = -flake.radius;
                flake.x = Math.random() * width;
            }
        });
    }

    function animateSnow() {
        drawSnowflakes();
        moveSnowflakes();
        requestAnimationFrame(animateSnow);
    }

    createSnowflakes();
    animateSnow();

    window.addEventListener("resize", function () {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        snowflakes.length = 0;
        createSnowflakes();
    });
});
