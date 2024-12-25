const visualization = document.querySelector("#visualization");
const barCountInput = document.querySelector("#bar-count");
const barValuesInput = document.querySelector("#bar-values");

export function createBars() {
  const barCount = parseInt(barCountInput.value, 10);
  const barValues = barValuesInput.value;

  const bars = barValues
    ? barValues
        .split(",")
        .map((v) => +v.trim())
        .filter((v) => !isNaN(v))
    : Array.from({ length: barCount }, () => Math.floor(Math.random() * 100));

  visualization.innerHTML = "";
  bars.forEach((value) => {
    const bar = document.createElement("div");
    bar.className = "bar";
    bar.style.height = `${value}%`;
    bar.style.width = `${100 / bars.length - 1}%`;
    bar.textContent = Math.floor(value);
    visualization.appendChild(bar);
  });
  return bars;
}

export function pause(duration = 500) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

export function handleReset() {
  createBars();
  document.querySelector("#current-operation").textContent = "Reset complete";
}

export const updateBarColors = (bars, color) => {
  bars.forEach((bar) => {
    bar.style.backgroundColor = color;
  });
};
