// Node class for the linked list visualization
class Node {
  constructor(value) {
    this.value = value;
    this.element = this.createCompartment();
  }

  createCompartment() {
    const compartment = document.createElement("div");
    compartment.className = "compartment";
    const value = document.createElement("div");
    value.className = "value";
    value.textContent = this.value;
    const wheelFront = document.createElement("div");
    wheelFront.className = "wheel front";
    const wheelBack = document.createElement("div");
    wheelBack.className = "wheel back";
    const connector = document.createElement("div");
    connector.className = "connector";
    compartment.appendChild(value);
    compartment.appendChild(wheelFront);
    compartment.appendChild(wheelBack);
    compartment.appendChild(connector);

    return compartment;
  }
}

// LinkedListTrain class that visualizes the linked list as a train
class LinkedListTrain {
  constructor() {
    this.head = null;
    this.size = 0;
    this.trainContainer = document.getElementById("trainContainer");
    if (!this.trainContainer) {
      console.error("Train container not found!");
      return;
    }

    this.sounds = {
      horn: document.getElementById("trainHorn"),
      wheel: document.getElementById("wheelSound"),
      connect: document.getElementById("connectSound"),
      explosion: document.getElementById("explosionSound"),
    };

    this.ticketCollector = document.createElement("div");
    this.ticketCollector.className = "ticket-collector";
    this.trainContainer.appendChild(this.ticketCollector);

    this.bomb = document.createElement("div");
    this.bomb.className = "bomb";
    this.trainContainer.appendChild(this.bomb);

    this.lastCompartment = this.createLastCompartment();
    this.updateLastCompartment();
  }

  createLastCompartment() {
    const compartment = document.createElement("div");
    compartment.className = "compartment last-compartment";
    const wheelFront = document.createElement("div");
    wheelFront.className = "wheel front";
    const wheelBack = document.createElement("div");
    wheelBack.className = "wheel back";
    const flagman = document.createElement("div");
    flagman.className = "flagman";
    const flag = document.createElement("div");
    flag.className = "flag";
    flagman.appendChild(flag);
    compartment.appendChild(flagman);
    compartment.appendChild(wheelFront);
    compartment.appendChild(wheelBack);

    return compartment;
  }

  async addNode(value) {
    const newNode = new Node(value);
    this.size++;

    // Play connection sound
    if (this.sounds.connect) {
      this.sounds.connect.currentTime = 0;
      this.sounds.connect
        .play()
        .catch((e) => console.log("Sound play failed:", e));
    }

    // Detach last compartment
    this.lastCompartment.classList.add("detaching");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.lastCompartment.classList.add("hidden");
    this.lastCompartment.classList.remove("detaching");

    // Position and animate new node
    newNode.element.style.transform = "translateX(200%)";
    this.trainContainer.insertBefore(newNode.element, this.lastCompartment);
    this.trainContainer.classList.add("train-move-left");

    // Force reflow to ensure animation works
    void newNode.element.offsetHeight;

    // Animate attaching new node
    newNode.element.classList.add("attaching");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    newNode.element.classList.remove("attaching");
    newNode.element.style.transform = "";

    // Reattach last compartment
    this.lastCompartment.classList.remove("hidden");
    this.lastCompartment.style.transform = "translateX(200%)";
    this.lastCompartment.classList.add("attaching");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.lastCompartment.classList.remove("attaching");
    this.lastCompartment.style.transform = "";
    this.trainContainer.classList.remove("train-move-left");

    // Update container and scroll to view new node
    this.updateLastCompartment();
    this.trainContainer.scrollLeft = this.trainContainer.scrollWidth;
  }

  async deleteLastNode() {
    if (this.size > 0) {
      const lastNode = this.trainContainer.children[this.size + 2];
      if (!lastNode) return;
      this.trainContainer.classList.add("train-move-right");
      await new Promise((resolve) => setTimeout(resolve, 800));
      const explosion = document.createElement("div");
      explosion.className = "explosion";
      const smoke = document.createElement("div");
      smoke.className = "delete-smoke";
      lastNode.appendChild(explosion);
      lastNode.appendChild(smoke);
      const lastNodeRect = lastNode.getBoundingClientRect();
      const containerRect = this.trainContainer.getBoundingClientRect();

      this.ticketCollector.style.left = `${
        lastNodeRect.left - containerRect.left - 40
      }px`;
      this.ticketCollector.style.top = `${-50}px`;
      this.ticketCollector.classList.add("active");
      this.bomb.style.left = `${lastNodeRect.left - containerRect.left}px`;
      this.bomb.style.top = `${-30}px`;
      this.bomb.classList.add("throwing");
      setTimeout(() => {
        this.bomb.classList.remove("throwing");
        lastNode.classList.add("delete-animation");
        if (this.sounds.explosion) {
          this.sounds.explosion.currentTime = 0;
          this.sounds.explosion
            .play()
            .catch((e) => console.log("Sound play failed:", e));
        }

        setTimeout(() => {
          if (lastNode.parentNode === this.trainContainer) {
            this.trainContainer.removeChild(lastNode);
            this.size--;
            this.updateLastCompartment();
          }
          this.ticketCollector.classList.remove("active");
          this.trainContainer.classList.remove("train-move-right");
        }, 1500);
      }, 500);
    }
  }

