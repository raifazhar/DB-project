// Get the URL of the current page
const urlplace = new URL(window.location.href);

// Get the value of a specific query parameter
const id = urlplace.searchParams.get("id");
fetch(url + "/api/placepage?pageid=" + id, {
  method: "GET",
  headers: { "Content-Type": "application/json;charset=UTF-8" },
}).then(async (response) => {
  if (response.status == 200) {
    const responsejson = await response.json();
    console.log(responsejson)
    createdes(responsejson)

  }
});

const right = document.querySelector(".right");
const left = document.querySelector(".left");
var container;
var title
var description
currentIndex = 0;
activeindex = 0;

function createdes(results)
{
  const wrapper=document.querySelector(".wrapper")
  
  results.forEach(element => {
    var image=document.createElement("div");
    image.classList.add("image")
    image.innerHTML=`<img
    src="${element.Thumbnail}"
    alt="">
    <h3>${element.DestinationName}</h3>
    <p style="display:none">${element.Description}</p>`
    wrapper.appendChild(image)
  });
  //console.log(wrapper)
  console.log(wrapper.firstChild)
  const first=wrapper.firstElementChild
  first.classList.add("active")

  const info=document.querySelector(".info")
  info.innerHTML=`<h1 class="title"></h1>
  <div class="description">
  <p></p>  
  </div>`

  container=document.querySelectorAll(".image")
  title=document.querySelector(".title")
  description=document.querySelector(".description p")
  overidebackground(first)
  for (let j = 0; j < container.length; j++) {
    container[j].addEventListener("click", function () {
      container.forEach((element) => {
        element.classList.remove("active");
      });
      container[j].classList.add("active");
      activeindex = j;
      if(!moveelementleft())
      {
        moveelementright()
      }
      overidebackground(container[j])
    });
  }
}


right.addEventListener("click", function () {
  if (activeindex < container.length - 1) {
    container[activeindex].classList.remove("active");
    activeindex++;
    container[activeindex].classList.add("active");
    overidebackground(container[activeindex]);
  }
  moveelementright();
});
left.addEventListener("click", function () {
  if (activeindex >= 1) {
    container[activeindex].classList.remove("active");
    activeindex--;
    container[activeindex].classList.add("active");
    overidebackground(container[activeindex]);
  }
  moveelementleft();
});

function overidebackground(element) {
  const imgChild = element.querySelector("img")
  const titleelement=element.querySelector("h3")
  const descriptionelement=element.querySelector("p")
  document.body.style.background = `url(${imgChild.getAttribute("src")}) no-repeat top/cover`;
  title.textContent=titleelement.textContent;
  description.textContent=descriptionelement.textContent
}

const wrapper = document.querySelector(".wrapper");
function moveelementright() {
  if (currentIndex <= container.length - 4 && activeindex - currentIndex >= 2) {
    const img = container[currentIndex].querySelector("img");
    currentIndex++;
    const targetScrollLeft = img.width + (2 * window.innerWidth) / 100 + 4 + wrapper.scrollLeft;
    handleScrollEnd(targetScrollLeft);
    return true;
  }
  return false;
}
function moveelementleft() {
  enter = 0;
  for (; currentIndex >= 1 && activeindex - currentIndex < 2; ) {
    enter = 1;
    const img = container[currentIndex].querySelector("img");
    currentIndex--;
    const targetScrollLeft = -img.width - (2 * window.innerWidth) / 100 - 4 + wrapper.scrollLeft;
    handleScrollEnd(targetScrollLeft);
    return true;
  }
  return false;
}

function handleScrollEnd(targetScrollLeft) {
  let isScrolling = false;
  if (isScrolling) {
    wrapper.scrollTo({ left: targetScrollLeft }); // Instant jump to target position
  } else {
    // Smoothly scroll to the target position
    wrapper.scrollTo({
      left: targetScrollLeft,
      behavior: "smooth",
    });
  }
  // Remove the event listener once scrolling is done
  wrapper.addEventListener("scroll", () => {
    isScrolling = false; // Reset the scrolling flag
  });
}

window.addEventListener("checkUserFinished", GetPlaceData);
