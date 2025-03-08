document.addEventListener("DOMContentLoaded", function () {
  // Utility function to load content into containers
  function loadContent(url, containerId) {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load ${url}: ${response.statusText}`);
        }
        return response.text();
      })
      .then((html) => {
        const container = document.getElementById(containerId);
        if (!container) {
          throw new Error(`Container #${containerId} not found`);
        }
        container.innerHTML = html;

        // Try to load corresponding JavaScript file
        const scriptUrl = `../../scripts/linkedList/${url.replace(
          ".html",
          ".js"
        )}`;

        // First check if the script exists to avoid 404 errors
        return fetch(scriptUrl, { method: "HEAD" })
          .then((response) => {
            if (!response.ok) {
              console.log(`No script found for ${url}, script was not loaded`);
              // Initialize the specific section without a script
              initializeSection(containerId);
              return Promise.resolve();
            }

            return new Promise((resolve, reject) => {
              // Remove any existing script for this section
              const oldScript = document.querySelector(
                `script[data-section="${containerId}"]`
              );
              if (oldScript) {
                oldScript.remove();
              }

              // Dynamically create and load the script
              const script = document.createElement("script");
              script.src = scriptUrl;
              script.setAttribute("data-section", containerId);

              script.onload = () => {
                console.log("Script loaded:", scriptUrl);
                // Initialize section-specific functionality if available
                initializeSection(containerId);
                resolve();
              };

              script.onerror = (error) => {
                console.error("Script failed to load:", scriptUrl, error);
                reject(error);
              };

              document.body.appendChild(script);
            });
          })
          .catch((error) => {
            console.error("Error checking script:", error);
            initializeSection(containerId);
            return Promise.resolve();
          });
      })
      .catch((error) => {
        console.error("Content loading error:", error);
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = "<p>Content failed to load.</p>";
        }
      });
  }

  // Helper function to initialize sections based on containerId
  function initializeSection(containerId) {
    switch (containerId) {
      case "visualization-content":
        if (window.initializeVisualization) {
          window.initializeVisualization();
        }
        break;
      case "algorithm-content":
        if (window.initializeAlgorithm) {
          window.initializeAlgorithm();
        }
        break;
      case "theory-content":
        if (window.initializeTheory) {
          window.initializeTheory();
        }
        break;
    }
  }

  // UI Elements
  const steps = document.querySelectorAll(".step-item");
  const circles = document.querySelectorAll(".step-circle");
  const sections = document.querySelectorAll(".content-section");
  const nextBtns = document.querySelectorAll(".next-btn");
  const prevBtns = document.querySelectorAll(".prev-btn");
  const themeSelect = document.getElementById("theme-select");
  const menuToggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("menu");
  const progressFill = document.querySelector(".progress-fill");

  // State variables
  let currentStep = 0;
  let completedSteps = [false, false, false];

  // Check for URL parameters to determine starting section
  const urlParams = new URLSearchParams(window.location.search);
  const sectionParam = urlParams.get("section");
  if (sectionParam) {
    switch (sectionParam) {
      case "concept":
      case "theory":
        currentStep = 0;
        break;
      case "algorithm":
        currentStep = 1;
        break;
      case "visualization":
        currentStep = 2;
        break;
    }
  } else {
    // Restore from localStorage if no URL parameter is present
    if (localStorage.getItem("currentStep")) {
      currentStep = parseInt(localStorage.getItem("currentStep"), 10);
    }
    if (localStorage.getItem("completedSteps")) {
      completedSteps = JSON.parse(localStorage.getItem("completedSteps"));
    }
  }

  // Apply saved theme
  const savedTheme = localStorage.getItem("theme") || "default";
  if (themeSelect) {
    themeSelect.value = savedTheme;
  }
  if (savedTheme !== "default") {
    document.body.classList.add(`theme-${savedTheme}`);
  }

  // Update navigation UI based on current state
  function updateNav() {
    steps.forEach((step, index) => {
      step.classList.remove("active", "completed");
      if (completedSteps[index]) {
        step.classList.add("completed");
        circles[index].textContent = "✓";
      } else {
        circles[index].textContent = index + 1;
      }
    });

    // Set active step
    steps[currentStep].classList.add("active");

    // Update next button text
    const nextBtn = document.querySelector(".next-btn");
    if (nextBtn) {
      nextBtn.textContent =
        currentStep === steps.length - 1 ? "Complete" : "Next";
    }

    // Update progress bar
    if (progressFill) {
      const totalSteps = steps.length - 1;
      const fillPercentage = (currentStep / totalSteps) * 100;
      progressFill.style.width = `${fillPercentage}%`;
    }
  }

  function showSection(index) {
    sections.forEach((section) => section.classList.remove("active"));
    sections[index].classList.add("active");

    const contentMap = {
      0: { url: "theory.html", containerId: "theory-content" },
      1: { url: "algorithm.html", containerId: "algorithm-content" },
      2: { url: "visualization.html", containerId: "visualization-content" },
    };

    if (contentMap[index]) {
      loadContent(contentMap[index].url, contentMap[index].containerId);
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
        window.location.href = "index.php";
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

  const bgmButton = document.getElementById("bgm-toggle");
  const bgm = document.getElementById("bgm");

  if (bgmButton && bgm) {
    let isMuted = localStorage.getItem("bgmMuted") === "true";

    function updateBgmState() {
      if (isMuted) {
        bgm.pause();
        bgmButton.querySelector(".icon").textContent = "🔈";
      } else {
        bgm.play().catch((e) => console.log("Playback prevented:", e));
        bgmButton.querySelector(".icon").textContent = "🔊";
      }
    }

    bgmButton.addEventListener("click", () => {
      isMuted = !isMuted;
      localStorage.setItem("bgmMuted", isMuted);
      updateBgmState();
    });

    updateBgmState();
  }

  showSection(currentStep);
  updateNav();
});
