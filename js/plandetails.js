const pageurl = new URL(window.location.href);
const id = pageurl.searchParams.get("planid");
if (!Number.isInteger(parseInt(id))) {
  window.location.href = "../homepage/homepage.html";
}
url = "https://db-project-api.vercel.app";
url = "http://localhost:3000";
//Global Variables
var modal = document.getElementById("modalSelect");
var modal2 = document.getElementById("modalTime");
var span = document.getElementById("closeSelect");
var span2 = document.getElementById("closeTime");
var btn = document.getElementById("add-destination");
destinations = [];
let selectedDestinationID;
let selectedDestinationIndex;

//For modal display to select destinations
span.onclick = function () {
  modal.style.display = "none";
};
span2.onclick = function () {
  modal2.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modal2) {
    modal2.style.display = "none";
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
function GetDestinations() {
  fetch(url + "/api/destinations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  }).then((response) => {
    if (response.status == 200) {
      response.json().then((data) => {
        destinations = data;
        BuildDestinations();
      });
    } else if (response.status == 401) {
    }
  });
}

function BuildDestinations() {
  let destinationlist = document.getElementById("modaldestinationlist");
  let modal2Header = document.getElementById("modalTimeHeader");
  destinationlist.innerHTML = "";

  let i = 0;
  for (let i = 0; i < destinations.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = destinations[i].DestinationName;
    li.onclick = function () {
      modal.style.display = "none";
      modal2.style.display = "block";
      modal2Header.innerHTML = destinations[i].DestinationName;
      selectedDestinationID = destinations[i].DestinationID;
      selectedDestinationIndex = i;
    };
    destinationlist.appendChild(li);
  }
}
//PlanDetails is an array that contains destinations and their timings
let planDetails = [];
function BuildPlanDetails() {
  let destinationlist = document.getElementById("destinationlist");
  destinationlist.innerHTML = "";
  //Build the actual CSS Card for the destination
  planDetails.forEach((planDetail) => {
    let li = document.createElement("li");
    let name = destinations[planDetail.id].DestinationName;
    let date = planDetail.date.toISOString().split("T")[0];
    li.innerHTML = `<span class="close">&times;</span>
    <div class="card">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${date}</p>
      </div>
      </div>`;
    li.children[0].onclick = function () {
      planDetails = planDetails.filter((plan) => plan.id != planDetail.id);
      BuildPlanDetails();
    };
    destinationlist.appendChild(li);
  });
  let btn = document.createElement("button");
  btn.innerHTML = "+";
  btn.id = "add-destination";
  destinationlist.appendChild(btn);
  InitializeButton();
}
function GetPlanDetails() {
  fetch(url + "/api/userplans/details", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
  }).then((response) => {
    if (response.status == 200) {
      console.log(response);
    }
  });
}

function SetPlanDetails() {
  let data = {
    planID: id,
    details: planDetails,
  };
  fetch(url + "/api/userplans/details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    console.log(response);
  });
}

function AddSelectedDestinationToPlan() {
  let date = new Date(document.getElementById("dateinput").value);
  if (date == "Invalid Date" || date == null || date == "") {
    alert("Invalid Date");
    return;
  }
  modal2.style.display = "none";
  document.getElementById("dateinput").value = "";
  planDetails.push({ id: selectedDestinationIndex, date: date, destinationID: selectedDestinationID });
  selectedDestinationID = null;
  selectedDestinationIndex = null;
  BuildPlanDetails();
}
window.addEventListener("checkUserFinished", GetDestinations);
window.addEventListener("checkUserFinished", GetPlanDetails);
