const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})



// Add a swipe event listener to the carousel container
const carouselContainer = document.querySelector("[data-carousel]")
carouselContainer.addEventListener("touchstart", (e) => {
  // Get the current x-coordinate of the touch event
  const x = e.touches[0].clientX

  // Set a variable to store the direction of the swipe
  let swipeDirection = null

  // Listen for touchmove events
  e.addEventListener("touchmove", (e) => {
    // Get the current x-coordinate of the touch event
    const newX = e.touches[0].clientX

    // Calculate the difference between the x-coordinates of the two touch events
    const dx = newX - x

    // If the difference is positive, the user is swiping to the right
    if (dx > 0) {
      swipeDirection = "right"
    } else if (dx < 0) {
      // If the difference is negative, the user is swiping to the left
      swipeDirection = "left"
    }
  })

  // Listen for touchend events
  e.addEventListener("touchend", (e) => {
    // If the user swiped to the right, go to the next slide
    if (swipeDirection === "right") {
      goToNextSlide()
    } else if (swipeDirection === "left") {
      // If the user swiped to the left, go to the previous slide
      goToPreviousSlide()
    }

    // Remove the touchstart and touchmove event listeners
    e.removeEventListener("touchstart", () => {})
    e.removeEventListener("touchmove", () => {})
  })
})

// Function to go to the next slide
function goToNextSlide() {
  const slides = carouselContainer.querySelector("[data-slides]")
  const activeSlide = slides.querySelector("[data-active]")
  let newIndex = [...slides.children].indexOf(activeSlide) + 1
  if (newIndex >= slides.children.length) newIndex = 0

  slides.children[newIndex].dataset.active = true
  delete activeSlide.dataset.active
}

// Function to go to the previous slide
function goToPreviousSlide() {
  const slides = carouselContainer.querySelector("[data-slides]")
  const activeSlide = slides.querySelector("[data-active]")
  let newIndex = [...slides.children].indexOf(activeSlide) - 1
  if (newIndex < 0) newIndex = slides.children.length - 1

  slides.children[newIndex].dataset.active = true
  delete activeSlide.dataset.active
}

