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

      loopValues.textContent = `Phase: ${i}, Compare: ${j}`;
      currentOperation.textContent = `Comparing bars ${j} and ${j + 1}`;

      [selection[j], selection[j + 1]].forEach((bar) => {
        bar.style.background = "red";
        bar.classList.add("shake");
      });

      // await pause();

      // Comparing bars.
      if (bars[j] > bars[j + 1]) {
        bars.forEach((barValue, idx) => {
          selection[idx].style.height = `${barValue}%`;
          selection[idx].textContent = barValue;
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
  stopAnimation(); // Bubble sort ends here.
}
