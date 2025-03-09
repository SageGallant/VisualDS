const loopValues = document.querySelector("#loop-values");
const currentOperation = document.querySelector("#current-operation");
const barCountInput = document.querySelector("#bar-count");
const barValuesInput = document.getElementById("bar-values");
const speedInput = document.querySelector("#speed");
const startButton = document.querySelector("#start");
const visualization = document.querySelector("#visualization");

const sounds = {
  slap: new Audio("../../assets/audio/sorting/slap.mp3"),
  jump: new Audio("../../assets/audio/sorting/jump.mp3"),
  compare: new Audio("../../assets/audio/sorting/nextLevel.mp3"),
  phase: new Audio("../../assets/audio/sorting/finish.mp3"),
};
isRunning = false;

let bars = [],
  speed = parseInt(speedInput.value, 10),
  animation = null,
  isPaused = false; // Add this state variable
let currentI = 0,
  currentJ = 0; // Add these state variables at the top with other variables
speedInput.addEventListener("input", () => {
  speed = parseInt(speedInput.value, 10); // Parse to integer here as well!
  document.getElementById("speed-value").textContent = speed;
});

const COLORS = {
  get default() {
    return getComputedStyle(document.body)
      .getPropertyValue("--text-color")
      .trim();
  },
  get compare() {
    return getComputedStyle(document.body)
      .getPropertyValue("--comparing-color")
      .trim();
  },
  get swap() {
    return getComputedStyle(document.body)
      .getPropertyValue("--swapping-color")
      .trim();
  },
  get incorrect() {
    return getComputedStyle(document.body)
      .getPropertyValue("--secondary-color")
      .trim();
  },
};

function createBars() {
  const barCount = parseInt(barCountInput.value, 10);
  const barValues = barValuesInput.value;
  if (barValues) {
    if (barValues && barValues.split(",").every((v) => !isNaN(+v.trim()))) {
      bars = barValues.split(",").map((v) => +v.trim());
    } else {
      alert("Please enter valid numeric values for bars.");
      return; // Return early if invalid input
    }
  } else {
    bars = Array.from({ length: barCount }, () =>
      Math.floor(Math.random() * 100)
    );
  }

  visualization.innerHTML = "";
  bars.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}%`;
    bar.style.width = `${100 / bars.length - 1}%`;
    bar.textContent = Math.floor(value); // Inverts div positioning;
    visualization.appendChild(bar);
  });
}

function pause() {
  return new Promise((resolve) => setTimeout(resolve, speed));
}

function startAnimation() {
  if (!isRunning) {
    // Initial start
    isRunning = true;
    isPaused = false;
    startButton.textContent = "Pause";
    bubbleSort();
  } else {
    if (isPaused) {
      // Resume
      isPaused = false;
      startButton.textContent = "Pause";
      bubbleSort();
    } else {
      // Pause
      isPaused = true;
      startButton.textContent = "Resume";
    }
  }
}

// Remove stopAnimation function as it's no longer needed

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
    setTimeout(() => bar.classList.remove(classToAdd), 500); // Remove class after animation duration
  });
  soundToPlay.play();
}

function isArraySorted(array) {
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) return false;
  }
  return true;
}

// Modify the start button event listener
startButton.addEventListener("click", startAnimation);

// Modify reset button event listener
document.querySelector("#reset").addEventListener("click", () => {
  isRunning = false;
  isPaused = false;
  currentI = currentJ = 0;
  startButton.textContent = "Start";
  createBars();
  currentOperation.textContent = "Reset complete";
});

async function bubbleSort() {
  const selection = Array.from(visualization.children);
  let i = currentI,
    j = currentJ;

  if (isArraySorted(bars)) {
    currentOperation.textContent = "Already Sorted!";
    isRunning = false;
    isPaused = false;
    startButton.textContent = "Start";
    currentI = currentJ = 0;
    return;
  }

  // Continue from where we left off if paused
  while (i < bars.length - 1 && isRunning) {
    bars.forEach((_barValue, idx) => {
      const adjustedIdx = idx - i;
      if (adjustedIdx >= 0)
        selection[adjustedIdx].style.background = COLORS.default;
    });

    // inner loop
    while (j < bars.length - i - 1 && isRunning) {
      if (isPaused) {
        // Store current progress
        currentI = i;
        currentJ = j;
        return;
      }

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
      updateBars([selection[j], selection[j + 1]], ["shake", "jump"], "green");
      j++;
    }
    // Add jelly animation to all bars after inner loop
    selection.forEach((bar) => {
      bar.classList.add("jelly");
      setTimeout(() => bar.classList.remove("jelly"), 600);
    });
    j = 0;
    if (i < bars.length - 2) sounds.compare.play();
    await pause();
    i++;
  }
  currentOperation.textContent = "Bubble Sort Complete";
  sounds.phase.play();
  isRunning = false;
  isPaused = false;
  startButton.textContent = "Start";
  currentI = currentJ = 0;
}

createBars();
