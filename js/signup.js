let forminputs = document.querySelectorAll(".inputform input");
let url = "https://db-project-api.vercel.app";
function validateForm() {
  let errors = document.getElementsByClassName("error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
  let type = 0;
  if (document.getElementById("UserType1").checked) type = 1;
  else if (document.getElementById("UserType2").checked) type = 2;

  if (forminputs[0].value == "" || forminputs[1].value == "" || forminputs[2].value == "") return;

  document.getElementById("loader").style.display = "block";
  document.getElementById("createaccount").style.display = "none";

  let data = {
    username: forminputs[0].value,
    email: forminputs[1].value,
    password: forminputs[2].value,
    usertype: type,
  };
  let jsonData = JSON.stringify(data);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState == XMLHttpRequest.DONE) {
      if (xmlHttp.status == 0) {
        alert("Can't reach Server!");
        document.getElementById("loader").style.display = "none";
        document.getElementById("createaccount").style.display = "inline-block";
        return;
      }
      let jsonResponse = JSON.parse(xmlHttp.responseText);
      if (xmlHttp.status == 400) {
        if (jsonResponse["status"] == "failed") {
          if (jsonResponse["element"] == "user") {
            alert("User already exists!");
          } else if (jsonResponse["element"] == "username") {
            document.getElementById("error name").style.display = "block";
          } else if (jsonResponse["element"] == "email") {
            document.getElementById("error email").style.display = "block";
          } else if (jsonResponse["element"] == "password") {
            document.getElementById("error password").style.display = "block";
          }
        }
      } else if (xmlHttp.status == 200 && jsonResponse["status"] == "success") {
        alert("Account Created!");
        window.location.href = "loginPage/login.html";
      }
      document.getElementById("loader").style.display = "none";
      document.getElementById("createaccount").style.display = "inline-block";
    }
  };
  xmlHttp.open("POST", url + "/api/signup", true);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.send(jsonData);
}
