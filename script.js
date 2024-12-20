// import { bubbleSort } from "./js/bubble.js";

const visualization = document.querySelector("#visualization");
const currentOperation = document.querySelector("#current-operation");
const loopValues = document.querySelector("#loop-values");
const barCountInput = document.querySelector("#bar-count");
const barValuesInput = document.getElementById("bar-values");
const speedInput = document.querySelector("#speed");
const startButton = document.querySelector("#start");

const slap = new Audio("./assets/audio/slap.mp3");
const jump = new Audio("./assets/audio/jump.mp3");
const compare = new Audio("./assets/audio/nextLevel.mp3");
const phase = new Audio("./assets/audio/finish.mp3");

let bars = [],
  speed = parseInt(speedInput.value, 10),
  isRunning = false,
  animation = null;

function createBars() {
  const barCount = parseInt(barCountInput.value, 10);
  const barValues = barValuesInput.value;
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

    bar.style.width = `${100 / bars.length - 1}%`;
    bar.textContent = Math.floor(value); // Inverts div positioning;
    visualization.appendChild(bar);
  });
}

function pause() {
  return new Promise((resolve) => setTimeout(resolve, speed));
}

function startAnimation() {
  isRunning = true;
  startButton.textContent = "Stop";
  bubbleSort();
}

function stopAnimation() {
  isRunning = false;
  startButton.textContent = "Start";
}

startButton.addEventListener("click", () => {
  isRunning ? stopAnimation() : startAnimation();
});

document.querySelector("#reset").addEventListener("click", () => {
  stopAnimation();
  createBars();
  currentOperation.textContent = "Reset complete";
});

createBars(); // Initialize bars on load
