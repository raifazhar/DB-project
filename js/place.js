
// Get the URL of the current page
const urlplace = new URL(window.location.href);
url = "https://db-project-api.vercel.app";
// url = "http://localhost:3000";
// Get the value of a specific query parameter
const id = urlplace.searchParams.get("id");
//console.log(id); // Output: The value of the 'id' query parameter
url = "https://db-project-api.vercel.app";
// url = "http://localhost:3000";
fetch("http://localhost:3000" + "/api/placepage?pageid=" + 1, {
  method: "GET",
  headers: { "Content-Type": "application/json;charset=UTF-8" },
}).then(async (response) => {
  if (response.status == 200) {
    const responsejson=await response.json();
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

const imagelist = document.querySelectorAll(".image");
imagelist.forEach(element => {
    element.addEventListener("click", function () {
        imagelist.forEach(element => {element.classList.remove("active")})
        element.classList.add("active");
        overidebackground(element)
       
      });
});

const right=document.querySelector(".right")
const left=document.querySelector(".left")
const container=document.querySelectorAll(".image")
currentIndex=0
right.addEventListener("click",function(){
  console.log(container.length)
  if (currentIndex < container.length - 4) {
    container[currentIndex].classList.remove('visible');
    if(container[currentIndex].classList.contains('active'))
    {
      container[currentIndex].classList.remove('active');
      container[currentIndex+1].classList.add('active')
      overidebackground(container[currentIndex+1])
    }
    currentIndex++;
    container[currentIndex+3].classList.add('visible');
  }
})
left.addEventListener("click",function(){
  if (currentIndex >= 1) {
    console.log("left")
    container[currentIndex+3].classList.remove('visible');
    if(container[currentIndex+3].classList.contains('active'))
    {
      container[currentIndex+3].classList.remove('active');
      container[currentIndex+2].classList.add('active')
      overidebackground(container[currentIndex+2])

    }
    currentIndex--;
    container[currentIndex].classList.add('visible');
  }
})

function overidebackground(element)
{
  const imgChild = element.querySelector("img");
  document.body.style.background=`url(${imgChild.getAttribute("src")}) no-repeat top/cover`; 
}


