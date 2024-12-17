// import { bubbleSort } from "./js/bubble.js";

const visualization = document.querySelector("#visualization");
const currentOperation = document.querySelector("#current-operation");
const loopValues = document.querySelector("#loop-values");
const barCountInput = document.querySelector("#bar-count");
const barValuesInput = document.getElementById("bar-values");
const speedInput = document.querySelector("#speed");
const startButton = document.querySelector("#start");

let bars = [],
  speed = 300,
  isRunning = false,
  animation = null;

function createBars() {
  const barCount = parseInt(barCountInput.value, 10);
  const barValues = barValuesInput.value;
  if (barValues) {
    bars = barValues
      .split(",")
      .map((v) => +v.trim())
      .filter((v) => !isNaN(v));
  } else {
    bars = Array.from({ length: barCount }, () => Math.random() * 100);
  }

  // bars = Array.from({ length: barCount }, () => Math.random() * 100);

  visualization.innerHTML = "";
  // bars.forEach((bar) => {
  //   const barDiv = document.createElement("div");
  //   barDiv.className = "bar";
  //   barDiv.style.height = `${bar}%`;
  //   barDiv.style.width = `${100 / barCount - 1}%`;
  //   barDiv.style.background = "orange";
  //   barDiv.style.margin = "2px";
  //   barDiv.style.borderRadius = "20px";
  //   barDiv.textContent = barDiv.style.height;
  //   visualization.appendChild(barDiv);
  // });

  bars.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}%`;
    bar.style.width = `${100 / bars.length - 1}%`;
    bar.style.margin = "2px";
    bar.style.display = "inline-block";
    bar.style.background = "linear-gradient(to bottom, #0078d7, #005bb5)";
    bar.style.borderRadius = "3px";
    bar.style.textAlign = "center";

    bar.textContent = Math.floor(value);
    visualization.appendChild(bar);
  });

  // bars.forEach((value) => {
  //   const bar = document.createElement("div");
  //   bar.className = "bar";
  //   bar.style.position = "relative"; // Set parent to relative
  //   bar.style.height = `${value}%`;
  //   bar.style.width = `${100 / bars.length - 1}%`;
  //   bar.style.margin = "2px";
  //   bar.style.display = "inline-block";
  //   bar.style.background = "linear-gradient(to bottom, #0078d7, #005bb5)";
  //   bar.style.borderRadius = "3px";

  //   // Add text at bottom
  //   const text = document.createElement("span");
  //   text.textContent = Math.floor(value);
  //   text.style.position = "absolute";
  //   text.style.bottom = "0"; // Align text at bottom
  //   text.style.left = "50%"; // Center text horizontally
  //   text.style.transform = "translateX(-50%)"; // Adjust for centering
  //   text.style.color = "white"; // Text color
  //   text.style.fontSize = "12px"; // Adjust font size if needed

  //   bar.appendChild(text);
  //   visualization.appendChild(bar);
  // });
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
