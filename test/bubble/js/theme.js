const body = document.body;
const themeToggleIcon = document.querySelector("#theme-toggle");

export function toggleTheme() {
  body.classList.toggle("dark");
  themeToggleIcon.textContent = body.classList.contains("dark") ? "☀️" : "🌙";
}

// theme store in local storage code.