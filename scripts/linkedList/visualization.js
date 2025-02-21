// Single entry point for all JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Node class definition
  class Node {
    constructor(value) {
      this.value = value;
      this.element = this.createCompartment();
    }

    createCompartment() {
      const compartment = document.createElement("div");
      compartment.className = "compartment";

      // Add value display
      const value = document.createElement("div");
      value.className = "value";
      value.textContent = this.value;

      // Add wheels
      const wheelFront = document.createElement("div");
      wheelFront.className = "wheel front";

      const wheelBack = document.createElement("div");
      wheelBack.className = "wheel back";

      // Add connector
      const connector = document.createElement("div");
      connector.className = "connector";

      // Assemble compartment
      compartment.appendChild(value);
      compartment.appendChild(wheelFront);
      compartment.appendChild(wheelBack);
      compartment.appendChild(connector);

      return compartment;
    }
  }

  // LinkedListTrain class definition
  class LinkedListTrain {
    constructor() {
      this.head = null;
      this.size = 0;
      this.trainContainer = document.getElementById("trainContainer");

      // Initialize sounds
      this.sounds = {
        horn: document.getElementById("trainHorn"),
        wheel: document.getElementById("wheelSound"),
        connect: document.getElementById("connectSound"),
        explosion: document.getElementById("explosionSound"),
      };

      // Add ticket collector
      this.ticketCollector = document.createElement("div");
      this.ticketCollector.className = "ticket-collector";
      this.trainContainer.appendChild(this.ticketCollector);

      // Add bomb element
      this.bomb = document.createElement("div");
      this.bomb.className = "bomb";
      this.trainContainer.appendChild(this.bomb);

      // Initialize last compartment (null node)
      this.lastCompartment = this.createLastCompartment();
      this.updateLastCompartment();
    }

    createLastCompartment() {
      const compartment = document.createElement("div");
      compartment.className = "compartment last-compartment";

      // Add wheels to last compartment
      const wheelFront = document.createElement("div");
      wheelFront.className = "wheel front";

      const wheelBack = document.createElement("div");
      wheelBack.className = "wheel back";

      // Add flagman
      const flagman = document.createElement("div");
      flagman.className = "flagman";

      // Add waving flag
      const flag = document.createElement("div");
      flag.className = "flag";

      // Assemble last compartment
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

      // 1. Detach flagman compartment
      this.lastCompartment.classList.add("detaching");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.lastCompartment.classList.add("hidden");
      this.lastCompartment.classList.remove("detaching");

      // 2. Position new compartment and add it
      newNode.element.style.transform = "translateX(200%)";
      this.trainContainer.insertBefore(newNode.element, this.lastCompartment);

      // 3. Move entire train left
      this.trainContainer.classList.add("train-move-left");

      // Force reflow
      newNode.element.offsetHeight;

      // 4. Animate new compartment coming in
      newNode.element.classList.add("attaching");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      newNode.element.classList.remove("attaching");
      newNode.element.style.transform = "";

      // 5. Bring back flagman compartment
      this.lastCompartment.classList.remove("hidden");
      this.lastCompartment.style.transform = "translateX(200%)";
      this.lastCompartment.classList.add("attaching");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      this.lastCompartment.classList.remove("attaching");
      this.lastCompartment.style.transform = "";

      // Remove train movement class
      this.trainContainer.classList.remove("train-move-left");

      this.updateLastCompartment();

      // Scroll to show new compartment
      this.trainContainer.scrollLeft = this.trainContainer.scrollWidth;
    }

    async deleteLastNode() {
      if (this.size > 0) {
        // Get the correct last node (excluding the flagman compartment)
        const lastNode = this.trainContainer.children[this.size];
        if (!lastNode) return;

        // Move train right before deletion
        this.trainContainer.classList.add("train-move-right");
        await new Promise((resolve) => setTimeout(resolve, 800));

        // Add explosion and smoke effects
        const explosion = document.createElement("div");
        explosion.className = "explosion";
        const smoke = document.createElement("div");
        smoke.className = "delete-smoke";
        lastNode.appendChild(explosion);
        lastNode.appendChild(smoke);

        // Position ticket collector
        const lastNodeRect = lastNode.getBoundingClientRect();
        const containerRect = this.trainContainer.getBoundingClientRect();

        this.ticketCollector.style.left = `${
          lastNodeRect.left - containerRect.left - 40
        }px`;
        this.ticketCollector.style.top = `${-50}px`;
        this.ticketCollector.classList.add("active");

        // Throw bomb
        this.bomb.style.left = `${lastNodeRect.left - containerRect.left}px`;
        this.bomb.style.top = `${-30}px`;
        this.bomb.classList.add("throwing");

        // Sequence the deletion animation
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
          }, 1500); // Increased delay to match new animation duration
        }, 500);
      }
    }

    updateLastCompartment() {
      // Remove the last compartment if it exists
      if (this.lastCompartment.parentNode === this.trainContainer) {
        this.trainContainer.removeChild(this.lastCompartment);
      }
      // Reattach it at the end
      this.trainContainer.appendChild(this.lastCompartment);
    }

    traverse() {
      if (this.size === 0) return;

      // Play train sounds
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
        if (current <= this.size) {
          const compartment = this.trainContainer.children[current];
          const rect = compartment.getBoundingClientRect();
          const containerRect = this.trainContainer.getBoundingClientRect();

          // Ensure smooth movement
          this.ticketCollector.style.transition = "left 0.5s ease-in-out";
          this.ticketCollector.style.left = `${
            rect.left - containerRect.left
          }px`;

          // Highlight current compartment with transition
          compartment.style.transition = "transform 0.3s ease-in-out";
          compartment.style.transform = "scale(1.1)";

          // Smooth scroll
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
          // Return to start position smoothly
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

  // Initialize the train
  const train = new LinkedListTrain();

  // Global function definitions
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

  // Add event listener for Enter key
  document
    .getElementById("nodeValue")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        window.addNode();
      }
    });

  // Update state info function
  function updateStateInfo() {
    document.getElementById("listLength").textContent = train.size;
  }

  // Initialize state
  updateStateInfo();

  // Error handling for audio files
  const audioElements = document.getElementsByTagName("audio");
  for (let audio of audioElements) {
    audio.addEventListener("error", () => {
      console.log(`Failed to load audio: ${audio.id}`);
    });
  }
});
