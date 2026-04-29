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

// Close nav drawer when user scrolls — disappears before header does
(function () {
  const projects = document.getElementById('projectssection');
  if (!projects) return;
  window.addEventListener('scroll', function () {
    if (!navDrawer || !navDrawer.classList.contains('open')) return;
    const projectsTop = projects.getBoundingClientRect().top;
    if (projectsTop <= window.innerHeight * 0.75) {
      navClose();
    }
  }, { passive: true });
})();

// Hide mobile toggle when scrolled back up to header area or nav drawer is open
(function () {
  const toggle = document.getElementById('dark-toggle');
  if (!toggle) return;
  function updateToggleVisibility() {
    const togglePageTop = parseFloat(toggle.style.top) || 0;
    const headerHeight = 60;
    const behindHeader = window.scrollY + headerHeight >= togglePageTop;
    const navOpen = document.body.classList.contains('nav-open');
    if (behindHeader || navOpen) {
      toggle.classList.add('hidden');
    } else {
      toggle.classList.remove('hidden');
    }
  }
  window.addEventListener('scroll', updateToggleVisibility, { passive: true });
  // Also re-check when nav opens/closes
  document.getElementById('nav-toggle') && document.getElementById('nav-toggle').addEventListener('click', function () {
    setTimeout(updateToggleVisibility, 50);
  });
})();

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


