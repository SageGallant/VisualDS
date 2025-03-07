class BubbleSortVisualizer {
  constructor() {
    this.initializeElements();
    this.initializeEventListeners();
    this.resetArray();
  }

  initializeElements() {
    // Get DOM elements
    this.arrayContainer = document.getElementById("arrayContainer");
    this.generateArrayBtn = document.getElementById("generateArray");
    this.startSortBtn = document.getElementById("startSort");
    this.pauseSortBtn = document.getElementById("pauseSort");
    this.resetSortBtn = document.getElementById("resetSort");
    this.sortingSpeedSlider = document.getElementById("sortingSpeed");
    this.comparisonsElement = document.getElementById("comparisons");
    this.swapsElement = document.getElementById("swaps");
    this.currentPassElement = document.getElementById("currentPass");

    // Initialize state variables
    this.array = [];
    this.arraySize = 20; // Default size
    this.maxValue = 100;
    this.delay = 100;
    this.comparisons = 0;
    this.swaps = 0;
    this.currentPass = 0;
    this.isSorting = false;
    this.isPaused = false;
    this.sortingPromise = null;
  }

  initializeEventListeners() {
    this.generateArrayBtn.addEventListener("click", () => this.resetArray());
    this.startSortBtn.addEventListener("click", () => this.handleStartSort());
    this.pauseSortBtn.addEventListener("click", () => this.handlePauseSort());
    this.resetSortBtn.addEventListener("click", () => this.resetSort());
    this.sortingSpeedSlider.addEventListener("input", () => this.updateSpeed());
  }

  resetArray() {
    // Clear previous array
    this.arrayContainer.innerHTML = "";
    this.array = [];

    // Generate new random array
    for (let i = 0; i < this.arraySize; i++) {
      const value = Math.floor(Math.random() * this.maxValue) + 5;
      this.array.push(value);
    }

    // Create visual elements
    this.createArrayElements();

    // Reset counters
    this.resetCounters();
  }

  createArrayElements() {
    const maxVal = Math.max(...this.array);

    this.arrayContainer.innerHTML = "";
    this.array.forEach((val, idx) => {
      const bar = document.createElement("div");
      bar.className = "array-bar";
      bar.style.height = `${(val / maxVal) * 100}%`;
      bar.setAttribute("data-value", val);

      const valueLabel = document.createElement("span");
      valueLabel.className = "value-label";
      valueLabel.textContent = val;

      bar.appendChild(valueLabel);
      this.arrayContainer.appendChild(bar);
    });
  }

  resetCounters() {
    this.comparisons = 0;
    this.swaps = 0;
    this.currentPass = 0;
    this.updateStats();
  }

  updateStats() {
    this.comparisonsElement.textContent = this.comparisons;
    this.swapsElement.textContent = this.swaps;
    this.currentPassElement.textContent = this.currentPass;
  }

  updateSpeed() {
    // Convert slider value (1-100) to delay (500ms - 10ms)
    // Higher slider value = faster speed = lower delay
    this.delay = 510 - this.sortingSpeedSlider.value * 5;
  }

  handleStartSort() {
    if (this.isSorting && this.isPaused) {
      // Resume sorting
      this.isPaused = false;
      this.startSortBtn.textContent = "Pause";
      this.pauseSortBtn.disabled = false;
    } else if (!this.isSorting) {
      // Start new sorting
      this.isSorting = true;
      this.isPaused = false;
      this.startSortBtn.textContent = "Pause";
      this.pauseSortBtn.disabled = false;
      this.generateArrayBtn.disabled = true;
      this.resetSortBtn.disabled = true;

      // Start bubble sort
      this.bubbleSort();
    }
  }

  handlePauseSort() {
    if (this.isSorting && !this.isPaused) {
      this.isPaused = true;
      this.startSortBtn.textContent = "Resume";
      this.pauseSortBtn.disabled = true;
    }
  }

  resetSort() {
    // Cancel any ongoing sorting
    this.isSorting = false;
    this.isPaused = false;

    // Reset UI
    this.startSortBtn.textContent = "Start Sorting";
    this.pauseSortBtn.disabled = true;
    this.generateArrayBtn.disabled = false;
    this.resetSortBtn.disabled = false;

    // Reset array and counters
    this.resetArray();
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async bubbleSort() {
    const n = this.array.length;
    const bars = document.querySelectorAll(".array-bar");

    for (let i = 0; i < n; i++) {
      this.currentPass = i + 1;
      this.updateStats();

      let swapped = false;

      for (let j = 0; j < n - i - 1; j++) {
        // Wait if paused
        while (this.isPaused) {
          await this.sleep(100);
          if (!this.isSorting) return; // Exit if reset
        }

        // Highlight bars being compared
        bars[j].classList.add("comparing");
        bars[j + 1].classList.add("comparing");

        this.comparisons++;
        this.updateStats();

        await this.sleep(this.delay);

        if (this.array[j] > this.array[j + 1]) {
          // Swap the elements
          [this.array[j], this.array[j + 1]] = [
            this.array[j + 1],
            this.array[j],
          ];

          // Update visual representation
          bars[j].style.height = `${(this.array[j] / this.maxValue) * 100}%`;
          bars[j + 1].style.height = `${
            (this.array[j + 1] / this.maxValue) * 100
          }%`;

          bars[j].setAttribute("data-value", this.array[j]);
          bars[j + 1].setAttribute("data-value", this.array[j + 1]);

          bars[j].querySelector(".value-label").textContent = this.array[j];
          bars[j + 1].querySelector(".value-label").textContent =
            this.array[j + 1];

          // Highlight swapped bars
          bars[j].classList.add("swapping");
          bars[j + 1].classList.add("swapping");

          swapped = true;
          this.swaps++;
          this.updateStats();

          await this.sleep(this.delay);

          bars[j].classList.remove("swapping");
          bars[j + 1].classList.remove("swapping");
        } else {
          // Highlight non-swapped bars
          bars[j].classList.add("not-swapping");
          bars[j + 1].classList.add("not-swapping");

          await this.sleep(this.delay / 2);

          bars[j].classList.remove("not-swapping");
          bars[j + 1].classList.remove("not-swapping");
        }

        // Remove comparison highlight
        bars[j].classList.remove("comparing");
        bars[j + 1].classList.remove("comparing");
      }

      // Mark the last element of this pass as sorted
      bars[n - i - 1].classList.add("sorted");

      // If no swaps were made in this pass, the array is sorted
      if (!swapped) break;
    }

    // Mark all elements as sorted when complete
    for (let i = 0; i < bars.length; i++) {
      if (!bars[i].classList.contains("sorted")) {
        bars[i].classList.add("sorted");
        await this.sleep(50);
      }
    }

    // Reset UI state
    this.isSorting = false;
    this.startSortBtn.textContent = "Start Sorting";
    this.pauseSortBtn.disabled = true;
    this.generateArrayBtn.disabled = false;
    this.resetSortBtn.disabled = false;
  }
}

// Initialize the visualizer when the page loads
document.addEventListener("DOMContentLoaded", () => {
  window.BubbleSortVisualizer = BubbleSortVisualizer;
});