  updateLastCompartment() {
    // First check if the last compartment is already attached to avoid duplicate
    if (this.lastCompartment.parentNode === this.trainContainer) {
      this.trainContainer.removeChild(this.lastCompartment);
    }
    this.trainContainer.appendChild(this.lastCompartment);
  }

  traverse() {
    if (this.size === 0) return;
    if (this.sounds.horn) {
      this.sounds.horn.currentTime = 0;
      this.sounds.horn
        .play()
        .catch((e) => console.log("Sound play failed:", e));
    }
    if (this.sounds.wheel) {
      this.sounds.wheel.currentTime = 0;
      this.sounds.wheel
        .play()
        .catch((e) => console.log("Sound play failed:", e));
    }

    let current = 1; // Start after engine
    this.ticketCollector.classList.add("active");

    // Reset ticket collector position to start at the first node
    const firstCompartment = this.trainContainer.children[current];
    if (firstCompartment) {
      const rect = firstCompartment.getBoundingClientRect();
      const containerRect = this.trainContainer.getBoundingClientRect();
      this.ticketCollector.style.transition = "none";
      this.ticketCollector.style.left = `${rect.left - containerRect.left}px`;
      this.ticketCollector.style.top = "0px";

      // Force reflow to ensure position is set before animations start
      void this.ticketCollector.offsetHeight;
    }

    const moveCollector = () => {
      if (current <= this.size + 2) {
        // +2 accounts for engine and last compartment
        const compartment = this.trainContainer.children[current];
        if (!compartment) {
          current++;
          moveCollector();
          return;
        }

        const rect = compartment.getBoundingClientRect();
        const containerRect = this.trainContainer.getBoundingClientRect();

        // Use smooth transition for subsequent moves
        this.ticketCollector.style.transition = "left 0.5s ease-in-out";
        this.ticketCollector.style.left = `${rect.left - containerRect.left}px`;

        // Highlight current node
        compartment.style.transition = "transform 0.3s ease-in-out";
        compartment.style.transform = "scale(1.1)";

        // Ensure current node is visible in viewport
        this.trainContainer.scrollTo({
          left: rect.left - containerRect.left - 100,
          behavior: "smooth",
        });

        setTimeout(() => {
          compartment.style.transform = "scale(1)";
          current++;
          moveCollector();
        }, 1000);
      } else {
        // Animation complete, reset collector position
        this.ticketCollector.style.transition = "all 0.5s ease-in-out";
        this.ticketCollector.style.left = "0";
        setTimeout(() => {
          this.ticketCollector.classList.remove("active");
          if (this.sounds.wheel) {
            this.sounds.wheel.pause();
          }
        }, 500);
      }
    };

    moveCollector();
  }
}

// Main initialization function
function initializeVisualization() {
  const train = new LinkedListTrain();

  // Only proceed if train was successfully created
  if (!train.trainContainer) return;

  // Get control elements
  const nodeValueInput = document.getElementById("nodeValue");
  const addNodeBtn = document.querySelector(".add-node-btn");
  const deleteLastBtn = document.querySelector(".delete-last-btn");
  const traverseBtn = document.querySelector(".traverse-btn");
  const listLengthElement = document.getElementById("listLength");
  const currentOperationElement = document.getElementById("currentOperation");

  // Add event listeners
  addNodeBtn.addEventListener("click", async () => {
    const value = nodeValueInput.value.trim();
    if (!value) return;

    nodeValueInput.value = "";
    currentOperationElement.textContent = "Adding Node";

    await train.addNode(value);

    updateStateInfo(train);
    currentOperationElement.textContent = "None";
  });

  deleteLastBtn.addEventListener("click", async () => {
    if (train.size === 0) return;

    currentOperationElement.textContent = "Deleting Last Node";

    await train.deleteLastNode();

    updateStateInfo(train);
    setTimeout(() => {
      currentOperationElement.textContent = "None";
    }, 2000);
  });

  traverseBtn.addEventListener("click", () => {
    if (train.size === 0) return;

    currentOperationElement.textContent = "Traversing List";

    train.traverse();

    setTimeout(() => {
      currentOperationElement.textContent = "None";
    }, (train.size + 2) * 1000);
  });

  // Initialize state info
  updateStateInfo(train);
}

// Update UI state information
function updateStateInfo(train) {
  const listLengthElement = document.getElementById("listLength");
  if (listLengthElement) {
    listLengthElement.textContent = train.size;
  }
}

// Initialize visualization when the module is loaded
document.addEventListener("DOMContentLoaded", initializeVisualization);
