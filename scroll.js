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

    // Get the top position of the section
    const sectionTopPosition = sections[i].offsetTop;

    // If the new scroll position is greater than or equal to the top position of the section
    if (newScrollPosition >= sectionTopPosition) {

      // Add the "active" class to the section
      sections[i].className = "active";

      // Remove the "active" class from all sections that are not currently visible
      for (let j = 0; j < sections.length; j++) {
        if (i !== j && newScrollPosition >= sections[j].offsetTop) {
          sections[j].className = "";
        }
      }
    } else if (newScrollPosition < sections[i].offsetTop && sections[i].className === "active") {
      sections[i].className = "";
    }
  }

  // Set the current scroll position to the new scroll position
  currentScrollPosition = newScrollPosition;
});

function scrollSmoothTo(elementId) {
  var element = document.getElementById(elementId);
  element.scrollIntoView({ block: "start", behavior: "smooth" });
}
