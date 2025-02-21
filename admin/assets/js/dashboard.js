// File Path: admin/assets/js/dashboard.js

document.addEventListener("DOMContentLoaded", function () {
  // Theme toggler
  const themeToggler = document.getElementById("theme-toggle");
  if (themeToggler) {
    themeToggler.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);

      // Save theme preference
      fetch("includes/save_theme.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "theme=" + newTheme,
      });
    });
  }

  // Responsive sidebar toggle
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebar = document.querySelector(".sidebar");

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener("click", function () {
      sidebar.classList.toggle("sidebar-collapsed");
      document.querySelector(".main-content").classList.toggle("expanded");
    });
  }

  // Auto-update dashboard stats
  function updateStats() {
    fetch("includes/get_stats.php")
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("total-users").textContent = data.total_users;
        document.getElementById("total-content").textContent =
          data.total_content;
        document.getElementById("active-sessions").textContent =
          data.active_sessions;
      });
  }

  // Update stats every 5 minutes
  setInterval(updateStats, 300000);
});
