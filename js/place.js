// Get the URL of the current page
const urlplace = new URL(window.location.href);
url = "https://db-project-api.vercel.app";
url = "http://localhost:3000";
// Get the value of a specific query parameter
const id = urlplace.searchParams.get("id");
//console.log(id); // Output: The value of the 'id' query parameter
fetch(url + "/api/placepage?pageid=" + 1, {
  method: "GET",
  headers: { "Content-Type": "application/json;charset=UTF-8" },
}).then(async (response) => {
  if (response.status == 200) {
    const responsejson = await response.json();
    const pageId = responsejson.pageid;
    const description = responsejson.description;

    // Access picture IDs and URLs
    // for (const pictureId in responsejson) {
    //     if (pictureId !== 'pageid' && pictureId !== 'description')
    //     {
    //         const url = responsejson[pictureId];
    //         // Use `pictureId` and `url` as needed
    //         console.log(`Picture ID: ${pictureId}, URL: ${url}`);
    //     }
    // }

    //document.body.style.background = `url(${responsejson[1]}) no-repeat top/cover`;
  }
});

const right = document.querySelector(".right");
const left = document.querySelector(".left");
const container = document.querySelectorAll(".image");
currentIndex = 0;
activeindex = 0;
// container.forEach((element ,index) => {

//     element.addEventListener("click", function () {
//         container.forEach(element => {element.classList.remove("active")})
//         element.classList.add("active");
//         activeindex=index
//         overidebackground(element)
//         index++;
//       });
// });

for (let j = 0; j < container.length; j++) {
  container[j].addEventListener("click", function () {
    container.forEach((element) => {
      element.classList.remove("active");
    });
    container[j].classList.add("active");
    activeindex = j;
    overidebackground(container[j]);
  });
}
right.addEventListener("click", function () {
  moveelementright(1);
});
left.addEventListener("click", function () {
  moveelementleft(1);
});

function overidebackground(element) {
  const imgChild = element.querySelector("img");
  document.body.style.background = `url(${imgChild.getAttribute("src")}) no-repeat top/cover`;
}
function moveelementright(times) {
  for (let i = 0; i < times; i++) {
    if (currentIndex < container.length - 4 && activeindex - currentIndex >= 1) {
      container[currentIndex].classList.remove("visible");

      currentIndex++;
      container[currentIndex + 3].classList.add("visible");
    }
    if (activeindex < container.length - 1) {
      container[activeindex].classList.remove("active");
      activeindex++;
      container[activeindex].classList.add("active");
      overidebackground(container[activeindex]);
    }
  }
}
function moveelementleft(times) {
  for (let i = 0; i < times; i++) {
    if (currentIndex >= 1 && activeindex - currentIndex < 2) {
      container[currentIndex + 3].classList.remove("visible");

      currentIndex--;
      container[currentIndex].classList.add("visible");
    }
    if (activeindex >= 1) {
      container[activeindex].classList.remove("active");
      activeindex--;
      container[activeindex].classList.add("active");
      overidebackground(container[activeindex]);
    }
  }
}
