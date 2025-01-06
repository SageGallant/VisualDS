import { pause, COLORS, updateBars } from "../utils.js";
import { playSound } from "../soundManager.js";
import { isRunning } from "../app.js";

const visualization = document.querySelector("#visualization");
const loopvalues = document.querySelector("#loop-values");
const currentOperation = document.querySelector("#current-operation");

export async function bubble() {
  const selection = Array.from(visualization.children);
  const bar = selection.map((bar) => parseInt(bar.style.height, 10));

  for (let i = 0; i < bar.length - 1 && isRunning; i++) {
    selection.forEach((_barValues, idx) => {
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
        updateBars(
          [selection[j], selection[j + 1]],
          COLORS.swap, // Background color
          "jump", // Class to add
          [null], // Classes to remove (optional)
          "swap" // Sound to play
        );

        currentOperation.textContent = `Swapped bars ${j} and ${j + 1}`;
        await pause();
      } else {
        updateBars(
          [selection[j], selection[j + 1]],
          COLORS.incorrect, // Background color
          "shake", // Class to add
          ["jump"], // Classes to remove (optional)
          "noSwap" // Sound to play
        );
        await pause();
      }
      updateBars(
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

export async function insertion() {
  const selection = Array.from(visualization.children);
  const bar = selection.map((bar) => parseInt(bar.style.height, 10));

  for (let i = 1; i < bar.length && isRunning; i++) {
    selection[i].style.background = COLORS.current;
    let key = bar[i];
    let j = i - 1;

    loopvalues.textContent = `Phase: ${i}, Key: ${key}`;
    currentOperation.textContent = `Placing bar ${i} in sorted section`;
    await pause();

    while (j >= 0 && bar[j] > key && isRunning) {
      selection[j].style.background = COLORS.compare;
      selection[j + 1].style.height = selection[j].style.height;
      selection[j + 1].textContent = bar[j];

      updateBars(
        [selection[j], selection[j + 1]],
        COLORS.swap,
        "jump",
        [null],
        "shift"
      );
      bar[j + 1] = bar[j];

      currentOperation.textContent = `Shifted bar ${j} to position ${j + 1}`;
      j--;
      await pause();

      selection[j + 1].style.background = COLORS.default;
    }

    bar[j + 1] = key;
    selection[j + 1].style.height = `${key}px`;
    selection[j + 1].textContent = key;

    updateBars([selection[j + 1]], COLORS.correct, "place", ["jump"], "place");

    currentOperation.textContent = `Placed bar ${i} at position ${j + 1}`;
    selection[j + 1].style.background = COLORS.sorted;
    await pause();

    // Reset colors for all previous elements
    for (let k = 0; k <= i; k++) {
      selection[k].style.background = COLORS.sorted;
    }
  }

  playSound("complete");
  currentOperation.textContent = "Insertion Sort Complete";
}
