const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");
const gameOverScreen = document.getElementById("game-over");
const scoreDisplay = document.getElementById("score");

let isJumping = false;
let score = 0;
let gameInterval;
let collisionCheck;

document.body.addEventListener("keydown", function(e) {
  if (e.code === "Space" && !isJumping) {
    jump();
  }
});

function jump() {
  isJumping = true;
  player.classList.add("jump");
  setTimeout(() => {
    player.classList.remove("jump");
    isJumping = false;
  }, 500);
}

function startGame() {
  score = 0;
  gameInterval = setInterval(() => {
    score++;
    scoreDisplay.textContent = "Score: " + score;
  }, 200);

  collisionCheck = setInterval(() => {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("right"));

    if (obstacleLeft >= 750 && obstacleLeft <= 800 && playerTop < 40) {
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
