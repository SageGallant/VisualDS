async function bubbleSort() {
  const selection = Array.from(visualization.children);
  for (let i = 0; i < bars.length - 1 && isRunning; i++) {
    bars.forEach((_barValue, idx) => {
      const adjustedIdx = idx - i;
      if (adjustedIdx >= 0) selection[adjustedIdx].style.background = "white";
    });
    for (let j = 0; j < bars.length - i - 1 && isRunning; j++) {
      loopValues.textContent = `Phase: ${i}, Compare: ${j}`;
      currentOperation.textContent = `Comparing bars ${j} and ${j + 1}`;
      selection[j].style.background = selection[j + 1].style.background =
        "orange";
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
          "green",
          "jump",
          sounds.jump
        );

        currentOperation.textContent = `Swapped bars ${j} and ${j + 1}`;
        await pause();
      } else {
        updateBarsWithSound(
          [selection[j], selection[j + 1]],
          "red",
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
    soundToPlay.play();
  });
}
