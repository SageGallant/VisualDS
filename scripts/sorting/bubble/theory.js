function initializeTheory() {
  const resetVisual = document.getElementById("resetVisual");
  const nextStep = document.getElementById("nextStep");
  const arrayVisual = document.getElementById("arrayVisual");

  // Original array
  let initialArray = [64, 6, 25, 12, 22, 11, 90];
  let currentArray = [...initialArray];
  let currentStep = 0;

  // Track the current pass and comparison
  let currentPass = 0;
  let currentComparison = 0;
  let sortingComplete = false;
  let isSwapping = false;
  let isSorted = [];

  // Create completion message element
  const createCompletionMessage = () => {
    // Remove any existing message first
    const existingMessage = document.querySelector(".completion-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageContainer = document.createElement("div");
    messageContainer.className = "completion-message";
    messageContainer.innerHTML = `
      <button class="close-button" aria-label="Close">&times;</button>
      <div class="message-content">
        <span class="success-icon">✓</span>
        <h3>Sorting Complete!</h3>
        <p>The array has been successfully sorted using Bubble Sort.</p>
      </div>
    `;

    // Add close button functionality
    setTimeout(() => {
      const closeButton = messageContainer.querySelector(".close-button");
      if (closeButton) {
        closeButton.addEventListener("click", removeCompletionMessage);
      }
    }, 0);

    // Add to the visual container
    const visualContent = document.querySelector(".visual-content");
    if (visualContent) {
      visualContent.appendChild(messageContainer);
    } else {
      // Fallback to append to array visual
      arrayVisual.parentNode.appendChild(messageContainer);
    }
  };

  // Remove completion message
  const removeCompletionMessage = () => {
    const existingMessage = document.querySelector(".completion-message");
    if (existingMessage) {
      existingMessage.remove();
    }
  };

  function displayArray(array, comparingIndices = [], swappingIndices = []) {
    if (!arrayVisual) return;

    arrayVisual.innerHTML = "";
    array.forEach((value, index) => {
      const element = document.createElement("div");
      element.className = "array-element";
      element.textContent = value;

      // Add appropriate classes based on the element's state
      if (comparingIndices.includes(index)) {
        element.classList.add("comparing");
      }
      if (swappingIndices.includes(index)) {
        element.classList.add("swapping");
      }
      if (isSorted.includes(index)) {
        element.classList.add("sorted");
      }

      arrayVisual.appendChild(element);
    });

    // Show completion message if sorting is complete
    if (sortingComplete) {
      createCompletionMessage();
    }
  }

  function bubbleSortStep() {
    if (sortingComplete) {
      return currentArray;
    }

    const n = currentArray.length;

    // If we've gone through all comparisons in the current pass
    if (currentComparison >= n - 1 - currentPass) {
      // Mark the last element of this pass as sorted
      isSorted.push(n - 1 - currentPass);

      // Move to the next pass
      currentPass++;
      currentComparison = 0;

      // Check if we've completed all passes
      if (currentPass >= n - 1) {
        sortingComplete = true;
        isSorted = Array.from({ length: n }, (_, i) => i); // Mark all as sorted
        displayArray(currentArray); // Show final state with all elements sorted
        return currentArray;
      }

      // Display the array with the newly sorted element
      displayArray(currentArray, [], []);
      return currentArray;
    }

    // Compare and potentially swap adjacent elements
    if (currentArray[currentComparison] > currentArray[currentComparison + 1]) {
      // First show the comparison
      if (!isSwapping) {
        displayArray(currentArray, [currentComparison, currentComparison + 1]);
        isSwapping = true;
        return currentArray;
      }

      // Then perform the swap
      const temp = currentArray[currentComparison];
      currentArray[currentComparison] = currentArray[currentComparison + 1];
      currentArray[currentComparison + 1] = temp;

      // Show the swap
      displayArray(
        currentArray,
        [],
        [currentComparison, currentComparison + 1]
      );
      isSwapping = false;
      currentComparison++;
      return currentArray;
    } else {
      // Just show the comparison if no swap is needed
      displayArray(currentArray, [currentComparison, currentComparison + 1]);
      currentComparison++;
      return currentArray;
    }
  }

  if (resetVisual && nextStep && arrayVisual) {
    // Initial display
    displayArray(currentArray);

    resetVisual.addEventListener("click", () => {
      // Reset all variables
      currentArray = [...initialArray];
      currentStep = 0;
      currentPass = 0;
      currentComparison = 0;
      sortingComplete = false;
      isSwapping = false;
      isSorted = [];

      // Remove completion message
      removeCompletionMessage();

      // Reset display
      displayArray(currentArray);
    });

    nextStep.addEventListener("click", () => {
      bubbleSortStep();
      currentStep++;

      // Update step indicators if needed
      const step1 = document.getElementById("step1");
      const step2 = document.getElementById("step2");
      const step3 = document.getElementById("step3");

      if (step1 && step2 && step3) {
        // Remove any active classes
        step1.classList.remove("active");
        step2.classList.remove("active");
        step3.classList.remove("active");

        // Add active class based on what's happening
        if (isSwapping) {
          step2.classList.add("active");
        } else if (sortingComplete) {
          step3.classList.add("active");
        } else {
          step1.classList.add("active");
        }
      }
    });
  }
}

// Make function globally available
window.initializeTheory = initializeTheory;
