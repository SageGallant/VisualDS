function initializeTheory() {
  // Initialize any interactive elements in the theory page
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  // If there are tab buttons, add event listeners
  if (tabButtons && tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const target = button.getAttribute("data-target");

        // Update active button
        tabButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        // Show target content
        tabContents.forEach((content) => {
          content.classList.remove("active");
          if (content.id === target) {
            content.classList.add("active");
          }
        });
      });
    });
  }
}

// Register the initialization function globally
window.initializeTheory = initializeTheory;

// Auto-initialize if loaded directly
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeTheory);
} else {
  initializeTheory();
}
