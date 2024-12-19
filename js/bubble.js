async function bubbleSort() {
  const selection = Array.from(visualization.children);

  for (let i = 0; i < bars.length - 1; i++) {
    if (!isRunning) break;

    // reset bars color on each phase start
    bars.forEach((_barValue, idx) => {
      const adjustedIdx = idx - i;
      if (adjustedIdx >= 0) selection[adjustedIdx].style.background = "orange";
    });

    for (let j = 0; j < bars.length - i - 1; j++) {
      if (!isRunning) break;

      loopValues.textContent = `Phase: ${i}, Compare: ${j}`;
      currentOperation.textContent = `Comparing bars ${j} and ${j + 1}`;

      [selection[j], selection[j + 1]].forEach((bar) => {
        bar.style.background = "white";
        // bar.classList.add("shake");
      });

      await pause();

      // Comparing bars.
      if (bars[j] > bars[j + 1]) {
        // Update the DOM immediately before swapping the values in the array.
        const tempHeight = selection[j].style.height;
        const tempText = selection[j].textContent;

        // Swap the visual elements
        selection[j].style.height = selection[j + 1].style.height;
        selection[j].textContent = selection[j + 1].textContent;
        selection[j + 1].style.height = tempHeight;
        selection[j + 1].textContent = tempText;

        // Perform the array swap after the visual update
        [bars[j], bars[j + 1]] = [bars[j + 1], bars[j]];

        // Highlight the swapped bars
        [selection[j], selection[j + 1]].forEach((bar) => {
          bar.style.background = "green";
          bar.classList.add("jump");
          jump.play();
        });

        currentOperation.textContent = `Swapped bars ${j} and ${j + 1}`;
        await pause();
      } else {
        [selection[j], selection[j + 1]].forEach((bar) => {
          bar.style.background = "red";
          bar.classList.add("shake");
        });
        slap.play();
        await pause();
      }

      // Reset the colors and remove effects
      [selection[j], selection[j + 1]].forEach((bar) => {
        bar.classList.remove("shake", "jump");
        bar.style.background = "blue";
      });
    }
    compare.play();
    await pause();
  }

  currentOperation.textContent = "Bubble Sort Complete";
  stopAnimation(); // Bubble sort ends here.
  phase.play();
}
