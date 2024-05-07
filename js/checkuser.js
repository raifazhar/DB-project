let guestitems = document.querySelectorAll(".guest");
let useritems = document.querySelectorAll(".user");
let htmlelement = document.getElementsByTagName("html")[0];
let url;
url = "https://db-project-api.vercel.app";
// url = "http://localhost:3000";
async function checkUser() {
  htmlelement.hidden = true;
  fetch(url + "/api/verify", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then((response) => {
      if (response.status == 200) {
        for (let i = 0; i < guestitems.length; i++) {
          guestitems[i].style.display = "none";
        }
        for (let i = 0; i < useritems.length; i++) {
          useritems[i].style.display = "flex";
        }
      } else {
        localStorage.clear();
        for (let i = 0; i < guestitems.length; i++) {
          guestitems[i].style.display = "flex";
        }
        for (let i = 0; i < useritems.length; i++) {
          useritems[i].style.display = "none";
        }
      }
      htmlelement.hidden = false;
      let event = new Event("checkUserFinished");
      window.dispatchEvent(event);
    })
    .catch((err) => {
      console.error("Error: ", err);
      htmlelement.hidden = false;
      let event = new Event("checkUserFinished");
      window.dispatchEvent(event);
    });
}
window.onload = checkUser();
