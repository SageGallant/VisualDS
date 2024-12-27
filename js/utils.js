import { playSound } from "./soundManager.js";

const visualization = document.querySelector("#visualization");
const barCountInput = document.querySelector("#bar-count");
const barValuesInput = document.querySelector("#bar-values");
const speedInput = document.querySelector("#speed");
export const COLORS = {
  default: "white",
  compare: "orange",
  swap: "green",
  incorrect: "red",
  sorted: "rebeccapurple",
};
let bars = [],
  speed = parseInt(speedInput.value, 10),
  animation = null;
speedInput.addEventListener("input", () => {
  speed = parseInt(speedInput.value, 10); // Parse to integer here as well!
});

export function createBars() {
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
    bar.textContent = Math.floor(value);
    visualization.appendChild(bar);
  });
  return bars;
}

export function pause() {
  return new Promise((resolve) => setTimeout(resolve, speed));
}

export function handleReset() {
  createBars();
  document.querySelector("#current-operation").textContent = "Reset complete";
}

// export function updateBars(bars, classesToRemove, newBackground) {
//   bars.forEach((bar) => {
//     classesToRemove.forEach((cls) => bar.classList.remove(cls));
//     bar.style.background = newBackground;
//   });
// }

// export function updateBarsWithSound(
//   bars,
//   backgroundColor,
//   classToAdd,
//   soundToPlay
// ) {
//   bars.forEach((bar) => {
//     bar.style.background = backgroundColor;
//     bar.classList.add(classToAdd);
//     setTimeout(() => bar.classList.remove(classToAdd), 500); // Remove class after animation duration
//   });
//   playSound(soundToPlay);
//   pause();
// }
export function updateBarsWithOptions(
  bars,
  backgroundColor = null, // Optional background color
  classToAdd = null, // Optional class to add
  classToRemove = [], // Optional array of classes to remove
  soundToPlay = null, // Optional sound to play
  pauseFunction = null, // Optional pause function
  animationDuration = 0 // Optional animation duration (in milliseconds)
) {
  bars.forEach((bar) => {
    // Remove classes if provided
    classToRemove.forEach((cls) => bar.classList.remove(cls));

    // Update background color if provided
    if (backgroundColor) {
      bar.style.background = backgroundColor;
    }

    // Add class if provided
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

export function isArraySorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) return false;
  }
  return true;
}
