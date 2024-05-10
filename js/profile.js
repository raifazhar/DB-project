let profilename = document.querySelector(".profile.name");
let bio = document.querySelector(".profile.bio");
let travelPrefs = document.querySelector(".profile.travelPrefs");
let blocker = document.getElementById("blocker");
let currentEditedElements = null;
const pageurl = new URL(window.location.href);
let id = pageurl.searchParams.get("id");
id = parseInt(id);
if (!Number.isInteger(parseInt(id))) {
  window.location.href = "../homepage/homepage.html";
}
url = "https://db-project-api.vercel.app";
url = "http://localhost:3000";

async function GetProfile() {
  try {
    let response = await fetch(url + "/api/profile?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    if (response.status == 200) {
      let responsejson = await response.json();
      console.log(responsejson);
      profilename.textContent = responsejson.name;
      bio.textContent = responsejson.Bio;
      travelPrefs.textContent = responsejson.TravelPreferences;
      if (responsejson.isOwner == true) {
        let buttons = document.querySelectorAll(".editBtn");
        let saveButton = document.getElementById("savebtn");
        buttons.forEach((button) => {
          button.style.display = "block";
        });
        saveButton.style.display = "block";
      }
    }
  } catch (err) {
    console.error("Error: ", err);
  }
}
async function SaveProfile() {
  let data = {
    name: profilename.textContent,
    bio: bio.textContent,
    travelPrefs: travelPrefs.textContent,
  };
  let jsonData = JSON.stringify(data);
  let response = await fetch(url + "/api/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: jsonData,
  });
  if (response.status == 200) {
    alert("Profile Updated");
  } else {
    alert("Profile Update Failed");
  }
}
function disableEdit() {
  document.querySelector(".profile.edit").style.display = "none";
}
function enableContentEdit(id) {
  if (id == "name") {
    profilename.contentEditable = true;
    profilename.focus();
  } else if (id == "bio") {
    bio.contentEditable = true;
    bio.focus();
  } else if (id == "travelPrefs") {
    travelPrefs.contentEditable = true;
    travelPrefs.focus();
  }
}

function disableContentEdit(id) {
  if (id == "name") {
    profilename.contentEditable = false;
  } else if (id == "bio") {
    bio.contentEditable = false;
  } else if (id == "travelPrefs") {
    travelPrefs.contentEditable = false;
  }
}
window.addEventListener("checkUserFinished", GetProfile);
