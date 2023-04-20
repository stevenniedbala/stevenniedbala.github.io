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


// Add swipe functionality

document.addEventListener('touchstart', e => {
  // Get the current slide
  const activeSlide = document.querySelector('.slide.active')

  // If the user swiped left, go to the previous slide
  if (e.direction === 'left') {
    const previousSlide = activeSlide.previousElementSibling
    if (previousSlide) {
      activeSlide.classList.remove('active')
      previousSlide.classList.add('active')
    }
  }

  // If the user swiped right, go to the next slide
  if (e.direction === 'right') {
    const nextSlide = activeSlide.nextElementSibling
    if (nextSlide) {
      activeSlide.classList.remove('active')
      nextSlide.classList.add('active')
    }
  }
})
