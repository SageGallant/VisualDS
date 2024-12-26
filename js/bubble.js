import { isRunning } from "../script.js";
const COLORS = {
  default: "white",
  compare: "orange",
  swap: "green",
  incorrect: "red",
};

export async function bubbleSort() {
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
