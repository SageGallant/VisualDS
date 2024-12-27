// import { bubbleSort } from "./js/bubble.js";

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
let bars = [],
  speed = parseInt(speedInput.value, 10);
(isRunning = false), (animation = null);
speedInput.addEventListener("input", () => {
  speed = speedInput.value;
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

function isArraySorted(array) {
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

// Bubble sort

const COLORS = {
  default: "white",
  compare: "orange",
  swap: "green",
  incorrect: "red",
};

async function bubbleSort() {
  const selection = Array.from(visualization.children);

  if (isArraySorted(bars)) {
    currentOperation.textContent = "Already Sorted!";
    stopAnimation();
    return;
  }
  for (let i = 0; i < bars.length - 1 && isRunning; i++) {
    bars.forEach((_barValue, idx) => {
      const adjustedIdx = idx - i;
      if (adjustedIdx >= 0)
        selection[adjustedIdx].style.background = COLORS.default;
    });

    for (let j = 0; j < bars.length - i - 1 && isRunning; j++) {
      loopValues.textContent = `Phase: ${i}, Compare: ${j}`;
      currentOperation.textContent = `Comparing bars ${j} and ${j + 1}`;

      selection[j].style.background = selection[j + 1].style.background =
        COLORS.compare;
      await pause();

      if (bars[j] > bars[j + 1]) {
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];
        [selection[j].style.height, selection[j + 1].style.height] = [
          selection[j + 1].style.height,
          selection[j].style.height,
        ];
        [selection[j].textContent, selection[j + 1].textContent] = [
          bars[j],
          bars[j + 1],
        ];
        updateBarsWithSound(
          [selection[j], selection[j + 1]],
          COLORS.swap,
          "jump",
          sounds.jump
        );

        currentOperation.textContent = `Swapped bars ${j} and ${j + 1}`;
        await pause();
      } else {
        updateBarsWithSound(
          [selection[j], selection[j + 1]],
          COLORS.incorrect,
          "shake",
          sounds.slap
        );

        await pause();
      }
      updateBars([selection[j], selection[j + 1]], ["shake", "jump"], "blue");
    }
    sounds.compare.play();
    await pause();
  }
  currentOperation.textContent = "Bubble Sort Complete";
  sounds.phase.play();
  stopAnimation();
}
