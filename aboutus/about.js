

  // Add/remove class on scroll
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  });

  const toggleBtn = document.getElementById("menu-toggle");
  const dropdownCard = document.getElementById("dropdownCard");

  toggleBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    dropdownCard.classList.toggle("active");
  });

  document.addEventListener("click", function (e) {
    if (!dropdownCard.contains(e.target) && !toggleBtn.contains(e.target)) {
      dropdownCard.classList.remove("active");
    }
  });


  const slideContainer = document.querySelector('.slides');
let slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
let slideCount = slides.length;
let interval;

// Clone first slide for infinite effect
const firstClone = slides[0].cloneNode(true);
slideContainer.appendChild(firstClone);
slideCount++;

// Slide function
function goToSlide(index) {
  slideContainer.style.transition = 'transform 0.8s ease';
  slideContainer.style.transform = `translateX(-${index * 100}vw)`;
  currentSlide = index;

  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide % (slideCount - 1));
  });
}

// Auto slide
function startSlider() {
  interval = setInterval(() => {
    goToSlide(currentSlide + 1);
  }, 3000);
}

function stopSlider() {
  clearInterval(interval);
}

// Infinite loop reset
slideContainer.addEventListener('transitionend', () => {
  if (currentSlide === slideCount - 1) {
    slideContainer.style.transition = 'none';
    slideContainer.style.transform = 'translateX(0)';
    currentSlide = 0;

    // Re-enable transition shortly after
    setTimeout(() => {
      slideContainer.style.transition = 'transform 0.8s ease';
    }, 50);
  }
});

// Dot click
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    stopSlider();
    goToSlide(i);
    startSlider();
  });
});

// Controller click (example usage)
function showSlide(index) {
  const totalSlides = slideCount;
  const newIndex = (index + totalSlides) % totalSlides;
  stopSlider();
  goToSlide(newIndex);
  startSlider();
}

// Start slider initially
startSlider();

  
// Reveal animations on scroll
const timelineSteps = document.querySelectorAll('.timeline-step');

function revealSteps() {
  const triggerBottom = window.innerHeight * 0.9;
  timelineSteps.forEach(step => {
    const boxTop = step.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      step.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealSteps);

 