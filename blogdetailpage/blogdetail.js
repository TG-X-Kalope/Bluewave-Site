


//   const slideContainer = document.querySelector('.slides');
// let slides = document.querySelectorAll('.slide');
// const dots = document.querySelectorAll('.dot');

// let currentSlide = 0;
// let slideCount = slides.length;
// let interval;

// // Clone first slide for infinite effect
// const firstClone = slides[0].cloneNode(true);
// slideContainer.appendChild(firstClone);
// slideCount++;

// // Slide function
// function goToSlide(index) {
//   slideContainer.style.transition = 'transform 0.8s ease';
//   slideContainer.style.transform = `translateX(-${index * 100}vw)`;
//   currentSlide = index;

//   // Update dots
//   dots.forEach((dot, i) => {
//     dot.classList.toggle('active', i === currentSlide % (slideCount - 1));
//   });
// }

// // Auto slide
// function startSlider() {
//   interval = setInterval(() => {
//     goToSlide(currentSlide + 1);
//   }, 3000);
// }

// function stopSlider() {
//   clearInterval(interval);
// }

// // Infinite loop reset
// slideContainer.addEventListener('transitionend', () => {
//   if (currentSlide === slideCount - 1) {
//     slideContainer.style.transition = 'none';
//     slideContainer.style.transform = 'translateX(0)';
//     currentSlide = 0;

//     // Re-enable transition shortly after
//     setTimeout(() => {
//       slideContainer.style.transition = 'transform 0.8s ease';
//     }, 50);
//   }
// });

// // Dot click
// dots.forEach((dot, i) => {
//   dot.addEventListener('click', () => {
//     stopSlider();
//     goToSlide(i);
//     startSlider();
//   });
// });

// // Controller click (example usage)
// function showSlide(index) {
//   const totalSlides = slideCount;
//   const newIndex = (index + totalSlides) % totalSlides;
//   stopSlider();
//   goToSlide(newIndex);
//   startSlider();
// }

// // Start slider initially
// startSlider();

// ==== NAVBAR LOGO SWITCH ON SCROLL ====
window.addEventListener('scroll', () => {
  const fullLogo = document.querySelector('.full-logo');
  const smallLogo = document.querySelector('.small-logo');
  const navbar = document.querySelector('.navbar');

  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
    if (fullLogo) fullLogo.style.display = 'none';
    if (smallLogo) smallLogo.style.display = 'block';
  } else {
    navbar.classList.remove('scrolled');
    if (fullLogo) fullLogo.style.display = 'block';
    if (smallLogo) smallLogo.style.display = 'none';
  }
});

// ==== DROPDOWN MENU TOGGLE ====
const toggleBtn = document.getElementById("menu-toggle");
const dropdownCard = document.getElementById("dropdownCard");

toggleBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  dropdownCard.classList.toggle("active");
});

// Close dropdown on outside click
document.addEventListener("click", function (e) {
  if (!dropdownCard.contains(e.target) && !toggleBtn.contains(e.target)) {
    dropdownCard.classList.remove("active");
  }
});

// Optional: Hide dropdown when resizing to desktop
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    dropdownCard.classList.remove("active");
  }
});


// ==== IMAGE SLIDER ====
const slideContainer = document.querySelector('.slides');
let slides = document.querySelectorAll('.slide');
let currentSlide = 1;
let isTransitioning = false;
let startX = 0;
let currentX = 0;
let isDragging = false;
let animationID;
let interval;

// Clone slides for seamless looping
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);
slideContainer.appendChild(firstClone);
slideContainer.prepend(lastClone);
slides = document.querySelectorAll('.slide');

const slideWidth = window.innerWidth;
slideContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

// Transition to slide
function goToSlide(index) {
  isTransitioning = true;
  slideContainer.style.transition = 'transform 0.5s ease';
  slideContainer.style.transform = `translateX(-${index * slideWidth}px)`;
  currentSlide = index;
}

// After transition (handle clones)
slideContainer.addEventListener('transitionend', () => {
  slideContainer.style.transition = 'none';
  if (slides[currentSlide].isSameNode(firstClone)) {
    currentSlide = 1;
    slideContainer.style.transform = `translateX(-${slideWidth}px)`;
  } else if (slides[currentSlide].isSameNode(lastClone)) {
    currentSlide = slides.length - 2;
    slideContainer.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }
  isTransitioning = false;
  startAutoSlide();  // Restart auto-slide after transition
});

// Auto-slide
function startAutoSlide() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (!isDragging) goToSlide(currentSlide + 1);
  }, 3000);
}
startAutoSlide();

// Drag functions
function startDrag(x) {
  isDragging = true;
  startX = x;
  currentX = x;
  slideContainer.style.transition = 'none';
  cancelAnimationFrame(animationID);
}

function duringDrag(x) {
  currentX = x;
  const translateX = -currentSlide * slideWidth + (currentX - startX);
  slideContainer.style.transform = `translateX(${translateX}px)`;
}

function endDrag() {
  const moveX = currentX - startX;
  if (Math.abs(moveX) > slideWidth / 4) {
    if (moveX < 0) {
      goToSlide(currentSlide + 1);
    } else {
      goToSlide(currentSlide - 1);
    }
  } else {
    goToSlide(currentSlide);
  }
  isDragging = false;
  startAutoSlide();  // Restart auto-slide after drag
}

// Wheel scroll to change slide
slideContainer.addEventListener("wheel", (e) => {
  if (isTransitioning || isDragging) return;

  stopAutoSlide();

  if (e.deltaX > 30) {
    goToSlide(currentSlide + 1); // right swipe
  } else if (e.deltaX < -30) {
    goToSlide(currentSlide - 1); // left swipe
  }

  startAutoSlide();  // Restart auto-slide after wheel interaction
});

// Mouse Events
slideContainer.addEventListener('mousedown', (e) => {
  stopAutoSlide();
  startDrag(e.clientX);
});

slideContainer.addEventListener('mousemove', (e) => {
  if (isDragging) duringDrag(e.clientX);
});

slideContainer.addEventListener('mouseup', () => {
  if (isDragging) endDrag();
});

slideContainer.addEventListener('mouseleave', () => {
  if (isDragging) endDrag();
});

// Touch Events
slideContainer.addEventListener('touchstart', (e) => {
  stopAutoSlide();
  startDrag(e.touches[0].clientX);
});

slideContainer.addEventListener('touchmove', (e) => {
  if (isDragging) duringDrag(e.touches[0].clientX);
});

slideContainer.addEventListener('touchend', () => {
  if (isDragging) endDrag();
});

// Stop slide
function stopAutoSlide() {
  clearInterval(interval);
}