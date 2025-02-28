export const sounds = {
  noSwap: new Audio("/assets/audio/sorting/slap.mp3"),
  swap: new Audio("/assets/audio/sorting/jump.mp3"),
  loop: new Audio("/assets/audio/sorting/nextLevel.mp3"),
  complete: new Audio("/assets/audio/sorting/finish.mp3"),
};

export const listSounds = {
  engine: new Audio("/assets/audio/engine.mp3"),
  coach: new Audio("/assets/audio/coach.mp3"),
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
export function list(type) {
  // listSounds["engine"];
  if (listSounds[type]) {
    listSounds[type].play();
  }
}
