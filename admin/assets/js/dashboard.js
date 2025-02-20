// File Path: admin/assets/js/dashboard.js

document.addEventListener("DOMContentLoaded", function () {
  // Update real-time statistics
  function updateStats() {
    fetch("includes/dashboard_stats.php")
      .then((response) => response.json())
      .then((data) => {
        document.getElementById("totalUsers").textContent = data.totalUsers;
        document.getElementById("activeUsers").textContent = data.activeUsers;
        document.getElementById("totalContent").textContent = data.totalContent;
      });
  }

  // Update stats every 5 minutes
  setInterval(updateStats, 300000);
});
