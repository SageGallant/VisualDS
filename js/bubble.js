// import { bars } from "../script.js";
async function bubbleSort() {
  const selection = Array.from(visualization.children);

  for (let i = 0; i < bars.length - 1; i++) {
    if (!isRunning) break;

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
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];

        bars.forEach((barValue, idx) => {
          selection[idx].style.height = `${barValue}%`;
          selection[idx].style.background = "green";
        });

        [selection[j], selection[j + 1]].forEach((bar) => {
          bar.classList.add("jump");
        });

        currentOperation.textContent = `Swapped bars ${j} and ${j + 1}`;
        await pause();
      }

      [selection[j], selection[j + 1]].forEach((bar) => {
        bar.classList.remove("shake", "jump");
        bar.style.background = "green";
      });
    }
  }

  currentOperation.textContent = "Bubble Sort Complete";
  stopAnimation();
}

// export default function bubbleSort();
