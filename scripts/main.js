// Sidebar Toggle
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const toggleBtn = document.getElementById("sidebar-toggle");
  sidebar.classList.toggle("collapsed");
  if (sidebar.classList.contains("collapsed")) {
    toggleBtn.style.left = "0px";
    toggleBtn.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  } else {
    toggleBtn.style.left = "var(--sidebar-width)";
    toggleBtn.innerHTML =
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M15 6L9 12L15 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  }
}

// Dropdown Toggle
function toggleDropdown(element) {
  element.classList.toggle("active");
}

// Dummy button handler for cards
function handleClick(topic, type) {
  console.log(`Clicked on ${type} for ${topic}`);
}

// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "Light Mode"
    : "Dark Mode";
});

// On page load, ensure the toggle button is positioned correctly (sidebar open by default)
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("sidebar-toggle");
  toggleBtn.style.left = "var(--sidebar-width)";
});
