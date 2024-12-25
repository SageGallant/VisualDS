// Manages sounds for sorting operations
export const sounds = {
  noSwap: new Audio("./assets/audio/slap.mp3"),
  swap: new Audio("./assets/audio/jump.mp3"),
  loop: new Audio("./assets/audio/nextLevel.mp3"),
  complete: new Audio("./assets/audio/finish.mp3"),
};

export function playSound(type) {
  if (sounds[type]) {
    sounds[type].currentTime = 0; // Reset to start for quick consecutive plays
    sounds[type].play();
  } else {
    console.error(`Sound type "${type}" not found.`);
  }
}
