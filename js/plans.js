plansElement = document.getElementById("plans");
url = "https://db-project-api.vercel.app";
// url = "http://localhost:3000";
//Intitialize modal menu for adding plans
var modal = document.getElementById("myModal");
var btn;
var span = document.getElementsByClassName("close")[0];

function InitializeButton() {
  var btn = document.getElementById("addplanbtn");
  btn.onclick = function () {
    modal.style.display = "block";
  };
}
InitializeButton();

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
//Get plans from the server
let Plans = [];
function BuildPlans() {
  let PlansGrid = document.getElementById("plans");
  PlansGrid.innerHTML = "";
  Plans.forEach((plan) => {
    let PlanCard = document.createElement("div");
    PlanCard.className = "plans-item";
    PlanCard.innerHTML = `<p class = "plan-itemID">Plan ${plan.PlanID} : ${plan.Title}</p>
    </br>
    <p class = "plan-itemDesc" >${plan.Description}</p>`;
    PlanCard.onclick = function () {
      window.location.href = "../plansPage/plandetails.html?planid=" + plan.PlanID;
    };
    PlansGrid.appendChild(PlanCard);
  });
  let AddBtn = document.createElement("button");
  AddBtn.innerHTML = "+";
  AddBtn.id = "addplanbtn";
  PlansGrid.appendChild(AddBtn);
  InitializeButton();
}

function GetPlans() {
  plansElement.style.display = "none";
  fetch(url + "/api/userplans", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          Plans = data;
          BuildPlans();
        });
      } else if (response.status == 401) {
        localStorage.clear();
        window.location.href = "../loginPage/login.html";
      }

      BuildPlans();
    })
    .catch((err) => {
      console.error("Error: ", err);
    });
  plansElement.style.display = "grid";
}
//Function for adding plans, turn submit button into loader and either show error or rebuild plans after adding
function AddPlan() {
  let loader = document.getElementById("loader");
  let submit = document.getElementById("submitbtn");
  loader.style.display = "block";
  submit.style.display = "none";
  let name = document.getElementById("nameinput").value;
  let description = document.getElementById("descriptioninput").value;
  let dateString = document.getElementById("dateinput").value;
  let form = document.getElementById("planForm");
  let date = new Date(dateString);
  if (date <= new Date()) {
    alert("Invalid Date");
    loader.style.display = "none";
    submit.style.display = "inline-block";
    return false;
  }
  let data = {
    title: name,
    description: description,
    date: date,
  };
  fetch(url + "/api/userplans", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (response.status == 200) {
      GetPlans();
      modal.style.display = "none";
    } else if (response.status == 401) {
      localStorage.clear();
      window.location.href = "../loginPage/login.html";
    } else {
      alert("Server Error");
    }
    form.reset();
    loader.style.display = "none";
    submit.style.display = "inline-block";
  });
  return false;
}
window.addEventListener("checkUserFinished", GetPlans);
