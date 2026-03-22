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

// Project Image Carousel
document.querySelectorAll('.carousel-arrow').forEach((arrow) => {
    arrow.addEventListener('click', () => {
        const carousel = arrow.closest('.project-carousel');
        const images = carousel.querySelectorAll('.project-image');
        let activeIndex = 0;
        images.forEach((img, i) => {
            if (img.classList.contains('active')) activeIndex = i;
        });
        images[activeIndex].classList.remove('active');
        if (arrow.classList.contains('right')) {
            activeIndex = (activeIndex + 1) % images.length;
        } else {
            activeIndex = (activeIndex - 1 + images.length) % images.length;
        }
        images[activeIndex].classList.add('active');
    });
});

// Project Card Toggle
document.querySelectorAll('.project-link').forEach((btn) => {
    btn.addEventListener('click', () => {
        const box = btn.closest('.project-box');
        box.classList.toggle('expanded');
        btn.textContent = box.classList.contains('expanded') ? 'Close' : 'View Details';
    });
});

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
