// Theme functionality
function toggleTheme() {
  const body = document.body;
  const themeToggleIcon = document.querySelector("#theme-toggle");
  body.classList.toggle("dark");
  themeToggleIcon.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
}

// Sound management
const sounds = {
  noSwap: new Audio("/assets/audio/sorting/slap.mp3"),
  swap: new Audio("/assets/audio/sorting/jump.mp3"),
  loop: new Audio("/assets/audio/sorting/nextLevel.mp3"),
  complete: new Audio("/assets/audio/sorting/finish.mp3"),
};

function playSound(type) {
  if (sounds[type]) {
    sounds[type].currentTime = 0; // Reset to start for quick consecutive plays
    sounds[type].load();
    sounds[type].play();
  } else {
    console.error(`Sound type "${type}" not found.`);
  }
}

// Utility functions
const visualization = document.querySelector("#visualization");
const barCountInput = document.querySelector("#bar-count");
const barValuesInput = document.querySelector("#bar-values");
const speedInput = document.querySelector("#speed");
const infoPanel = document.querySelector("#info-panel");
const currentOperationElem = document.querySelector("#current-operation");
const loopValuesElem = document.querySelector("#loop-values");

const COLORS = {
  default: "white",
  compare: "orange",
  swap: "green",
  incorrect: "red",
  sorted: "rebeccapurple",
};

let bars = [];
let speed = parseInt(speedInput.value, 10);
let isRunning = false;
let selectedAlgorithm = "bubble";

speedInput.addEventListener("input", () => {
  speed = parseInt(speedInput.value, 10);
});

function createBars() {
  const barCount = parseInt(barCountInput.value, 10);
  const barValues = barValuesInput.value;
  if (barValues) {
    if (barValues && barValues.split(",").every((v) => !isNaN(+v.trim()))) {
      bars = barValues.split(",").map((v) => +v.trim());
    } else {
      alert("Please enter valid numeric values for bars.");
      return;
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
    bar.textContent = Math.floor(value);
    visualization.appendChild(bar);
  });
  return bars;
}

function pause() {
  return new Promise((resolve) => setTimeout(resolve, speed));
}

function handleReset() {
  createBars();
  currentOperationElem.textContent = "Reset complete";
}

function updateBars(
  bars,
  backgroundColor = null,
  classToAdd = null,
  classToRemove = [],
  soundToPlay = null,
  pauseFunction = null,
  animationDuration = 0
) {
  bars.forEach((bar) => {
    classToRemove.forEach((cls) => bar.classList.remove(cls));

    if (backgroundColor) {
      bar.style.background = backgroundColor;
    }

    if (classToAdd) {
      bar.classList.add(classToAdd);
      // Remove class after animation duration if animation is enabled
      if (animationDuration > 0) {
        setTimeout(() => bar.classList.remove(classToAdd), animationDuration);
      }
    }
  });

  // Play sound if provided
  if (soundToPlay) {
    playSound(soundToPlay);
  }

  // Pause if provided
  if (pauseFunction) {
    pauseFunction();
  }
}

function isArraySorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) return false;
  }
  return true;
}

