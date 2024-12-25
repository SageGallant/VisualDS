import { createBars, handleReset } from "./utils.js";
import { bubbleSort } from "./algorithms/sorting.js";
import { toggleTheme } from "./theme.js";

const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const algorithmSelector = document.querySelector("#algorithm");
const themeToggleButton = document.querySelector("#theme-toggle");

let isRunning = false;
let selectedAlgorithm = "bubble";

function startSort() {
  if (isRunning) return;
  isRunning = true;
  startButton.textContent = "Stop";

  switch (selectedAlgorithm) {
    case "bubble":
      bubbleSort().finally(() => {
        isRunning = false;
        startButton.textContent = "Start";
      });
      break;
    // Future cases for other algorithms can go here.
    default:
      console.error("Unknown algorithm selected");
  }
}

function stopSort() {
  isRunning = false;
  startButton.textContent = "Start";
}

startButton.addEventListener("click", () => {
  isRunning ? stopSort() : startSort();
});

resetButton.addEventListener("click", () => {
  stopSort();
  handleReset();
});

algorithmSelector.addEventListener("change", (e) => {
  selectedAlgorithm = e.target.value;
});

themeToggleButton.addEventListener("click", toggleTheme);

createBars(); // Initialize bars on page load
