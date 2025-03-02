document.addEventListener("DOMContentLoaded", function () {
  // Function to load HTML content and its associated script
  function loadContent(url, containerId) {
    // Remove any previously loaded script for this section
    const oldScript = document.querySelector(
      `script[data-section="${containerId}"]`
    );
    if (oldScript) {
      oldScript.remove();
    }

    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        const container = document.getElementById(containerId);
        container.innerHTML = html;

        // Create and load the associated script
        const scriptUrl = `../../scripts/sorting/bubble/${url.replace(
          ".html",
          ".php"
        )}`;

        // Verify if script exists before loading
        return fetch(scriptUrl).then((response) => {
          if (!response.ok) {
            console.log(`No script found for ${url}, skipping script load`);
            return Promise.resolve();
          }

          const script = document.createElement("script");
          script.src = scriptUrl;
          script.setAttribute("data-section", containerId);

          return new Promise((resolve, reject) => {
            script.onload = () => {
              console.log("Script loaded:", scriptUrl);
              resolve();
            };
            script.onerror = (error) => {
              console.error("Script failed to load:", scriptUrl, error);
              reject(error);
            };
            document.body.appendChild(script);
          });
        });
      })
      .catch((error) => {
        console.error("Content loading error:", error);
        document.getElementById(containerId).innerHTML =
          "<p>Content failed to load.</p>";
      });
  }

  // Cache DOM elements for navigation and theme toggling
  const steps = document.querySelectorAll(".step-item");
  const circles = document.querySelectorAll(".step-circle");
  const sections = document.querySelectorAll(".content-section");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const themeSelect = document.getElementById("theme-select");
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const progressFill = document.querySelector(".progress-fill");

  let currentStep = 0;
  let completedSteps = [false, false, false];

  // Handle URL parameters first
  const urlParams = new URLSearchParams(window.location.search);
  const sectionParam = urlParams.get("section");
  if (sectionParam) {
    switch (sectionParam) {
      case "concept":
        currentStep = 0;
        break;
      case "algorithm":
        currentStep = 1;
        break;
      case "visualization":
        currentStep = 2;
        break;
    }
  }

  // Load saved state if no URL parameters
  if (!sectionParam) {
    if (localStorage.getItem("currentStep")) {
      currentStep = parseInt(localStorage.getItem("currentStep"), 10);
    }
    if (localStorage.getItem("completedSteps")) {
      completedSteps = JSON.parse(localStorage.getItem("completedSteps"));
    }
  }

  // Load saved theme
  const savedTheme = localStorage.getItem("theme") || "default";
  themeSelect.value = savedTheme;
  if (savedTheme !== "default") {
    document.body.classList.add(`theme-${savedTheme}`);
  }

  function updateNav() {
    // Step updates
    steps.forEach((step, index) => {
      step.classList.remove("active", "completed");
      if (completedSteps[index]) {
        step.classList.add("completed");
        circles[index].textContent = "✓";
      } else {
        circles[index].textContent = index + 1;
      }
    });
    steps[currentStep].classList.add("active");

    // Update next button text
    const nextBtn = document.querySelector(".next-btn");
    nextBtn.textContent =
      currentStep === steps.length - 1 ? "Complete" : "Next";

    // Calculate and update progress fill
    const totalSteps = steps.length - 1; // 3 steps: 0, 1, 2
    const fillPercentage = (currentStep / totalSteps) * 100;
    const progressFill = document.querySelector(".progress-fill");
    if (progressFill) {
      progressFill.style.width = `${fillPercentage}%`;
      console.log("Progress width:", `${fillPercentage}%`); // Debug line
    }
  }

  function showSection(index) {
    sections.forEach((section, i) => {
      section.classList.remove("active");
    });
    sections[index].classList.add("active");

    // Load content for the visible section
    const contentMap = {
      0: { url: "theory.html", containerId: "theory-content" },
      1: { url: "algorithm.html", containerId: "algorithm-content" },
      2: { url: "visualization.html", containerId: "visualization-content" },
    };

    if (contentMap[index]) {
      loadContent(contentMap[index].url, contentMap[index].containerId).then(
        () => {
          switch (index) {
            case 0:
              if (window.initializeTheory) {
                window.initializeTheory();
              }
              break;
            case 1:
              if (window.initializeAlgorithm) {
                window.initializeAlgorithm();
              }
              break;
            case 2:
              if (window.BubbleSortVisualizer) {
                new window.BubbleSortVisualizer();
              }
              break;
          }
        }
      );
    }

    currentStep = index;
    localStorage.setItem("currentStep", currentStep);
    updateNav();
  }

  nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < sections.length - 1) {
        completedSteps[currentStep] = true;
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
        showSection(currentStep + 1);
      } else if (currentStep === sections.length - 1) {
        window.location.href = "../home.html";
      }
    });
  });

  prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        completedSteps[currentStep - 1] = false;
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
        showSection(currentStep - 1);
      }
    });
  });

  steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      if (index <= currentStep || completedSteps[index - 1]) {
        showSection(index);
      }
    });
  });

  // Theme toggle using class on the body tag
  themeSelect.addEventListener("change", function () {
    // Remove all theme classes from the body
    document.body.classList.remove(
      "theme-dark",
      "theme-modern",
      "theme-royal",
      "theme-elegant",
      "theme-default"
    );
    // If the selected theme is not default, add the new theme class to the body
    if (this.value !== "default") {
      document.body.classList.add(`theme-${this.value}`);
    }
    // Save the selected theme in localStorage
    localStorage.setItem("theme", this.value);
  });

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("visible");
  });

  showSection(currentStep);
  updateNav();
});
