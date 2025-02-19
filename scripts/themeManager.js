class ThemeManager {
  constructor() {
    this.themes = ["default", "dark", "modern", "royal", "elegant"];
    this.currentTheme = localStorage.getItem("theme") || "default";
    this.init();
  }

  init() {
    this.applyTheme(this.currentTheme);
    this.createThemeSelector();
  }

  createThemeSelector() {
    const header = document.querySelector(".main-header");
    if (!header) return;

    const themeSelector = document.createElement("select");
    themeSelector.id = "theme-select";
    themeSelector.className = "theme-select";

    this.themes.forEach((theme) => {
      const option = document.createElement("option");
      option.value = theme;
      option.text = theme.charAt(0).toUpperCase() + theme.slice(1);
      option.selected = theme === this.currentTheme;
      themeSelector.appendChild(option);
    });

    themeSelector.addEventListener("change", (e) => {
      this.applyTheme(e.target.value);
    });

    const container = document.createElement("div");
    container.className = "theme-selector-container";
    container.appendChild(themeSelector);
    header.appendChild(container);
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
