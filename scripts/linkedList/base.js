document.addEventListener("DOMContentLoaded", function () {
  function loadContent(url, containerId) {
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

        const scriptUrl = `../../scripts/sorting/bubble/${url.replace(
          ".html",
          ".js"
        )}`;

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

  if (!sectionParam) {
    if (localStorage.getItem("currentStep")) {
      currentStep = parseInt(localStorage.getItem("currentStep"), 10);
    }
    if (localStorage.getItem("completedSteps")) {
      completedSteps = JSON.parse(localStorage.getItem("completedSteps"));
    }
  }

  const savedTheme = localStorage.getItem("theme") || "default";
  themeSelect.value = savedTheme;
  if (savedTheme !== "default") {
    document.body.classList.add(`theme-${savedTheme}`);
  }

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
    steps[currentStep].classList.add("active");

    const nextBtn = document.querySelector(".next-btn");
    nextBtn.textContent =
      currentStep === steps.length - 1 ? "Complete" : "Next";

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
        window.location.href = "index.html";
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

  // Background Music Controls
  const bgmButton = document.getElementById("bgm-toggle");
  const bgm = document.getElementById("bgm");
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

  // Initial state
  updateBgmState();

  showSection(currentStep);
  updateNav();
});
