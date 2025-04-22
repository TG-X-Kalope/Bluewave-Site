
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


  let isPaused = false;



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
  
  // Core slide function
  function goToSlide(index) {
    slideContainer.style.transition = 'transform 0.8s ease';
    slideContainer.style.transform = `translateX(-${index * 100}vw)`;
    currentSlide = index;
  
    // Dot update
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide % (slideCount - 1));
    });
  }
  
  // Auto-loop handler
  function startSlider() {
    interval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 3000);
  }
  function stopSlider() {
    clearInterval(interval);
  }
  
  // Infinite loop handling
  slideContainer.addEventListener('transitionend', () => {
    if (currentSlide === slideCount - 1) {
      slideContainer.style.transition = 'none';
      slideContainer.style.transform = 'translateX(0)';
      currentSlide = 0;
      // re-enable transition after a tiny delay
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
  
  // Prev/Next controller
  function showSlide(index) {
    const totalSlides = document.querySelectorAll('.slide').length;
    currentSlide = (index + totalSlides) % totalSlides;
    goToSlide(currentSlide);
    
    if (!isPaused) {
      clearInterval(interval);  // Pause only on first interaction
      isPaused = true;
    } else {
      startSlider();            // Resume on second interaction
      isPaused = false;
    }
  }
  
  // Hover pause
  slideContainer.addEventListener('mouseenter', stopSlider);
  slideContainer.addEventListener('mouseleave', startSlider);
  
  // Start
  goToSlide(0);
  startSlider();
  