// Theme Manager - Handles theme switching
document.addEventListener("DOMContentLoaded", function () {
  const themeSelect = document.getElementById("theme-select");

  // Get saved theme or default to light
  const savedTheme = localStorage.getItem("theme") || "theme-light";

  // Apply the saved theme
  document.body.className = savedTheme;

  // Set the select dropdown to match the current theme
  if (themeSelect) {
    themeSelect.value = savedTheme;

    // Add change event listener
    themeSelect.addEventListener("change", function () {
      // Save the selected theme
      const selectedTheme = themeSelect.value;
      localStorage.setItem("theme", selectedTheme);

      // Apply the theme
      document.body.className = selectedTheme;
    });
  }
});
