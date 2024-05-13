let signupforminputs = document.querySelectorAll(".signupform input");
let loginforminputs = document.querySelectorAll(".loginform input");
function LoginUser() {
  let errors = document.getElementsByClassName("loginerror");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
  if (loginforminputs[0].value == "" || loginforminputs[1].value == "") return;
  document.getElementById("loader").style.display = "block";
  document.getElementById("Login").style.display = "none";
  let data = {
    email: loginforminputs[0].value,
    password: loginforminputs[1].value,
  };
  let jsonData = JSON.stringify(data);
  fetch(url + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: jsonData,
  })
    .then(async (response) => {
      let responsejson = await response.json();
      if (response.status != 200) {
        document.getElementById("loginerror").style.display = "block";
        document.getElementById("loginerror").textContent = responsejson["message"];
      } else {
        localStorage.setItem("id", responsejson["user"]["id"]);
        localStorage.setItem("email", responsejson["user"]["email"]);
        localStorage.setItem("username", responsejson["user"]["username"]);
        localStorage.setItem("type", responsejson["user"]["type"]);
        localStorage.setItem("token", responsejson["token"]);
        window.location.href = "../homepage/homepage.html";
      }
      document.getElementById("loader").style.display = "none";
      document.getElementById("Login").style.display = "inline-block";
    })
    .catch((err) => {
      console.error("Error: ", err);
      document.getElementById("loader").style.display = "none";
      document.getElementById("Login").style.display = "inline-block";
    });
}

function SignUp() {
  let errors = document.getElementsByClassName("signuperror");
  for (let i = 0; i < errors.length; i++) {
    errors[i].style.display = "none";
  }
  let type = 0;
  if (document.getElementById("UserType1").checked) type = 1;
  else if (document.getElementById("UserType2").checked) type = 2;

  if (signupforminputs[0].value == "" || signupforminputs[1].value == "" || signupforminputs[2].value == "") return;

  document.getElementById("signuploader").style.display = "block";
  document.getElementById("createaccount").style.display = "none";

  let data = {
    username: signupforminputs[0].value,
    email: signupforminputs[1].value,
    password: signupforminputs[2].value,
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
        } else if (responsejson["element"] == "email") {
          document.getElementById("signuperror email").style.display = "block";
        } else if (responsejson["element"] == "password") {
          document.getElementById("signuperror password").style.display = "block";
        }
      } else {
        alert("Account Created!");
      }
      document.getElementById("signuploader").style.display = "none";
      document.getElementById("createaccount").style.display = "inline-block";
    })
    .catch((err) => {
      console.error("Error: ", err);
      document.getElementById("signuploader").style.display = "none";
      document.getElementById("createaccount").style.display = "inline-block";
    });
}
