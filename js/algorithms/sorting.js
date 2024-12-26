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


export async function insertionSort() {
  const bars = Array.from(visualization.children);
  const values = bars.map((bar) => parseInt(bar.style.height, 10));

  for (let i = 1; i < values.length; i++) {
    loopValues.textContent = `Phase: ${i}`;
    currentOperation.textContent = `Inserting bar ${i}`;

    let currentVal = values[i];
    let currentBar = bars[i];

    let j = i - 1;
    // Highlight the current bar
    currentBar.style.background = "orange";
    await pause(500);

    // Shift elements of the sorted portion of the array that are greater than currentVal
    while (j >= 0 && values[j] > currentVal) {
      bars[j].style.background = "red";  // Highlight the bar that's being shifted
      await pause(500);

      values[j + 1] = values[j];  // Shift the value to the right
      bars[j + 1].style.height = bars[j].style.height;  // Move the bar

      bars[j].textContent = values[j];  // Update the text on the bars
      j--;

      // Reset the background color after the shift
      if (j >= 0) {
        bars[j].style.background = "blue";  // Reset the color for the bar that's not being moved
      }
    }

    // Insert the current value at its correct position
    values[j + 1] = currentVal;
    bars[j + 1].style.height = `${currentVal}px`;
    bars[j + 1].textContent = currentVal;

    // Reset the color of the inserted bar to blue
    currentBar.style.background = "blue";
    playSound("shift");
    await pause(500);
  }

  currentOperation.textContent = "Insertion Sort Complete";
  playSound("complete");
}
