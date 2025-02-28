const slider = document.querySelector(".slides");
const slides = document.querySelectorAll(".slide");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");
let currentSlide = 0;
let slideInterval;
const intervalTime = 2000;

function updateSlider() {
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlider();
}
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlider();
}
function startSlideShow() {
  slideInterval = setInterval(nextSlide, intervalTime);
}
function pauseSlideShow() {
  clearInterval(slideInterval);
}

startSlideShow();

slider.addEventListener("mouseenter", pauseSlideShow);
slider.addEventListener("mouseleave", startSlideShow);

prevButton.addEventListener("click", () => {
  pauseSlideShow();
  prevSlide();
  startSlideShow();
});

nextButton.addEventListener("click", () => {
  pauseSlideShow();
  nextSlide();
  startSlideShow();
});