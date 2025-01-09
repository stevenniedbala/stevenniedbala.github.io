function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({ block: "start", behavior: "smooth" });
}

// Function to handle fade-in and fade-out effect
const handleScrollAnimation = () => {
  const sections = document.querySelectorAll('section');

  sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      if (rect.top < windowHeight * 0.9 && rect.bottom > windowHeight * 0.1) {
          if (!section.classList.contains('visible')) {
              section.classList.add('visible');
          }
      } else {
          if (section.classList.contains('visible')) {
              section.classList.remove('visible');
          }
      }
  });
};

// Attach event listeners
document.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);
window.addEventListener('resize', handleScrollAnimation);

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  });
});



// Flip logo upside down on click
document.getElementById('logo').addEventListener('click', function (e) {
  e.preventDefault(); // Prevent the default link action
  this.classList.toggle('flipped'); // Toggle the 'flipped' class
});

// Track if the animation has already been triggered to prevent excessive flips
let lastScrollTop = 0;
let scrollTimeout;

// Debounced scroll handler
const handleScroll = () => {
    const logo = document.getElementById('logo');
    const currentScroll = window.scrollY;

    if (currentScroll > lastScrollTop) {
        logo.classList.add('flipped'); // Flip logo when scrolling down
    } else {
        logo.classList.remove('flipped'); // Reset logo when scrolling up
    }

    lastScrollTop = currentScroll; // Update last scroll position
};

// Add scroll listener with debouncing
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 100); // Trigger handleScroll after 100ms delay
});




// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
      const faqItem = button.parentElement;

      // Debug log
      console.log('Toggling FAQ item:', faqItem);

      // Close other open items
      document.querySelectorAll('.faq-item').forEach((item) => {
          if (item !== faqItem) {
              item.classList.remove('open');
          }
      });

      // Toggle the clicked item
      faqItem.classList.toggle('open');
  });
});

// Highlight the active link based on the visible section
const updateActiveLink = () => {
    const links = document.querySelectorAll('nav.center.desktop a');
    const sections = document.querySelectorAll('section');

    let index = sections.length;
    while (--index && window.scrollY + 50 < sections[index].offsetTop) {}

    links.forEach((link) => link.classList.remove('active'));
    if (links[index]) {
        links[index].classList.add('active');
    }
};

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);
