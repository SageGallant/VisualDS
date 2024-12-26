import { createBars, handleReset } from "./utils.js";
import { bubbleSort, insertionSort } from "./algorithms/sorting.js";
import { toggleTheme } from "./theme.js";
import { sounds, stopAllSounds } from "./soundManager.js";

const startButton = document.querySelector("#start");
const resetButton = document.querySelector("#reset");
const algorithmSelector = document.querySelector("#algorithm");
const themeToggleButton = document.querySelector("#theme-toggle");

let isRunning = false;
let selectedAlgorithm = "bubble";
let currentSortingPromise = null;

function startSort() {
  if (isRunning) return; // Prevent starting the sort if it's already running

  isRunning = true;
  startButton.textContent = "Stop";
  sort();
}

function stopSort() {
  if (!isRunning) return; // Prevent stopping if no sort is running

  isRunning = false;
  startButton.textContent = "Start";
  // sounds.stopAllSounds();
  stopAllSounds();

  // Reset the bars when stopping
  createBars();
  if (currentSortingPromise) {
    currentSortingPromise = null;
  }
}

function sort() {
  switch (selectedAlgorithm) {
    case "bubble":
      // Ensure the sort runs asynchronously
      currentSortingPromise = bubbleSort().finally(() => {
        isRunning = false;
        startButton.textContent = "Start";
      });
      break;
    case "insertion":
      // Ensure the sort runs asynchronously
      currentSortingPromise = insertionSort().finally(() => {
        isRunning = false;
        startButton.textContent = "Start";
      });
      break;
    // Future cases for other algorithms can go here.
    default:
      console.error("Unknown algorithm selected");
  }
}

startButton.addEventListener("click", () => {
  if (isRunning) {
    stopSort();
  } else {
    startSort();
  }
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
