let forminputs = document.querySelectorAll(".inputform input");
let url = "http://localhost:3000";
function validateForm() {
  let errors = document.getElementsByClassName("error");

  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
  let type = 0;
  if (forminputs[0].value == "" || forminputs[1].value == "" || forminputs[2].value == "") {
    alert("Please fill all the fields");
    return;
  }
  if (document.getElementById("UserType1").checked) type = 1;
  else if (document.getElementById("UserType2").checked) type = 2;

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
      let jsonResponse = JSON.parse(xmlHttp.responseText);
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
      document.getElementById("loader").style.display = "none";
      document.getElementById("createaccount").style.display = "inline-block";
    }
  };
  xmlHttp.open("POST", url + "/signup", true);
  xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlHttp.send(jsonData);
}
