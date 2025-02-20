// File Path: admin/assets/js/main.js

document.addEventListener("DOMContentLoaded", function () {
  // Theme toggler
  const themeToggle = document.getElementById("themeToggle");
  const html = document.documentElement;

  themeToggle.addEventListener("click", function () {
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    html.setAttribute("data-theme", newTheme);

    // Save theme preference
    fetch("includes/settings.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "action=update_theme&theme=" + newTheme,
    });
  });
});