// Sorting algorithms
async function bubbleSort() {
  if (!isRunning) return;

  const bars = document.querySelectorAll(".bar");
  const n = bars.length;
  const values = Array.from(bars).map((bar) => parseInt(bar.style.height));

  for (let i = 0; i < n - 1; i++) {
    if (!isRunning) return;
    loopValuesElem.textContent = `Phase: ${i + 1}, Compare: 0`;

    for (let j = 0; j < n - i - 1; j++) {
      if (!isRunning) return;

      // Update info panel
      loopValuesElem.textContent = `Phase: ${i + 1}, Compare: ${j + 1}`;
      currentOperationElem.textContent = `Comparing ${values[j]} and ${
        values[j + 1]
      }`;

      // Highlight bars being compared
      bars[j].style.background = COLORS.compare;
      bars[j + 1].style.background = COLORS.compare;
      await pause();

      if (values[j] > values[j + 1]) {
        // Swap values
        [values[j], values[j + 1]] = [values[j + 1], values[j]];

        // Update bar heights
        bars[j].style.height = `${values[j]}%`;
        bars[j + 1].style.height = `${values[j + 1]}%`;

        // Update bar text content
        bars[j].textContent = Math.floor(values[j]);
        bars[j + 1].textContent = Math.floor(values[j + 1]);

        // Visual swap effect
        updateBars(
          [bars[j], bars[j + 1]],
          COLORS.swap,
          "jump",
          ["shake"],
          "swap"
        );
        await pause();
      } else {
        // No swap needed
        updateBars(
          [bars[j], bars[j + 1]],
          COLORS.incorrect,
          "shake",
          ["jump"],
          "noSwap"
        );
        await pause();
      }

      // Reset bar color
      bars[j].style.background = "";
      bars[j + 1].style.background = "";
    }

    // Mark the last bar as sorted
    bars[n - i - 1].style.background = COLORS.sorted;
    playSound("loop");
    await pause();
  }

  // Mark the first bar as sorted (it's already in place)
  bars[0].style.background = COLORS.sorted;

  // Check if array is fully sorted
  if (isArraySorted(values)) {
    currentOperationElem.textContent = "Sorting Complete!";
    document.querySelectorAll(".bar").forEach((bar) => {
      updateBars([bar], null, "finish", [], "complete");
    });
  }

  isRunning = false;
  document.querySelector("#start").textContent = "Start";
}

async function insertionSort() {
  if (!isRunning) return;

  const bars = document.querySelectorAll(".bar");
  const n = bars.length;
  const values = Array.from(bars).map((bar) => parseInt(bar.style.height));

  // Mark first element as sorted
  bars[0].style.background = COLORS.sorted;

  for (let i = 1; i < n; i++) {
    if (!isRunning) return;

    let current = values[i];
    let j = i - 1;

    // Highlight current element
    loopValuesElem.textContent = `Phase: ${i}, Current: ${current}`;
    currentOperationElem.textContent = `Inserting ${current} into sorted array`;
    bars[i].style.background = COLORS.compare;
    await pause();

    while (j >= 0 && values[j] > current) {
      if (!isRunning) return;

      // Shift element right
      values[j + 1] = values[j];
      bars[j + 1].style.height = `${values[j + 1]}%`;
      bars[j + 1].textContent = Math.floor(values[j + 1]);

      // Visual effect for shift
      updateBars(
        [bars[j], bars[j + 1]],
        COLORS.swap,
        "jump",
        ["shake"],
        "swap"
      );
      await pause();

      // Move to the next element
      j--;
    }

    // Place current element at correct position
    values[j + 1] = current;
    bars[j + 1].style.height = `${values[j + 1]}%`;
    bars[j + 1].textContent = Math.floor(values[j + 1]);

    // Mark all processed elements as sorted
    for (let k = 0; k <= i; k++) {
      bars[k].style.background = COLORS.sorted;
    }

    playSound("loop");
    await pause();
  }

  // Check if array is fully sorted
  if (isArraySorted(values)) {
    currentOperationElem.textContent = "Sorting Complete!";
    document.querySelectorAll(".bar").forEach((bar) => {
      updateBars([bar], null, "finish", [], "complete");
    });
  }

  isRunning = false;
  document.querySelector("#start").textContent = "Start";
}

// Main app control functions
function startSort() {
  if (isRunning) return;
  isRunning = true;
  document.querySelector("#start").textContent = "Stop";

  switch (selectedAlgorithm) {
    case "bubble":
      bubbleSort();
      break;
    case "insertion":
      insertionSort();
      break;
    default:
      console.error("Unknown algorithm selected");
      isRunning = false;
      document.querySelector("#start").textContent = "Start";
  }
}

function stopSort() {
  if (!isRunning) return;
  isRunning = false;
  document.querySelector("#start").textContent = "Start";
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("#start");
  const resetButton = document.querySelector("#reset");
  const algorithmSelector = document.querySelector("#algorithm");
  const themeToggleButton = document.querySelector("#theme-toggle");

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

  // Initialize bars on page load
  createBars();
});
