const body = document.body;
const themeToggleIcon = document.querySelector("#theme-toggle-icon");

export function toggleTheme() {
  body.classList.toggle("dark");
  themeToggleIcon.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
}
