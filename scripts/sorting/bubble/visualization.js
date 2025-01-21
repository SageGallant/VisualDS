class BubbleSortVisualizer {
  constructor() {
    this.array = [];
    this.arraySize = 20;
    this.maxValue = 100;
    this.delay = 100;
    this.isRunning = false;
    this.isPaused = false;

    // DOM Elements
    this.arrayContainer = document.getElementById("arrayContainer");
    this.startButton = document.getElementById("startSort");
    this.pauseButton = document.getElementById("pauseSort");
    this.resetButton = document.getElementById("resetSort");
    this.generateButton = document.getElementById("generateArray");
    this.speedControl = document.getElementById("sortingSpeed");

    // Statistics Elements
    this.comparisonsElement = document.getElementById("comparisons");
    this.swapsElement = document.getElementById("swaps");
    this.currentPassElement = document.getElementById("currentPass");

    // Statistics
    this.comparisons = 0;
    this.swaps = 0;
    this.currentPass = 0;

    // Bind event listeners
    this.bindEvents();

    // Initialize
    this.generateNewArray();
  }

  bindEvents() {
    this.startButton.addEventListener("click", () => this.startSorting());
    this.pauseButton.addEventListener("click", () => this.pauseSorting());
    this.resetButton.addEventListener("click", () => this.resetSorting());
    this.generateButton.addEventListener("click", () =>
      this.generateNewArray()
    );
    this.speedControl.addEventListener("input", (e) => {
      this.delay = 1000 / e.target.value;
    });
  }

  generateNewArray() {
    this.array = Array.from(
      { length: this.arraySize },
      () => Math.floor(Math.random() * this.maxValue) + 1
    );
    this.resetStatistics();
    this.visualizeArray();
  }

  resetStatistics() {
    this.comparisons = 0;
    this.swaps = 0;
    this.currentPass = 0;
    this.updateStatistics();
  }

  updateStatistics() {
    this.comparisonsElement.textContent = this.comparisons;
    this.swapsElement.textContent = this.swaps;
    this.currentPassElement.textContent = this.currentPass;
  }

  visualizeArray(
    comparingIndices = [],
    swappingIndices = [],
    sortedIndices = []
  ) {
    this.arrayContainer.innerHTML = "";

    this.array.forEach((value, index) => {
      const bar = document.createElement("div");
      bar.className = "array-bar";
      bar.style.height = `${(value / this.maxValue) * 100}%`;

      if (comparingIndices.includes(index)) {
        bar.classList.add("comparing");
      }
      if (swappingIndices.includes(index)) {
        bar.classList.add("swapping");
      }
      if (sortedIndices.includes(index)) {
        bar.classList.add("sorted");
      }

      this.arrayContainer.appendChild(bar);
    });
  }

  async startSorting() {
    if (this.isRunning && this.isPaused) {
      this.isPaused = false;
      this.pauseButton.textContent = "Pause";
      return;
    }

    if (this.isRunning) return;

    this.isRunning = true;
    this.startButton.disabled = true;
    this.generateButton.disabled = true;
    this.pauseButton.disabled = false;

    const n = this.array.length;
    const sortedIndices = [];

    for (let i = 0; i < n - 1; i++) {
      this.currentPass = i + 1;
      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        if (this.isPaused) {
          await new Promise((resolve) => {
            const checkPause = () => {
              if (!this.isPaused) {
                resolve();
              } else {
                setTimeout(checkPause, 100);
              }
            };
            checkPause();
          });
        }

        // Visualize comparison
        this.comparisons++;
        this.visualizeArray([j, j + 1], [], sortedIndices);
        await this.sleep(this.delay);

        if (this.array[j] > this.array[j + 1]) {
          // Visualize swap
          this.swaps++;
          this.visualizeArray([j, j + 1], [j, j + 1], sortedIndices);
          await this.sleep(this.delay);

          // Perform swap
          [this.array[j], this.array[j + 1]] = [
            this.array[j + 1],
            this.array[j],
          ];
          swapped = true;
        }
      }

      sortedIndices.push(n - i - 1);
      this.visualizeArray([], [], sortedIndices);

      if (!swapped) break;
    }

    this.isRunning = false;
    this.pauseButton.disabled = true;
    this.startButton.disabled = false;
    this.generateButton.disabled = false;
  }

  async pauseSorting() {
    if (!this.isRunning) return;

    this.isPaused = !this.isPaused;
    this.pauseButton.textContent = this.isPaused ? "Resume" : "Pause";
  }

  resetSorting() {
    if (this.isRunning) {
      this.isRunning = false;
      this.isPaused = false;
    }
    this.generateNewArray();
    this.pauseButton.disabled = true;
    this.startButton.disabled = false;
    this.generateButton.disabled = false;
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
