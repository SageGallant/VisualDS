class BubbleSortVisualizer {
  constructor() {
    this.array = [];
    this.arrayContainer = document.getElementById("arrayContainer");
    this.generateArrayBtn = document.getElementById("generateArray");
    this.startSortBtn = document.getElementById("startSort");
    this.pauseSortBtn = document.getElementById("pauseSort");
    this.resetSortBtn = document.getElementById("resetSort");
    this.speedControl = document.getElementById("sortingSpeed");
    this.comparisons = 0;
    this.swaps = 0;
    this.currentPass = 0;
    this.isPaused = false;
    this.isRunning = false;

    this.initializeEventListeners();
    this.generateNewArray();
  }

  initializeEventListeners() {
    this.generateArrayBtn.addEventListener("click", () =>
      this.generateNewArray()
    );
    this.startSortBtn.addEventListener("click", () => this.startSort());
    this.pauseSortBtn.addEventListener("click", () => this.togglePause());
    this.resetSortBtn.addEventListener("click", () => this.reset());
  }

  generateNewArray() {
    this.array = Array.from(
      { length: 20 },
      () => Math.floor(Math.random() * 100) + 1
    );
    this.updateVisuals();
    this.resetCounters();
  }

  updateVisuals() {
    this.arrayContainer.innerHTML = "";
    this.array.forEach((value) => {
      const bar = document.createElement("div");
      bar.className = "array-bar";
      bar.style.height = `${value * 3}px`;
      this.arrayContainer.appendChild(bar);
    });
  }

  async startSort() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startSortBtn.disabled = true;
    this.pauseSortBtn.disabled = false;

    const n = this.array.length;
    for (let i = 0; i < n - 1; i++) {
      this.currentPass = i + 1;
      document.getElementById("currentPass").textContent = this.currentPass;

      for (let j = 0; j < n - i - 1; j++) {
        if (this.isPaused) {
          await new Promise((resolve) => {
            const checkPause = setInterval(() => {
              if (!this.isPaused) {
                clearInterval(checkPause);
                resolve();
              }
            }, 100);
          });
        }

        this.comparisons++;
        document.getElementById("comparisons").textContent = this.comparisons;

        const bars = this.arrayContainer.children;
        bars[j].classList.add("comparing");
        bars[j + 1].classList.add("comparing");

        await this.delay();

        if (this.array[j] > this.array[j + 1]) {
          this.swaps++;
          document.getElementById("swaps").textContent = this.swaps;

          bars[j].classList.add("swapping");
          bars[j + 1].classList.add("swapping");

          await this.delay();

          [this.array[j], this.array[j + 1]] = [
            this.array[j + 1],
            this.array[j],
          ];
          this.updateVisuals();
        }

        bars[j].classList.remove("comparing", "swapping");
        bars[j + 1].classList.remove("comparing", "swapping");
      }
    }

    this.isRunning = false;
    this.startSortBtn.disabled = false;
    this.pauseSortBtn.disabled = true;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    this.pauseSortBtn.textContent = this.isPaused ? "Resume" : "Pause";
  }

  reset() {
    this.isPaused = false;
    this.isRunning = false;
    this.startSortBtn.disabled = false;
    this.pauseSortBtn.disabled = true;
    this.generateNewArray();
  }

  resetCounters() {
    this.comparisons = 0;
    this.swaps = 0;
    this.currentPass = 0;
    document.getElementById("comparisons").textContent = "0";
    document.getElementById("swaps").textContent = "0";
    document.getElementById("currentPass").textContent = "0";
  }

  delay() {
    const speed = this.speedControl.value;
    const delayTime = 1000 - speed * 9;
    return new Promise((resolve) => setTimeout(resolve, delayTime));
  }
}

// Initialize the visualizer when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new BubbleSortVisualizer();
});

// Add this line at the end of the file to make the class globally available
window.BubbleSortVisualizer = BubbleSortVisualizer;
