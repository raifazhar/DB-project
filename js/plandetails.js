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
let loader = document.getElementById("loader");
let saveButton = document.getElementById("savePlan");
let scroller = document.getElementById("scroller");
let isOwner = false;
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

//Actual functionality
async function GetDestinations() {
  let response = await fetch(url + "/api/destinations", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  if (response.status == 200) {
    let responsejson = await response.json();
    destinations = responsejson;
    BuildDestinations();
    GetPlanDetails();
  }
}

let binarySearchDestination = function (x) {
  let start = 0,
    end = destinations.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2);
    if (destinations[mid].DestinationID === x) return mid;
    else if (destinations[mid].DestinationID < x) start = mid + 1;
    else end = mid - 1;
  }
  return false;
};

async function GetPlanDetails() {
  const response = await fetch(`${url}/api/userplans/details?planID=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
  });
  if (response.status == 200) {
    const data = await response.json();
    let details = data.result;
    planDetails = [];
    for (let i = 0; i < details.length; i++) {
      let index = binarySearchDestination(details[i].DestinationID);
      planDetails.push({
        id: index,
        date: new Date(details[i].Date),
        destinationID: details[i].DestinationID,
      });
    }
    if (data.status === 1) {
      isOwner = true;
    } else {
      let topRow = document.getElementById("topRow");
      topRow.innerHTML = "";
      btn.innerHTML = "";
      btn.hidden = true;
    }
    BuildPlanDetails();
  }
}
async function SetPlanDetails() {
  loader.style.display = "block";
  saveButton.style.display = "none";
  let data = {
    planID: id,
    details: planDetails,
  };
  const response = await fetch(url + "/api/userplans/details", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  if (response.status == 200) {
    alert("Plan Details Updated");
  }
  loader.style.display = "none";
  saveButton.style.display = "block";
}

function AddSelectedDestinationToPlan() {
  let date = new Date(document.getElementById("dateinput").value);
  if (date == "Invalid Date" || date == null || date == "") {
    alert("Invalid Date");
    return;
  }
  modal2.style.display = "none";
  document.getElementById("dateinput").value = "";
  planDetails.push({
    id: selectedDestinationIndex,
    date: date,
    destinationID: selectedDestinationID,
  });
  selectedDestinationID = null;
  selectedDestinationIndex = null;
  BuildPlanDetails();
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
    let divcard = document.createElement("div");
    li.style.background = "url(" + destinations[planDetail.id].Thumbnail + ") no-repeat center/cover";
    divcard.className = "card";
    divcard.style.height = "100%";
    let innerhtml = `
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">${date}</p>
      </div>
      <div class="card-description">
      <p>${destinations[planDetail.id].Description}</p>
      </div>
      `;
    divcard.innerHTML = innerhtml;
    if (isOwner) {
      li.innerHTML = `<span id="cardclose" class="close">&times;</span>`;
    }
    li.append(divcard);
    li.children[0].onclick = function () {
      planDetails = planDetails.filter((plan) => plan.id != planDetail.id);
      BuildPlanDetails();
    };
    destinationlist.appendChild(li);
  });
  scroller.innerHTML = "";
  //Once Destination List is built we also build the scroller
  let ul = document.createElement("ul");
  //IF number of destinations is greater than 10, we start to group them
  let dots = 10;
  if (planDetails.length < dots) dots = planDetails.length;
  let distribution = Array(dots).fill(Math.floor(planDetails.length / dots));
  for (let i = 0; i < planDetails.length % dots; i++) distribution[i]++;
  //Move each element forward by one then do cumulative sum
  for (let i = dots - 2; i > 0; i--) distribution[i + 1] = distribution[i];
  distribution[0] = 0;
  for (let i = 1; i < dots; i++) distribution[i] += distribution[i - 1];
  for (let i = 0; i < dots; i++) {
    let containerdiv = document.createElement("div");
    containerdiv.className = "dotcontainer";
    let li = document.createElement("li");
    li.onclick = function () {
      let element = document.getElementById("destinationlist").children[distribution[i]];
      element.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
    };
    containerdiv.appendChild(li);
    let div = document.createElement("div");
    div.className = "dotinfo";
    div.innerHTML = `${destinations[planDetails[distribution[i]].id].DestinationName}`;
    div.style.display = "block";
    containerdiv.appendChild(div);
    ul.appendChild(containerdiv);
    let line = document.createElement("div");
    line.className = "line";
    ul.appendChild(line);
  }
  scroller.appendChild(ul);
  if (isOwner) {
    let btn = document.createElement("button");
    btn.innerHTML = "+";
    btn.id = "add-destination";
    scroller.appendChild(btn);
    InitializeButton();
  }
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

window.addEventListener("checkUserFinished", GetDestinations);
