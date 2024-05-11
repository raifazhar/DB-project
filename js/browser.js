
fetch(url + "/api/browser", {
  method: "GET",
  headers: { "Content-Type": "application/json;charset=UTF-8" },
})
  .then(async (response) => {
    if (response.status == 200) {
      reorganizebrowser(response);
    }
  })
  .catch((err) => {
    console.error("Error: ", err);
  });

const searchbutton = document.querySelector("#search");
searchbutton.addEventListener("click", function () {
  const inputValue = document.getElementById("searchtext").value;
  search(inputValue);
});

async function search(string) {
  fetch(url + "/api/search?searchstring=" + string, {
    method: "GET",
    headers: { "Content-Type": "application/json;charset=UTF-8" },
  })
    .then(async (response) => {
      if (response.status == 200) {
        reorganizebrowser(response);
      }
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
}

async function reorganizebrowser(response) {
  const browsercontainer = document.querySelector("#grid-container");
  while (browsercontainer.hasChildNodes()) {
    browsercontainer.removeChild(browsercontainer.firstChild);
  }

  let responsejson = await response.json();
  console.log(responsejson);
  responsejson.forEach((element) => {
    var browserli = document.createElement("li");
    var browsertitle = document.createElement("div");
    browsertitle.classList.add("broswercell-textcontainer");
    browsertitle.innerHTML = `<a href="" class="browsercell-title">${element.Name}</a>`;
    var browserimg = document.createElement("img");
    browserimg.setAttribute("src", element.Thumbnail);
    browserimg.classList.add("browsercell-image");
    browserli.appendChild(browsertitle);
    browserli.appendChild(browserimg);
    browserli.setAttribute("data-picture-id", element.PlaceID);
    browserli.addEventListener("click", function () {
      getpage(element.PlaceID);
    });
    browsercontainer.appendChild(browserli);
  });
}
function getpage(id) {
  console.log(id);
  window.location.href = "../placePage/place.html?id=" + id;
}
