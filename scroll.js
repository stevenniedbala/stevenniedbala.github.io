function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({ block: "start", behavior: "smooth" });
}

// Nav drawer toggle
const navToggle = document.getElementById('nav-toggle');
const navDrawer = document.getElementById('nav-drawer');

function navClose() {
    if (!navDrawer) return;
    navDrawer.classList.remove('open');
    document.body.classList.remove('nav-open');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
}

if (navToggle && navDrawer) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = navDrawer.classList.toggle('open');
        document.body.classList.toggle('nav-open', isOpen);
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    document.addEventListener('click', (e) => {
        if (!navDrawer.contains(e.target) && e.target !== navToggle) navClose();
    });
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
        const images = Array.from(carousel.querySelectorAll('.project-image')).filter(
            img => getComputedStyle(img).display !== 'none'
        );
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

// Fade header out when projects section reaches it, fade back in on scroll up
(function () {
  const header = document.querySelector('header');
  const projects = document.getElementById('projectssection');
  if (!header || !projects) return;
  window.addEventListener('scroll', function () {
    const projectsTop = projects.getBoundingClientRect().top;
    if (projectsTop <= header.offsetHeight) {
      header.classList.add('fading');
      document.body.classList.add('header-gone');
    } else {
      header.classList.remove('fading');
      document.body.classList.remove('header-gone');
    }
  }, { passive: true });
})();

// Hide dark toggle once the bottom of the strategy section passes the bottom of the viewport
(function () {
  const toggle = document.getElementById('dark-toggle');
  const strategy = document.getElementById('strategysection');
  if (!toggle || !strategy) return;
  window.addEventListener('scroll', function () {
    const strategyBottom = strategy.getBoundingClientRect().bottom;
    if (strategyBottom <= window.innerHeight) {
      toggle.classList.add('hidden');
    } else {
      toggle.classList.remove('hidden');
    }
  }, { passive: true });
})();

