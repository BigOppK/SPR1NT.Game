const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 180, y: 500, w: 30, h: 30, dy: 0, jumping: false };
let obstacles = [];
let score = 0;
let gameRunning = true;

function drawPlayer() {
  ctx.fillStyle = "#00f";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawObstacle(obs) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
}

function createObstacle() {
  const x = Math.random() * (canvas.width - 40);
  obstacles.push({ x: x, y: -40, w: 40, h: 40, dy: 4 });
}

function drawScore() {
  document.getElementById('scoreDisplay').textContent = `Score: ${score}`;
}

function updateGame() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();

  player.y += player.dy;
  if (player.jumping) {
    player.dy += 1; // gravity
    if (player.y >= 500) {
      player.y = 500;
      player.dy = 0;
      player.jumping = false;
    }
  }

  obstacles.forEach((obs, i) => {
    obs.y += obs.dy;
    drawObstacle(obs);
    if (
      obs.x < player.x + player.w &&
      obs.x + obs.w > player.x &&
      obs.y < player.y + player.h &&
      obs.y + obs.h > player.y
    ) {
      gameOver();
    }
    if (obs.y > canvas.height) {
      obstacles.splice(i, 1);
      score++;
    }
  });

  drawScore();
  requestAnimationFrame(updateGame);
}

function gameOver() {
  gameRunning = false;
  document.getElementById("gameOver").style.display = "block";
}

function restartGame() {
  player = { x: 180, y: 500, w: 30, h: 30, dy: 0, jumping: false };
  obstacles = [];
  score = 0;
  gameRunning = true;
  document.getElementById("gameOver").style.display = "none";
  updateGame();
}

document.addEventListener("keydown", (e) => {
  if ((e.key === "ArrowUp" || e.key === "w") && !player.jumping) {
    player.dy = -15;
    player.jumping = true;
  }
  if (e.key === "ArrowLeft" || e.key === "a") {
    player.x -= 20;
  }
  if (e.key === "ArrowRight" || e.key === "d") {
    player.x += 20;
  }
});

setInterval(() => {
  if (gameRunning) createObstacle();
}, 1200);

updateGame();
