 // Navbar background change on scroll
 window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    navbar.classList.toggle("scrolled", window.scrollY > 10);
  });

  // Dropdown toggle
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

  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      q.parentElement.classList.toggle('open');
    });
  });