class ThemeManager {
  constructor() {
    this.themes = ["default", "dark", "modern", "royal", "elegant"];
    this.currentTheme = localStorage.getItem("theme") || "default";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    // Listen for theme changes
    const themeSelect = document.getElementById("theme-select");
    if (themeSelect) {
      themeSelect.value = this.currentTheme;
      themeSelect.addEventListener("change", (e) =>
        this.applyTheme(e.target.value)
      );
    }
  }

  applyTheme(theme) {
    // Remove all theme classes
    this.themes.forEach((t) => {
      document.body.classList.remove(`theme-${t}`);
    });

    // Add new theme class if it's not default
    if (theme !== "default") {
      document.body.classList.add(`theme-${theme}`);
    }

    // Save to localStorage
    localStorage.setItem("theme", theme);
    this.currentTheme = theme;
  }
}

// Initialize theme manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.themeManager = new ThemeManager();
});
