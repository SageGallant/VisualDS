// DOM Elements
const visualization = document.getElementById("visualization");
const currentOperation = document.getElementById("current-operation");
const loopValues = document.getElementById("loop-values");
const barCountInput = document.getElementById("bar-count");
const barValuesInput = document.getElementById("bar-values");
const speedInput = document.getElementById("speed");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

const sounds = {
  slap: new Audio("../assets/audio/slap.mp3"),
  jump: new Audio("../assets/audio/jump.mp3"),
  compare: new Audio("../assets/audio/nextLevel.mp3"),
  phase: new Audio("../assets/audio/finish.mp3"),
};

let bars = [],
  speed = parseInt(speedInput.value, 10),
  isRunning = false;

// Create bars
function createBars() {
  const barCount = parseInt(barCountInput.value, 10);
  const barValues = barValuesInput.value;

  // Generate random values if no input is provided
  if (barValues) {
    // Values from user.
    bars = barValues
      .split(",")
      .map((v) => +v.trim())
      .filter((v) => !isNaN(v));
  } else {
    bars = Array.from({ length: barCount }, () => Math.random() * 100);
  }
  visualization.innerHTML = "";
  bars.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}%`;
    bar.style.width = `${90 / bars.length}%`;
    bar.textContent = value;
    visualization.appendChild(bar);
  });
}

// Bubble Sort
async function bubbleSort() {
  const elements = Array.from(visualization.children);
  for (let i = 0; i < bars.length - 1 && isRunning; i++) {
    for (let j = 0; j < bars.length - i - 1 && isRunning; j++) {
      loopValues.textContent = `Phase: ${i}, Compare: ${j}`;
      currentOperation.textContent = `Comparing bars ${j} and ${j + 1}`;

      elements[j].style.background = elements[j + 1].style.background =
        "orange";
      await pause();

      if (bars[j] > bars[j + 1]) {
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
        [elements[j].style.height, elements[j + 1].style.height] = [
          elements[j + 1].style.height,
          elements[j].style.height,
        ];
        elements[j].textContent = bars[j];
        elements[j + 1].textContent = bars[j + 1];
        sounds.jump.play();
      } else {
        sounds.slap.play();
      }

      elements[j].style.background = elements[j + 1].style.background = "blue";
    }
    sounds.compare.play();
    await pause();
  }
  currentOperation.textContent = "Sorting Complete!";
  sounds.phase.play();
  stopAnimation();
}

// Start/Stop animation
function startAnimation() {
  isRunning = true;
  startButton.textContent = "Stop";
  bubbleSort();
}

function stopAnimation() {
  isRunning = false;
  startButton.textContent = "Start";
}

// Utility: Pause execution
const pause = () => new Promise((resolve) => setTimeout(resolve, speed));

// Event Listeners
startButton.addEventListener("click", () =>
  isRunning ? stopAnimation() : startAnimation()
);
resetButton.addEventListener("click", () => {
  stopAnimation();
  createBars();
  currentOperation.textContent = "Reset complete";
});

// Initialize bars on load
createBars();
