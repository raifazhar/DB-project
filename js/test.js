const images = document.getElementsByClassName("parallax");

window.addEventListener("mousemove", (mouse) => {
  var mX = mouse.offsetX - window.screen.availWidth / 2;
  console.log(mouse.offsetY);
  var mY = mouse.offsetY;
  Array.from(images).forEach((el) => {
    el.style.transform = `translateX(${mX * 0.1}%)`;
  });
});
