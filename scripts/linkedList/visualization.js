document.addEventListener("DOMContentLoaded", () => {
  setupButtonListeners();
});

function setupButtonListeners() {
  const addNodeBtn = document.querySelector(".add-node-btn");
  if (addNodeBtn) {
    addNodeBtn.addEventListener("click", function () {
      if (window.addNode) window.addNode();
    });
  } else {
    console.error("Add Node button not found!");
  }

  const deleteLastBtn = document.querySelector(".delete-last-btn");
  if (deleteLastBtn) {
    deleteLastBtn.addEventListener("click", function () {
      if (window.deleteLastNode) window.deleteLastNode();
    });
  } else {
    console.error("Delete Last button not found!");
  }

  const traverseBtn = document.querySelector(".traverse-btn");
  if (traverseBtn) {
    traverseBtn.addEventListener("click", function () {
      if (window.traverse) window.traverse();
    });
  } else {
    console.error("Traverse button not found!");
  }
}

document.addEventListener("DOMContentLoaded", function () {
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
  class LinkedListTrain {
    constructor() {
      this.head = null;
      this.size = 0;
      this.trainContainer = document.getElementById("trainContainer");
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
      if (this.sounds.connect) {
        this.sounds.connect.currentTime = 0;
        this.sounds.connect
          .play()
          .catch((e) => console.log("Sound play failed:", e));
      }
      this.lastCompartment.classList.add("detaching");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.lastCompartment.classList.add("hidden");
      this.lastCompartment.classList.remove("detaching");
      newNode.element.style.transform = "translateX(200%)";
      this.trainContainer.insertBefore(newNode.element, this.lastCompartment);
      this.trainContainer.classList.add("train-move-left");
      newNode.element.offsetHeight;
      newNode.element.classList.add("attaching");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      newNode.element.classList.remove("attaching");
      newNode.element.style.transform = "";
      this.lastCompartment.classList.remove("hidden");
      this.lastCompartment.style.transform = "translateX(200%)";
      this.lastCompartment.classList.add("attaching");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.lastCompartment.classList.remove("attaching");
      this.lastCompartment.style.transform = "";
      this.trainContainer.classList.remove("train-move-left");
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

      const moveCollector = () => {
        if (current <= this.size + 2) {
          const compartment = this.trainContainer.children[current];
          const rect = compartment.getBoundingClientRect();
          const containerRect = this.trainContainer.getBoundingClientRect();
          this.ticketCollector.style.transition = "left 0.5s ease-in-out";
          this.ticketCollector.style.left = `${
            rect.left - containerRect.left
          }px`;
          compartment.style.transition = "transform 0.3s ease-in-out";
          compartment.style.transform = "scale(1.1)";
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
          this.ticketCollector.style.transition = "all 0.5s ease-in-out";
          this.ticketCollector.style.left = "0";
          setTimeout(() => {
            this.ticketCollector.classList.remove("active");
            if (this.sounds.wheel) {
              this.sounds.wheel.pause();
              this.sounds.wheel.currentTime = 0;
            }
          }, 500);
        }
      };

      moveCollector();
    }
  }

  const train = new LinkedListTrain();

  // Make functions available globally
  window.addNode = async function () {
    const input = document.getElementById("nodeValue");
    const value = input.value.trim();
    if (value) {
      await train.addNode(value);
      input.value = "";
      updateStateInfo();
    }
  };

  window.deleteLastNode = async function () {
    await train.deleteLastNode();
    updateStateInfo();
  };

  window.traverse = function () {
    train.traverse();
    document.getElementById("currentOperation").textContent = "Traversing...";
    setTimeout(() => {
      document.getElementById("currentOperation").textContent = "None";
    }, train.size * 1000 + 1000);
  };

  const nodeValueInput = document.getElementById("nodeValue");
  if (nodeValueInput) {
    nodeValueInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        window.addNode();
      }
    });
  }

  function updateStateInfo() {
    document.getElementById("listLength").textContent = train.size;
  }

  updateStateInfo();
  setupButtonListeners(); // Setup button listeners again to ensure they work
});
