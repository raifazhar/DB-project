const pageurl = new URL(window.location.href);
const id = pageurl.searchParams.get("planid");
url = "https://db-project-api.vercel.app";
// url = "http://localhost:3000";
var modal = document.getElementById("modalSelect");
var span = document.getElementsByClassName("close")[0];
var btn = document.getElementById("add-destination");
//For modal display to select destinations
span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function InitializeButton() {
  btn = document.getElementById("add-destination");
  btn.onclick = function () {
    modal.style.display = "block";
  };
}
InitializeButton();

//Actual functionality
destinations = [];
function GetDestinations() {
  fetch(url + "/api/destinations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  }).then((response) => {
    if (response.status == 200) {
      response.json().then((data) => {
        console.log(data);
        destinations = data;
        BuildDestinations();
      });
    } else if (response.status == 401) {
    }
  });
}

function BuildDestinations() {
  let destinationlist = document.getElementById("modaldestinationlist");
  destinationlist.innerHTML = "";
  destinations.forEach((destination) => {
    let li = document.createElement("li");
    li.innerHTML = destination.DestinationName;
    li.onclick = function () {};
    destinationlist.appendChild(li);
  });
}

function BuildPlanDetails() {}
function GetPlanDetails() {}

function SetPlanDetails() {}

window.addEventListener("checkUserFinished", GetDestinations);
