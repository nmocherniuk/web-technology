const startButton = document.getElementById("start-button");
const difficultySelect = document.getElementById("difficulty");
const colorSelect = document.getElementById("color");
const controls = document.getElementById("controls");
const gameInfo = document.getElementById("game-info");
const gameArea = document.getElementById("game-area");
const scoreDisplay = document.getElementById("score");
const timeDisplay = document.getElementById("time");

let gameInterval;
let timerInterval;
let score = 0;
let timeLeft;
const settings = {
  lazy: { timeLimit: 4, size: 100, range: 200 },
  normal: { timeLimit: 2, size: 75, range: 300 },
  hard: { timeLimit: 1, size: 40, range: 400 },
};

function startGame() {
  const difficulty = difficultySelect.value;
  const color = colorSelect.value;

  if (!difficulty || !color) {
    alert("Please select both difficulty and color!");
    return;
  }

  const { timeLimit: interval, size } = settings[difficulty];
  timeLeft = interval;

  score = 0;
  scoreDisplay.textContent = score;
  timeDisplay.textContent = timeLeft;

  controls.classList.add("hidden");
  gameInfo.style.display = "block";
  gameArea.innerHTML = "";

  const square = document.createElement("div");
  square.classList.add("square");
  square.style.width = `${size}px`;
  square.style.height = `${size}px`;
  square.style.backgroundColor = color;

  gameArea.appendChild(square);

  function moveSquare() {
    const x = Math.random() * (gameArea.clientWidth - size);
    const y = Math.random() * (gameArea.clientHeight - size);
    square.style.transform = `translate(${x}px, ${y}px)`;
  }

  function handleClick() {
    clearTimeout(gameInterval);
    score++;
    scoreDisplay.textContent = score;
    moveSquare();
    resetTimer();
  }

  function resetTimer() {
    clearTimeout(timerInterval);
    timeLeft = interval;
    timeDisplay.textContent = timeLeft;
    gameInterval = setTimeout(() => {
      endGame();
    }, interval * 1000);

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        // Add visual feedback for critical time
        if (timeLeft <= 2) {
          timeDisplay.classList.add("time-critical");
        } else {
          timeDisplay.classList.remove("time-critical");
        }
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  }

  square.addEventListener("click", handleClick);

  moveSquare();
  resetTimer();
}

function endGame() {
  clearTimeout(gameInterval);
  clearInterval(timerInterval);
  gameArea.innerHTML = "";
  alert(`Game over! Your score is ${score}. Reload the page to play again.`);
  controls.classList.remove("hidden");
  gameInfo.style.display = "none";
}

startButton.addEventListener("click", startGame);
