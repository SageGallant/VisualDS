function initializeAlgorithm() {
  // Add syntax highlighting to pseudocode
  const pseudocode = document.querySelector(".pseudocode");
  if (pseudocode) {
    const keywords = [
      "procedure",
      "end",
      "for",
      "if",
      "then",
      "repeat",
      "until",
    ];
    let content = pseudocode.innerHTML;

    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "g");
      content = content.replace(
        regex,
        `<span class="keyword">${keyword}</span>`
      );
    });

    pseudocode.innerHTML = content;
  }

  // Add interactive elements to complexity boxes
  const complexityItems = document.querySelectorAll(".complexity-item");
  complexityItems.forEach((item) => {
    item.addEventListener("mouseover", function () {
      this.classList.add("highlight");
    });

    item.addEventListener("mouseout", function () {
      this.classList.remove("highlight");
    });
  });
}

// Make function globally available
window.initializeAlgorithm = initializeAlgorithm;
