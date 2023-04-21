// Get the sections on the page
const sections = [...document.querySelectorAll("section")];

// Set a variable to track the current scroll position
let currentScrollPosition = 0;

// Add an event listener for the scroll event
document.addEventListener("scroll", () => {

  // Get the new scroll position
  const newScrollPosition = window.pageYOffset;

  // Iterate over the sections
  for (let i = 0; i < sections.length; i++) {

    // If the new scroll position is greater than or equal to the top of the current section
    if (newScrollPosition >= sections[i].offsetTop && newScrollPosition < sections[i].offsetTop + (sections[i].clientHeight / 2)) {

      // Remove the "active" class from all sections
      for (let j = 0; j < sections.length; j++) {
        sections[j].classList.remove("active");
      }

      // Add the "active" class to the current section
      sections[i].classList.add("active");
    } else {
      // If the new scroll position is less than the top of the current section or greater than or equal to the bottom of the current section, remove the "active" class from the current section
      sections[i].classList.remove("active");
    }
  }
});

function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({ block: "start", behavior: "smooth" });
}
