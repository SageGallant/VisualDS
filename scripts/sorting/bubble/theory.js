function initializeTheory() {
  const resetVisual = document.getElementById("resetVisual");
  const nextStep = document.getElementById("nextStep");
  const arrayVisual = document.getElementById("arrayVisual");

  let currentArray = [64, 6, 25, 12, 22, 11, 90];
  let currentStep = 0;

  function displayArray(array, highlightIndices = []) {
    if (!arrayVisual) return;

    arrayVisual.innerHTML = "";
    array.forEach((value, index) => {
      const element = document.createElement("div");
      element.className = "array-element";
      element.textContent = value;
      if (highlightIndices.includes(index)) {
        element.classList.add("highlighted");
      }
      arrayVisual.appendChild(element);
    });
  }

  if (resetVisual && nextStep && arrayVisual) {
    displayArray(currentArray);

    resetVisual.addEventListener("click", () => {
      currentStep = 0;
      displayArray(currentArray);
    });

    nextStep.addEventListener("click", () => {
      // Simplified demonstration steps
      switch (currentStep % 4) {
        case 0:
          displayArray(currentArray, [0, 1]);
          break;
        case 1:
          displayArray([6, 64, 25, 12, 22, 11, 90], [1, 2]);
          break;
        case 2:
          displayArray([6, 25, 64, 12, 22, 11, 90], [2, 3]);
          break;
        case 3:
          displayArray(currentArray);
          break;
      }
      currentStep++;
    });
  }
}

// Make function globally available
window.initializeTheory = initializeTheory;
