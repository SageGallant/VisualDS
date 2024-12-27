export const sounds = {
  noSwap: new Audio("./assets/audio/slap.mp3"),
  swap: new Audio("./assets/audio/jump.mp3"),
  loop: new Audio("./assets/audio/nextLevel.mp3"),
  complete: new Audio("./assets/audio/finish.mp3"),
};

export function playSound(type) {
  sounds["complete"];
  if (sounds[type]) {
    sounds[type].currentTime = 0; // Reset to start for quick consecutive plays
    sounds[type].load();
    sounds[type].play();
  } else {
    console.error(`Sound type "${type}" not found.`);
  }
}