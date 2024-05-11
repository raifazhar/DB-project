
let forminputs = document.querySelectorAll(".inputform input");

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
  fetch(url + "/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: jsonData,
  })
    .then(async (response) => {
      let responsejson = await response.json();
      if (response.status != 200) {
        if (responsejson["element"] == "user") {
          alert("User already exists!");
        } else if (responsejson["element"] == "username") {
          document.getElementById("error name").style.display = "block";
        } else if (responsejson["element"] == "email") {
          document.getElementById("error email").style.display = "block";
        } else if (responsejson["element"] == "password") {
          document.getElementById("error password").style.display = "block";
        }
      } else {
        alert("Account Created!");
        window.location.href = "../loginPage/login.html";
      }
      document.getElementById("loader").style.display = "none";
      document.getElementById("createaccount").style.display = "inline-block";
    })
    .catch((err) => {
      console.error("Error: ", err);
      document.getElementById("loader").style.display = "none";
      document.getElementById("createaccount").style.display = "inline-block";
    });
}
