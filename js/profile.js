let profilename = document.querySelector(".profile.name");
let picture = document.querySelector(".profile.picture");
let bio = document.querySelector(".profile.bio");
let travelPrefs = document.querySelector(".profile.travelPrefs");
let htmlelements = document.getElementsByTagName("html")[0];
url = "https://db-project-api.vercel.app";
// url = "http://localhost:3307";

async function updateProfile() {
  htmlelements.hidden = true;
  fetch(url + "/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then(async (response) => {
      if (response.status == 200) {
        let responsejson = await response.json();
        profilename.innerHTML = responsejson.name;
        picture.src = responsejson.ProfilePicture;
        bio.innerHTML = responsejson.Bio;
        travelPrefs.innerHTML = responsejson.TravelPreferences;
      } else {
        localStorage.clear();
        window.location.href = "../loginPage/login.html";
      }
      htmlelements.hidden = false;
    })
    .catch((err) => {
      console.error("Error: ", err);
      htmlelements.hidden = false;
    });
}
