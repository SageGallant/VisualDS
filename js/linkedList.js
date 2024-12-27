const visualization = document.getElementById("train-visualization");
const themeToggleButton = document.getElementById("theme-toggle");

class LinkedList {
  constructor() {
    this.head = null;
  }
  addNode(value) {
    const newNode = { value, next: null };
    if (this.head === null) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
  }

  removeNode() {
    if (!this.head) return;
    if (!this.head.next) {
      this.head = null;
      return;
    }
    let current = this.head;
    while (current.next && current.next.next) {
      current = current.next;
    }
    current.next = null;
  }
}

const linkedList = new LinkedList();

// Update the visualization after any change
function updateVisualization() {
  visualization.innerHTML = "";
  let currentNode = linkedList.head;

  if (currentNode === null) return;

  // Add Engine (First node)
  const engineElement = document.createElement("div");
  engineElement.classList.add("train-engine");
  engineElement.classList.add("car-move");
  visualization.appendChild(engineElement);

  currentNode = currentNode.next;
  while (currentNode) {
    const carElement = document.createElement("div");
    carElement.classList.add("train-car");
    carElement.classList.add("add-car");
    carElement.classList.add("car-move");
    carElement.style.backgroundImage = "url('../assets/images/train-car.png')";
    carElement.textContent = currentNode.value;
    visualization.appendChild(carElement);
    currentNode = currentNode.next;
  }
}

document.getElementById("add-node").addEventListener("click", () => {
  const value = prompt("Enter the train car name:");
  linkedList.addNode(value);
  updateVisualization();
});

document.getElementById("remove-node").addEventListener("click", () => {
  linkedList.removeNode();
  updateVisualization();
});

themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDarkMode = document.body.classList.contains("dark-mode");
  themeToggleButton.textContent = isDarkMode ? "☀️" : "🌙";
});
