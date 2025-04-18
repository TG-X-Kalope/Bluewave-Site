
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