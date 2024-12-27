import { pause, COLORS, updateBarsWithOptions } from "../utils.js";
import { playSound } from "../soundManager.js";
import { isRunning } from "../app.js";

const visualization = document.querySelector("#visualization");
const loopvalues = document.querySelector("#loop-values");
const currentOperation = document.querySelector("#current-operation");

export async function bubble() {
  const selection = Array.from(visualization.children);
  const bar = selection.map((bar) => parseInt(bar.style.height, 10));

  for (let i = 0; i < bar.length - 1 && isRunning; i++) {
    selection.forEach((idx) => {
      const adjustedIdx = idx - i;
      if (adjustedIdx >= 0)
        selection[adjustedIdx].style.background = COLORS.default;
    });
    for (let j = 0; j < bar.length - i - 1 && isRunning; j++) {
      loopvalues.textContent = `Phase: ${i}, Compare: ${j}`;
      currentOperation.textContent = `Comparing selection ${j} and ${j + 1}`;

      selection[j].style.background = selection[j + 1].style.background =
        COLORS.compare;
      await pause();

      if (bar[j] > bar[j + 1]) {
        [bar[j], bar[j + 1]] = [bar[j + 1], bar[j]];
        [selection[j].style.height, selection[j + 1].style.height] = [
          selection[j + 1].style.height,
          selection[j].style.height,
        ];
        [selection[j].textContent, selection[j + 1].textContent] = [
          bar[j],
          bar[j + 1],
        ];
        updateBarsWithOptions(
          [selection[j], selection[j + 1]],
          COLORS.swap, // Background color
          "jump", // Class to add
          [null], // Classes to remove (optional)
          "swap" // Sound to play
        );

        currentOperation.textContent = `Swapped bars ${j} and ${j + 1}`;
        await pause();
      } else {
        // updateBarsWithSound(
        //   [selection[j], selection[j + 1]],
        //   COLORS.incorrect,
        //   "shake",
        //   "noSwap"
        // );
        updateBarsWithOptions(
          [selection[j], selection[j + 1]],
          COLORS.incorrect, // Background color
          "shake", // Class to add
          ["jump"], // Classes to remove (optional)
          "noSwap" // Sound to play
        );
        await pause();
      }
      // updateBars(
      //   [selection[j], selection[j + 1]],
      //   ["shake", "jump"],
      //   COLORS.sorted
      // );
      updateBarsWithOptions(
        [selection[j], selection[j + 1]],
        COLORS.sorted, // Background color
        null, // No class to add
        ["shake", "jump"], // Classes to remove
        null // No sound to play
      );
    }
    selection.forEach((bar) => {
      bar.classList.add("finish");
      setTimeout(() => bar.classList.remove("finish"), 500); // Remove class after animation duration
    });
    if (i < bar.length - 2) playSound("loop");
    await pause();
  }
  playSound("complete");
  currentOperation.textContent = "Bubble Sort Complete";
}

export async function insertionSort() {
  const selection = Array.from(visualization.children);
  const bar = selection.map((bar) => parseInt(bar.style.height, 10));

  for (let i = 1; i < bar.length; i++) {
    loopbar.textContent = `Phase: ${i}`;
    currentOperation.textContent = `Inserting bar ${i}`;

    let currentVal = bar[i];
    let currentBar = selection[i];

    let j = i - 1;
    // Highlight the current bar
    currentBar.style.background = "orange";
    await pause(500);

    // Shift elements of the sorted portion of the array that are greater than currentVal
    while (j >= 0 && bar[j] > currentVal) {
      selection[j].style.background = "red"; // Highlight the bar that's being shifted
      await pause(500);

      bar[j + 1] = bar[j]; // Shift the value to the right
      selection[j + 1].style.height = selection[j].style.height; // Move the bar

      selection[j].textContent = bar[j]; // Update the text on the selection
      j--;

      // Reset the background color after the shift
      if (j >= 0) {
        selection[j].style.background = "blue"; // Reset the color for the bar that's not being moved
      }
    }

    // Insert the current value at its correct position
    bar[j + 1] = currentVal;
    selection[j + 1].style.height = `${currentVal}px`;
    selection[j + 1].textContent = currentVal;

    // Reset the color of the inserted bar to blue
    currentBar.style.background = "blue";
    playSound("shift");
    await pause(500);
  }

  currentOperation.textContent = "Insertion Sort Complete";
  playSound("complete");
}
