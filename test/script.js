const conceptBtn = document.querySelector('.concept-btn');
const algorithmBtn = document.querySelector('.algorithm-btn');
const visualizationBtn = document.querySelector('.visualization-btn');

conceptBtn.addEventListener('click', () => {
  // Redirect to concept page
  window.location.href = 'concept.html';
});

algorithmBtn.addEventListener('click', () => {
  // Redirect to algorithm page
  window.location.href = 'algorithm.html';
});

visualizationBtn.addEventListener('click', () => {
  // Redirect to visualization page
  window.location.href = 'visualization.html';
});