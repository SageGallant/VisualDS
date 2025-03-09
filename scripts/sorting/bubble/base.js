document.addEventListener("DOMContentLoaded", function () {
  function loadContent(url, containerId) {
    const oldScript = document.querySelector(
      `script[data-section="${containerId}"]`
    );
    if (oldScript) oldScript.remove();

    return fetch(url)
      .then((response) =>
        response.ok ? response.text() : Promise.reject(`Failed to load ${url}`)
      )
      .then((html) => {
        document.getElementById(containerId).innerHTML = html;
        const scriptUrl = `../../scripts/sorting/bubble/${url.replace(
          ".html",
          ".js"
        )}`;

        return fetch(scriptUrl).then((response) => {
          if (!response.ok) return;

          const script = document.createElement("script");
          script.src = scriptUrl;
          script.setAttribute("data-section", containerId);
          return new Promise((resolve) => {
            script.onload = resolve;
            document.body.appendChild(script);
          });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById(containerId).innerHTML =
          "<p>Content failed to load.</p>";
      });
  }

  const elements = {
    steps: document.querySelectorAll(".step-item"),
    circles: document.querySelectorAll(".step-circle"),
    sections: document.querySelectorAll(".content-section"),
    nextBtns: document.querySelectorAll(".next-btn"),
    prevBtns: document.querySelectorAll(".prev-btn"),
    menuToggle: document.getElementById("menu-toggle"),
    menu: document.getElementById("menu"),
  };

  let currentStep = 0;
  let completedSteps = [false, false, false];

  // Handle URL parameters
  const sectionParam = new URLSearchParams(window.location.search).get(
    "section"
  );
  if (sectionParam) {
    currentStep = ["concept", "algorithm", "visualization"].indexOf(
      sectionParam
    );
    if (currentStep === -1) currentStep = 0;
  }

  function updateNav() {
    elements.steps.forEach((step, index) => {
      step.classList.remove("active", "completed");
      // Mark steps as completed only if they are before the current step
      if (index < currentStep || completedSteps[index]) {
        step.classList.add("completed");
        elements.circles[index].textContent = "✓";
      } else {
        elements.circles[index].textContent = index + 1;
      }
    });
    elements.steps[currentStep].classList.add("active");

    const nextBtns = document.querySelectorAll(".next-btn");
    if (nextBtns.length) {
      nextBtns.forEach((btn) => {
        btn.textContent =
          currentStep === elements.steps.length - 1 ? "Complete" : "Next";
      });
    }

    const progressFill = document.querySelector(".progress-fill");
    if (progressFill) {
      const completedCount = completedSteps.filter(Boolean).length;
      const progress = Math.max(
        (completedCount / (elements.steps.length - 1)) * 100,
        (currentStep / (elements.steps.length - 1)) * 100
      );
      progressFill.stye.width = `${progress}%`;
    }
  }

  function showSection(index) {
    elements.sections.forEach((section) => section.classList.remove("active"));
    elements.sections[index].classList.add("active");

    const contentMap = {
      0: {
        url: "theory.html",
        containerId: "theory-content",
        init: "initializeTheory",
      },
      1: {
        url: "algorithm.html",
        containerId: "algorithm-content",
        init: "initializeAlgorithm",
      },
      2: {
        url: "../bubble.html",
        containerId: "visualization-content",
        init: "BubbleSortVisualizer",
      },
    };

    if (contentMap[index]) {
      loadContent(contentMap[index].url, contentMap[index].containerId).then(
        () => {
          const initFn = window[contentMap[index].init];
          if (initFn) {
            index === 2 ? new initFn() : initFn();
          }
        }
      );
    }

    currentStep = index;
    localStorage.setItem("currentStep", currentStep);
    updateNav();
  }

  // Event Listeners
  elements.nextBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep < elements.sections.length - 1) {
        completedSteps[currentStep] = true;
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
        showSection(currentStep + 1);
      } else {
        window.location.href = "../home.html";
      }
    });
  });

  elements.prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        completedSteps[currentStep - 1] = false;
        localStorage.setItem("completedSteps", JSON.stringify(completedSteps));
        showSection(currentStep - 1);
      }
    });
  });

  elements.steps.forEach((step, index) => {
    step.addEventListener("click", () => {
      if (index <= currentStep || completedSteps[index - 1]) {
        showSection(index);
      }
    });
  });

  elements.menuToggle.addEventListener("click", () =>
    elements.menu.classList.toggle("visible")
  );

  showSection(currentStep);
});
