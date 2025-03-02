// Place this code in: admin/assets/js/main.js

function toggleTheme() {
  const body = document.body;
  body.classList.toggle("dark-mode");
  // Save theme preference (simple localStorage for demo)
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-mode") ? "dark" : "light"
  );
}

// Load saved theme on page load
window.onload = function () {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }
};
