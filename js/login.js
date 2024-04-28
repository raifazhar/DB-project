let forminputs = document.querySelectorAll(".inputform input");
let url;
url = "https://db-project-api.vercel.app";
function validateLoginForm() {
  let errors = document.getElementsByClassName("error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
  if (forminputs[0].value == "" || forminputs[1].value == "") return;
  document.getElementById("loader").style.display = "block";
  document.getElementById("Login").style.display = "none";
  let data = {
    email: forminputs[0].value,
    password: forminputs[1].value,
  };
  let jsonData = JSON.stringify(data);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      let jsonResponse = JSON.parse(xmlHttp.responseText);
      if (xmlHttp.status != 200) {
        if (jsonResponse["status"] == "failed") {
          document.getElementById("error").style.display = "block";
          document.getElementById("error").textContent = jsonResponse["message"];
        }
      } else if (xmlHttp.status == 200) {
        localStorage.setItem("email", jsonResponse["user"]["email"]);
        localStorage.setItem("username", jsonResponse["user"]["username"]);
        localStorage.setItem("type", jsonResponse["user"]["type"]);
        localStorage.setItem("token", jsonResponse["token"]);
        window.location.href = "../homepage.html";
      } else {
        document.getElementById("error").style.display = "block";
        document.getElementById("error").textContent = "Server Error";
      }
      document.getElementById("loader").style.display = "none";
      document.getElementById("Login").style.display = "inline-block";
    }
  };
  xmlHttp.open("POST", url + "/api/login", true);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.send(jsonData);
}
