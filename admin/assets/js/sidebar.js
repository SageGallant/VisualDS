document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const content = document.querySelector(".content");
  const toggle = document.getElementById("sidebarToggle");

  // Check localStorage for saved state
  if (localStorage.getItem("sidebarCollapsed") === "true") {
    sidebar.classList.add("collapsed");
    content.classList.add("expanded");
  }

  // Toggle handler
  toggle.addEventListener("click", function () {
    sidebar.classList.toggle("collapsed");
    content.classList.toggle("expanded");
    localStorage.setItem(
      "sidebarCollapsed",
      sidebar.classList.contains("collapsed")
    );
  });
});
