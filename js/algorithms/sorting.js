import { pause } from "../utils.js";
import { playSound } from "../soundManager.js";
const visualization = document.querySelector("#visualization");
const loopValues = document.querySelector("#loop-values");
const currentOperation = document.querySelector("#current-operation");

export async function bubbleSort() {
  const bars = Array.from(visualization.children);
  const values = bars.map((bar) => parseInt(bar.style.height, 10));

  for (let i = 0; i < values.length - 1; i++) {
    for (let j = 0; j < values.length - i - 1; j++) {
      loopValues.textContent = `Phase: ${i}, Compare: ${j}`;
      currentOperation.textContent = `Comparing bars ${j} and ${j + 1}`;

      bars[j].style.background = bars[j + 1].style.background = "orange";
      await pause(500);

      if (values[j] > values[j + 1]) {
        [values[j], values[j + 1]] = [values[j + 1], values[j]];
        [bars[j].style.height, bars[j + 1].style.height] = [
          bars[j + 1].style.height,
          bars[j].style.height,
        ];
        [bars[j].textContent, bars[j + 1].textContent] = [
          values[j],
          values[j + 1],
        ];
        playSound("swap");
      } else {
        playSound("noSwap");
      }

      bars[j].style.background = bars[j + 1].style.background = "blue";
    }
    playSound("loop");
    await pause(500);
  }
  currentOperation.textContent = "Bubble Sort Complete";
  playSound("complete");
}
