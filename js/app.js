import { createBars, handleReset } from "./utils.js";
import { toggleTheme } from "./theme.js";
import { algorithms } from "./sortingManager.js";

const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const algorithmSelector = document.querySelector("#algorithm");
const themeToggleButton = document.querySelector("#theme-toggle");
export let isRunning = false;
let selectedAlgorithm = "bubble";

function startSort() {
  if (isRunning) return;
  isRunning = true;
  startButton.textContent = "Stop";
  sort();
}

function stopSort() {
  if (!isRunning) return;

  isRunning = false;
  startButton.textContent = "Start";
}

function sort() {
  switch (selectedAlgorithm) {
    case "bubble":
      let currentSortingPromise = algorithms.bubbleSort().finally(() => {
        isRunning = true;
        startButton.textContent = "Start";
      });
      break;
    case "insertion":
      currentSortingPromise = algorithms.insertionSort().finally(() => {
        isRunning = true;
        startButton.textContent = "Start";
      });
      break;
    // Future cases for other algorithms can go here.
    default:
      console.error("Unknown algorithm selected");
  }
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

createBars();
