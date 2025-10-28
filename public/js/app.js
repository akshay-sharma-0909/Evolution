
const items = document.querySelectorAll(".nav-item");
    const toggle = document.querySelector(".toggle");

    // ✅ Function to move toggle to the correct item
    function moveToggleTo(element) {
      const rect = element.getBoundingClientRect();
      const navbarRect = element.parentElement.getBoundingClientRect();
      
      // Dynamically set position & width
      toggle.style.left = `${rect.left - navbarRect.left}px`;
      toggle.style.width = `${rect.width}px`;
    }

    // ✅ Set initial toggle position to Home
    moveToggleTo(document.querySelector(".nav-item.active"));

    // ✅ Add click events
    items.forEach(item => {
      item.addEventListener("click", () => {
        // Move toggle
        moveToggleTo(item);

        // Remove active from all, then add to clicked
        items.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
      });
    }); 


    // login btn js
    const button = document.getElementById('animatedBtn');

  button.addEventListener('click', function (e) {
    const rippleContainer = this.querySelector('.ripple-container');

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');

    // Calculate position of click inside the button
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    rippleContainer.appendChild(ripple);

    // Remove ripple after animation ends
    ripple.addEventListener('animationend', () => {
      ripple.remove();
    });
  });

  // Accessibility: allow keyboard click with enter or space
  button.addEventListener('keydown', function(e) {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this.click();
    }
  });
  // ---------------------scroll btn js------------------
  const scrollTopBtn = document.getElementById("scrollTopBtn");

// Show or hide button based on scroll position
window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

  // ------------------------------------------------------
  const openBtn = document.getElementById('open-login');
const closeBtn = document.getElementById('close-login');
const loginModal = document.getElementById('login-modal');

openBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Optional: Close if clicked outside the box
loginModal.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});
const container = document.getElementById('login-container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("login-active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("login-active");
});