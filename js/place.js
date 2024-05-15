// Get the URL of the current page
const urlplace = new URL(window.location.href);

// Get the value of a specific query parameter
const id = urlplace.searchParams.get("id");
let destinations;
let selectedDestinationID=0;
function GetDestinations() {
  fetch(url + "/api/placepage?pageid=" + id, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  }).then(async (response) => {
    if (response.status == 200) {
      const responsejson = await response.json();
      destinations=responsejson;
      createdes(responsejson);
    }
  });
}

const right = document.querySelector(".right");
const left = document.querySelector(".left");
var container;
var title;
var description;
currentIndex = 0;
activeindex = 0;

function createdes(results) {
  const wrapper = document.querySelector(".wrapper");

  results.forEach((element) => {
    var image = document.createElement("div");
    image.classList.add("image");
    image.innerHTML = `<img
    src="${element.Thumbnail}"
    alt="">
    <h3>${element.DestinationName}</h3>
    <p style="display:none">${element.Description}</p>
    <p id="destID" style="display:none;">${element.DestinationID}</p>`
    wrapper.appendChild(image);
  });
  const first = wrapper.firstElementChild;
  first.classList.add("active");

  const info = document.querySelector(".info");
  info.innerHTML = `<h1 class="title"></h1>
  <div class="description">
  <p></p>  
  </div>`;

  container = document.querySelectorAll(".image");
  title = document.querySelector(".title");
  description = document.querySelector(".description p");
  overidebackground(first);
  for (let j = 0; j < container.length; j++) {
    container[j].addEventListener("click", function () {
      container.forEach((element) => {
        element.classList.remove("active");
      });
      container[j].classList.add("active");
      activeindex = j;
      if (!moveelementleft()) {
        moveelementright();
      }
      overidebackground(container[j]);
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
	const imgChild = element.querySelector("img");
	const titleelement = element.querySelector("h3");
	const descriptionelement = element.querySelectorAll("p");
	document.body.style.background = `url(${imgChild.getAttribute(
		"src"
	)}) no-repeat top/cover`;
	title.textContent = titleelement.textContent;
	description.textContent = descriptionelement[0].textContent;
  selectedDestinationID = descriptionelement[1].textContent;

  //change the ReviewText and rating
  ReviewDescription.value = "";
  rating = -1;
  checkedIndex = -1;
  //reset the radio buttons
  
  radios.forEach(radio => {
    radio.checked = false;
  });

  resetStars();
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

window.addEventListener("checkUserFinished", GetDestinations);


//Review Stuff

var modalDiv = document.getElementById("myModal");
var modalContentDiv = document.getElementById("modal-content");
const starDiv = document.getElementById("StarDiv");
const inputDiv = document.getElementById("InputDiv");
const radios = inputDiv.querySelectorAll("input[type='radio']");
const labels = starDiv.querySelectorAll("label");

const SubmitButton = document.getElementById("ReviewSubmit");
const ReviewDescription = document.getElementById("ReviewDescription");

function OnAddReviewButtonClick(){
  modalDiv.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == modalDiv) {
      modalDiv.style.display = "none";
    }
};

SubmitButton.addEventListener("click",()=>{
    PostDestinationRating();
    modalDiv.style.display = "none";
});


let checkedIndex;
let rating = -1;

radios.forEach((radio, index) => {
    radio.addEventListener("mouseover", function() {
        resetStars(); // Reset stars class
        fillStars(index); // Fill stars up to hovered star
    });
});

inputDiv.addEventListener("mouseleave", function() {
    resetStars(); // Reset stars class when mouse leaves the star area
});
starDiv.addEventListener("mouseleave", function() {
    resetStars(); // Reset stars class when mouse leaves the star area
});

function fillStars(index) {
    for (let i = 0; i <= index; i++) {
        labels[i].classList.remove("fa-star-o");
        labels[i].classList.add("fa-star"); // Add class to fill stars up to the hovered star
    }
}

function resetStars() {
    labels.forEach(label => {
        label.classList.remove("fa-star");
        label.classList.add("fa-star-o"); // Remove class from all stars
    });
    // If a radio button is checked, fill stars up to that point
    checkedIndex = Array.from(radios).findIndex(radio => radio.checked);
    if (checkedIndex !== -1) {
        fillStars(checkedIndex);
    }
}

//checkedIndex is correct but the calue is not updated the moment we want to get it so call this function to get updated

radios.forEach((radio) => {
    radio.addEventListener("change",()=>{
        rating = Array.from(radios).findIndex(radio => radio.checked);
    });
});


function PostDestinationRating(){
  let RatingData = {
    rating:rating,
    destinationID:selectedDestinationID,
    DescriptionReview:ReviewDescription.value
  }
  fetch(url + "/api/review" , {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=UTF-8",
    "x-auth-token":localStorage.getItem("token")},
    body:JSON.stringify(RatingData)
  }).then(async (response) => {
    if (response.status == 200) {
      let message = await response.json();
      window.alert(message.message);
    }
    else if(response.status == 401){
      window.alert("Please log in Again");
    }
  });
}


function GetReviews(){
  fetch(url + "/api/review?destinationID=" + 1 , {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8"},
  }).then(async (response) => {
    if (response.status == 200) {
      let result = await response.json();
      console.log(result);
    }
    else if(response.status == 401){
      window.alert("Please log in Again");
    }
  });
}

