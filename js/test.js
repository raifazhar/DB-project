const images = document.querySelectorAll(".parallax");
let xValue = 0,
  yValue = 0;
window.addEventListener("mousemove", (mouse) => {
  xValue = mouse.clientX - window.innerWidth / 2;
  yValue = mouse.clientY - window.innerHeight / 2;
  images.forEach((image) => {
    let speedx = image.dataset.speedx;
    let speedy = image.dataset.speedy;
    image.style.transform = `translate(${-xValue * speedx * 0.025}%) translateY(${-yValue * speedy * 0.025}%)`;
  });
});
