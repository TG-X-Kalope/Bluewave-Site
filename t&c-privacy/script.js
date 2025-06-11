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