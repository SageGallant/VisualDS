import { bubbleSort } from "./js/bubble.js";

const loopValues = document.querySelector("#loop-values");
const currentOperation = document.querySelector("#current-operation");
const barCountInput = document.querySelector("#bar-count");
const barValuesInput = document.getElementById("bar-values");
const speedInput = document.querySelector("#speed");
const startButton = document.querySelector("#start");
const visualization = document.querySelector("#visualization");

const sounds = {
  slap: new Audio("./assets/audio/slap.mp3"),
  jump: new Audio("./assets/audio/jump.mp3"),
  compare: new Audio("./assets/audio/nextLevel.mp3"),
  phase: new Audio("./assets/audio/finish.mp3"),
};
export var isRunning = false;

export let bars = [],
  speed = parseInt(speedInput.value, 10),
  animation = null;
speedInput.addEventListener("input", () => {
  speed = parseInt(speedInput.value, 10); // Parse to integer here as well!
});

function createBars() {
  const barCount = parseInt(barCountInput.value, 10);
  const barValues = barValuesInput.value;
  if (barValues) {
    if (barValues && barValues.split(",").every((v) => !isNaN(+v.trim()))) {
      bars = barValues.split(",").map((v) => +v.trim());
    } else {
      alert("Please enter valid numeric values for bars.");
      return; // Return early if invalid input
    }
  } else {
    bars = Array.from({ length: barCount }, () =>
      Math.floor(Math.random() * 100)
    );
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
function updateBars(bars, classesToRemove, newBackground) {
  bars.forEach((bar) => {
    classesToRemove.forEach((cls) => bar.classList.remove(cls));
    bar.style.background = newBackground;
  });
}
function updateBarsWithSound(bars, backgroundColor, classToAdd, soundToPlay) {
  bars.forEach((bar) => {
    bar.style.background = backgroundColor;
    bar.classList.add(classToAdd);
    setTimeout(() => bar.classList.remove(classToAdd), 500); // Remove class after animation duration
  });
  soundToPlay.play();
}

export function isArraySorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) return false;
  }
  return true;
}

startButton.addEventListener("click", () => {
  isRunning ? stopAnimation() : startAnimation();
});

document.querySelector("#reset").addEventListener("click", () => {
  stopAnimation();
  createBars();
  currentOperation.textContent = "Reset complete";
});

createBars();
