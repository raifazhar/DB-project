let guestitems = document.querySelectorAll(".guest");
let useritems = document.querySelectorAll(".user");
let htmlelement = document.getElementsByTagName("html")[0];
let url;
url = "https://db-project-api.vercel.app";
async function checkUser() {
  htmlelement.hidden = true;
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      if (xmlHttp.status == 0) {
        alert("Can't reach Server!");
        return;
      }
      if (xmlHttp.status == 200) {
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
    }
  };
  xmlHttp.onerror = function () {
    htmlelement.hidden = false;
  };

  xmlHttp.ontimeout = function () {
    htmlelement.hidden = false;
  };

  xmlHttp.onabort = function () {
    htmlelement.hidden = false;
  };
  xmlHttp.open("GET", url + "/api/verify", true);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  let user = {
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    usertype: localStorage.getItem("type"),
  };
  await xmlHttp.send(JSON.stringify(user));
}
window.onload = checkUser();
