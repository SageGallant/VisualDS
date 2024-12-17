// import { bubbleSort } from "./js/bubble.js";

const visualization = document.querySelector("#visualization");
const currentOperation = document.querySelector("#current-operation");
const loopValues = document.querySelector("#loop-values");
const barCountInput = document.querySelector("#bar-count");
const speedInput = document.querySelector("#speed");
const startButton = document.querySelector("#start");

let bars = [],
  speed = 300,
  isRunning = false,
  animation = null;

function createBars() {
  const barCount = parseInt(barCountInput.value, 10);
  bars = Array.from({ length: barCount }, () => Math.random() * 100);

  visualization.innerHTML = "";
  bars.forEach((bar) => {
    const barDiv = document.createElement("div");
    barDiv.className = "bar";
    barDiv.style.height = `${bar}%`;
    barDiv.style.width = `${100 / barCount - 1}%`;
    barDiv.style.background = "orange";
    barDiv.style.margin = "2px";
    barDiv.style.borderRadius = "20px";
    barDiv.textContent = barDiv.style.height;
    visualization.appendChild(barDiv);
  });
}

// Bubble sort algorithm.

function pause() {
  return new Promise((resolve) => setTimeout(resolve, speed));
}

function startAnimation() {
  isRunning = true;
  startButton.textContent = "Stop Visualization";
  bubbleSort();
}

function stopAnimation() {
  isRunning = false;
  startButton.textContent = "Start Visualization";
}

startButton.addEventListener("click", () => {
  if (isRunning) {
    stopAnimation();
  } else {
    speed = parseInt(speedInput.value, 10);
    startAnimation();
  }
});

document.querySelector("#reset").addEventListener("click", () => {
  stopAnimation();
  createBars();
  currentOperation.textContent = "Reset complete";
});

createBars(); // Initialize bars on load
