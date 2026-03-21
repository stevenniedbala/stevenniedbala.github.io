function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({ block: "start", behavior: "smooth" });
}

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

// Neighborhood animation plays once and holds final state
// All animations use animation-fill-mode: forwards to persist

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
      const faqItem = button.parentElement;

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
