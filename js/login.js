let forminputs = document.querySelectorAll(".inputform input");
let url;
url = "https://db-project-api.vercel.app";
// url = "http://localhost:3000";
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
  fetch(url + "/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: jsonData,
  }).then(async (response) => {
    let responsejson = await response.json();
    if (response.status != 200) {
      document.getElementById("error").style.display = "block";
      document.getElementById("error").textContent = responsejson["message"];
    } else {
      localStorage.setItem("email", responsejson["user"]["email"]);
      localStorage.setItem("username", responsejson["user"]["username"]);
      localStorage.setItem("type", responsejson["user"]["type"]);
      localStorage.setItem("token", responsejson["token"]);
      window.location.href = "../homepage/homepage.html";
    }
    document.getElementById("loader").style.display = "none";
    document.getElementById("Login").style.display = "inline-block";
  });
}
