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
    visualization.appendChild(barDiv);
  });
}
async function bubbleSort() {
  const selection = Array.from(visualization.children);

  for (let i = 0; i < bars.length - 1; i++) {
    if (!isRunning) break;

    // reset bars color on each phase start.
    bars.forEach((barValue, idx) => {
      const adjustedIdx = idx - i;
      if (adjustedIdx >= 0) selection[adjustedIdx].style.background = "orange";
    });

    for (let j = 0; j < bars.length - i - 1; j++) {
      if (!isRunning) break;

      loopValues.textContent = `I: ${i}, J: ${j}`;
      currentOperation.textContent = `Comparing bars ${j} and ${j + 1}`;

      [selection[j], selection[j + 1]].forEach((bar) => {
        bar.style.background = "red";
        bar.classList.add("shake");
      });

      await pause();

      if (bars[j] > bars[j + 1]) {
        bars.forEach((barValue, idx) => {
          selection[idx].style.height = `${barValue}%`;
        });
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];

        [selection[j], selection[j + 1]].forEach((bar) => {
          bar.style.background = "green";
          bar.classList.add("jump");
        });

        currentOperation.textContent = `Swapped bars ${j} and ${j + 1}`;
        await pause();
      }

      [selection[j], selection[j + 1]].forEach((bar) => {
        bar.classList.remove("shake", "jump");
        bar.style.background = "blue";
      });
    }
  }

  currentOperation.textContent = "Bubble Sort Complete";
  stopAnimation();
}

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
