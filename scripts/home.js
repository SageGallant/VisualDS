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
  const dropdownContent = element.nextElementSibling;
  const icon = element.querySelector(".icon svg path");

  // Toggle active class
  element.classList.toggle("active");

  // Toggle dropdown visibility
  if (dropdownContent.style.maxHeight) {
    dropdownContent.style.maxHeight = null;
    icon.setAttribute("d", "M8 9L12 13L16 9");
  } else {
    dropdownContent.style.maxHeight = dropdownContent.scrollHeight + "px";
    icon.setAttribute("d", "M16 15L12 11L8 15");
  }
}

// On page load, ensure the toggle button is positioned correctly (sidebar open by default)
document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("sidebar-toggle");
  toggleBtn.style.left = "var(--sidebar-width)";
});

document.addEventListener("DOMContentLoaded", function () {
  const navButtons = document.querySelectorAll(".nav-button");
  // Mapping for each card type to its corresponding target page
  const urlMap = {
    bubble: "sorting/base.php",
    linkedList: "linkedList/base.php",
    tree: "tree/wantedTree.php",
    recursion: "recursion/wantedRecursion.php",
    graph: "graph/wantedGraph.php",
    hashTable: "hashTable/wantedHashTable.php",
  };

  navButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const page = this.getAttribute("data-page");
      const section = this.getAttribute("data-section");
      console.log("Button clicked for", page, section);
      // Determine the target URL based on the page mapping
      let targetUrl = urlMap[page];
      if (targetUrl) {
        window.location.href = targetUrl + "?section=" + section;
      } else {
        console.error("No target URL found for page:", page);
      }
    });
  });
});
