function initializeAlgorithm() {
  // Theme Toggle functionality
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    let isDarkTheme = localStorage.getItem("algorithmTheme") === "dark";

    // Apply initial theme
    document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
    themeToggle.textContent = isDarkTheme ? "☀️" : "🌙";

    // Add toggle event
    themeToggle.addEventListener("click", () => {
      isDarkTheme = !isDarkTheme;
      document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
      themeToggle.textContent = isDarkTheme ? "☀️" : "🌙";
      localStorage.setItem("algorithmTheme", isDarkTheme ? "dark" : "light");
    });
  }

  // Slider Navigation
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (slides.length === 0) return;

  let currentSlide = 0;

  // Hide all slides except the first one
  function initSlides() {
    slides.forEach((slide, index) => {
      if (index !== 0) {
        slide.style.display = "none";
      }
    });
  }

  function showSlide(index) {
    slides.forEach((slide) => (slide.style.display = "none"));
    slides[index].style.display = "block";

    // Update topic menu active state if it exists
    const topicLinks = document.querySelectorAll(".topics-menu a");
    if (topicLinks && topicLinks.length > 0) {
      topicLinks.forEach((link) => link.classList.remove("active"));
      if (topicLinks[index]) {
        topicLinks[index].classList.add("active");
      }
    }
  }

  // Navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  // Topic menu navigation - check if elements exist first
  const topicLinks = document.querySelectorAll(".topics-menu a");
  if (topicLinks && topicLinks.length > 0) {
    topicLinks.forEach((link, index) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        currentSlide = index;
        showSlide(currentSlide);
      });
    });
  }

  // Initialize slider
  initSlides();

  // Add smooth scrolling for topic links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

// Register the initialization function globally
window.initializeAlgorithm = initializeAlgorithm;

// Auto-initialize if loaded directly
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeAlgorithm);
} else {
  initializeAlgorithm();
}
