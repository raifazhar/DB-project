const images = document.querySelectorAll(".parallax");
function limitNumberWithinRange(num, min, max) {
  const MIN = min ?? 1;
  const MAX = max ?? 20;
  const parsed = parseInt(num);
  return Math.min(Math.max(parsed, MIN), MAX);
}
let xValue = 0,
  yValue = 0;
window.addEventListener("mousemove", (mouse) => {
  xValue = limitNumberWithinRange(mouse.clientX - window.innerWidth / 2, -500, 500);
  yValue = limitNumberWithinRange(mouse.clientY - window.innerHeight / 2, -500, 500);
  images.forEach((image) => {
    let speedx = image.dataset.speedx;
    let speedy = image.dataset.speedy;
    image.style.transform = `translate(${-xValue * speedx * 0.025}%) translateY(${-yValue * speedy * 0.025}%)`;
  });
});
