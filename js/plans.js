plansElement = document.getElementById("plans");

//Intitialize modal menu for adding plans
let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];

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
    if (plan.Thumbnail != null && plan.Thumbnail != "") {
      PlanCard.style.background = `url("${plan.Thumbnail}") no-repeat center center`;
      PlanCard.style.backgroundSize = "auto 100%";
    }
    let closebutton = document.createElement("button");
    closebutton.className = "deleteBtn";
    closebutton.onclick = function (event) {
      deletePlan(plan.PlanID);
      event.stopPropagation();
    };
    let icon = document.createElement("i");
    icon.className = "fa fa-trash";
    closebutton.appendChild(icon);
    PlanCard.appendChild(closebutton);

    let planID = document.createElement("p");
    planID.className = "plan-itemID";
    planID.innerHTML = `Plan ${plan.PlanID} : ${plan.Title}`;
    PlanCard.appendChild(planID);

    let planDesc = document.createElement("p");
    planDesc.className = "plan-itemDesc";
    planDesc.innerHTML = plan.Description;
    PlanCard.appendChild(planDesc);

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

let deletingPlans = [];
async function deletePlan(planID) {
  if (deletingPlans.includes(planID)) {
    return;
  }
  deletingPlans.push(planID);
  data = {
    planID: planID,
  };
  let response = await fetch(url + "/api/userplans", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify(data),
  });
  GetPlans();
}
//Get Plans and build plansgrid. Disable plansgrid while building and reenable after building
async function GetPlans() {
  plansElement.style.display = "none";
  try {
    let response = await fetch(url + "/api/userplans", {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    if (response.status == 200) {
      let data = await response.json();
      Plans = data;
    } else if (response.status == 401) {
      localStorage.clear();
      window.location.href = "../signUpPage/signup.html";
    }
    BuildPlans();
  } catch (err) {
    console.error("Error: ", err);
  }
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
      window.location.href = "../signUpPage/signup.html";
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
