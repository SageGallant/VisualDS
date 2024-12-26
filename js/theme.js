const body = document.body;
const themeToggleIcon = document.querySelector("#theme-toggle");

export function toggleTheme() {
  body.classList.toggle("dark");
  themeToggleIcon.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
}

// const themeToggle = document.querySelector("#theme-toggle");
// const body = document.body;

// export function toggleTheme(theme) {
//   body.dataset.theme = theme;
//   const icon = theme === "dark" ? "☀️" : "🌙";
//   themeToggle.textContent = icon;
//   localStorage.setItem("theme", theme);
// }

// themeToggle.addEventListener("click", () => {
//   const newTheme = body.dataset.theme === "dark" ? "light" : "dark";
//   toggleTheme(newTheme);
// });

// // Initialize theme on page load
// const savedTheme = localStorage.getItem("theme") || "light";
// toggleTheme(savedTheme);
