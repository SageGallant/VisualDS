// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
let isDarkTheme = false;

themeToggle.addEventListener('click', () => {
    isDarkTheme = !isDarkTheme;
    document.body.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    themeToggle.textContent = isDarkTheme ? '☀️' : '🌙';
});

// Slider Navigation
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentSlide = 0;

// Hide all slides except the first one
function initSlides() {
    slides.forEach((slide, index) => {
        if (index !== 0) {
            slide.style.display = 'none';
        }
    });
}

function showSlide(index) {
    slides.forEach(slide => slide.style.display = 'none');
    slides[index].style.display = 'block';
    
    // Update topic menu active state
    const topicLinks = document.querySelectorAll('.topics-menu a');
    topicLinks.forEach(link => link.classList.remove('active'));
    topicLinks[index].classList.add('active');
}

// Navigation buttons
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Topic menu navigation
document.querySelectorAll('.topics-menu a').forEach((link, index) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Initialize slider
initSlides();

// Add smooth scrolling for topic links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});