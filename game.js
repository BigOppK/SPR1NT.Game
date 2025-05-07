const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameOverScreen = document.getElementById("game-over");
const scoreDisplay = document.getElementById("score");

let playerPosY = 100;
let isJumping = false;
let score = 0;
let gravity = 1.5;
let isCrouching = false;
let gameInterval;
let collisionCheck;

let playerSpeed = 5;
let jumpHeight = 100;
let gravityEffect = 2;
let obstacleSpeed = 2;

document.body.addEventListener("keydown", function(e) {
  if (e.code === "ArrowUp" || e.code === "KeyW") {
    moveUp();
  } else if (e.code === "ArrowDown" || e.code === "KeyS") {
    moveDown();
  }
});

function moveUp() {
  if (playerPosY < 500 && !isJumping) {
    isJumping = true;
    playerPosY += jumpHeight;
    updatePlayerPosition();
    setTimeout(() => {
      playerPosY -= jumpHeight;
      updatePlayerPosition();
      isJumping = false;
    }, 300);
  }
}

function moveDown() {
  if (!isCrouching) {
    isCrouching = true;
    player.style.transform = "scaleY(0.5)"; // Crouch animation
    setTimeout(() => {
      isCrouching = false;
      player.style.transform = "scaleY(1)";
    }, 300);
  }
}

function updatePlayerPosition() {
  player.style.bottom = playerPosY + 'px';
}

function startGame() {
  score = 0;
  playerPosY = 100;
  isJumping = false;
  isCrouching = false;

  gameInterval = setInterval(() => {
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }, 100);

  collisionCheck = setInterval(() => {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft >= 370 && obstacleLeft <= 410 && playerTop < 80) {
      endGame();
    }
  }, 10);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(collisionCheck);
  obstacle.style.animation = "none";
  obstacle.style.display = "none";
  gameOverScreen.style.display = "block";
}

function restartGame() {
  obstacle.style.animation = "moveObstacle 2s linear infinite";
  obstacle.style.display = "block";
  gameOverScreen.style.display = "none";
  startGame();
}

startGame();
