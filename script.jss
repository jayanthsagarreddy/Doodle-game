// script.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = { x: 200, y: 500, width: 30, height: 30, dy: 0 };
let platforms = [];
let score = 0;
let isGameRunning = false;

// Initialize platforms
function createPlatforms() {
    platforms = [];
    for (let i = 0; i < 5; i++) {
        platforms.push({
            x: Math.random() * (canvas.width - 60),
            y: i * 100,
            width: 60,
            height: 10,
        });
    }
}

// Draw player
function drawPlayer() {
    ctx.fillStyle = "green";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw platforms
function drawPlatforms() {
    ctx.fillStyle = "brown";
    platforms.forEach((platform) => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

// Update game state
function update() {
    if (!isGameRunning) return;

    // Player gravity
    player.dy += 0.5;
    player.y += player.dy;

    // Check for collisions
    platforms.forEach((platform) => {
        if (
            player.y + player.height <= platform.y &&
            player.y + player.height + player.dy >= platform.y &&
            player.x + player.width >= platform.x &&
            player.x <= platform.x + platform.width
        ) {
            player.dy = -10; // Bounce player
            score++;
        }
    });

    // Move platforms
    platforms.forEach((platform) => {
        platform.y += 2;
        if (platform.y > canvas.height) {
            platform.y = 0;
            platform.x = Math.random() * (canvas.width - platform.width);
        }
    });

    // Check game over
    if (player.y > canvas.height) {
        isGameRunning = false;
        alert("Game Over! Your score: " + score);
        resetGame();
    }
}

// Reset game state
function resetGame() {
    player = { x: 200, y: 500, width: 30, height: 30, dy: 0 };
    score = 0;
    createPlatforms();
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawPlatforms();
    update();
    document.getElementById("score").innerText = score;
    if (isGameRunning) requestAnimationFrame(gameLoop);
}

// Start game
document.getElementById("startButton").addEventListener("click", () => {
    isGameRunning = true;
    createPlatforms();
    gameLoop();
});

// Restart game
document.getElementById("restartButton").addEventListener("click", () => {
    resetGame();
    isGameRunning = true;
    gameLoop();
});
