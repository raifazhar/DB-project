let guestitems = document.querySelectorAll(".guest");
let useritems = document.querySelectorAll(".user");
let url = "http://localhost:3000";
function checkUser() {
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
    }
  };
  xmlHttp.open("GET", url + "/api/verify", true);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.setRequestHeader("x-auth-token", localStorage.getItem("token"));
  let user = {
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    usertype: localStorage.getItem("type"),
  };
  xmlHttp.send(JSON.stringify(user));
}
window.onload = checkUser();
