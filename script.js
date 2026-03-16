const slides = ["#slide1", "#slide2", "#slide3"];
let currentSlide = 0;
let toughMode = false;

window.addEventListener("DOMContentLoaded", () => {
  const screen = document.querySelector("#screen");
  const nextBtn = document.querySelector("#nextBtn");
  const moodBtn = document.querySelector("#moodBtn");
  const audience = document.querySelectorAll(".person");

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    screen.setAttribute("src", slides[currentSlide]);
  });

  moodBtn.addEventListener("click", () => {
    toughMode = !toughMode;

    audience.forEach((person, index) => {
      if (toughMode) {
        const rotations = ["0 12 0", "0 -12 0", "0 18 0"];
        const colors = ["#777777", "#888888", "#999999"];

        person.setAttribute("color", colors[index % colors.length]);
        person.setAttribute(
          "animation",
          `property: rotation; to: ${rotations[index % rotations.length]}; dir: alternate; loop: true; dur: 900`
        );
      } else {
        person.setAttribute("color", "#3366cc");
        person.removeAttribute("animation");
        person.setAttribute("rotation", "0 0 0");
      }
    });
  });
});