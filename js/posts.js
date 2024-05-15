//Intitialize modal menu for adding plans
let modal = document.getElementById("modalPost");
let span = document.getElementsByClassName("close")[0];

function InitializeButton() {
  var btn = document.getElementById("postBtn");
  btn.onclick = function () {
    modal.style.display = "block";
  };
}
InitializeButton();

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function GetPosts() {}

async function AddPost() {
  modal.style.display = "none";
  let title = document.getElementById("titleinput").value;
  let content = document.getElementById("contentinput").value;
  document.getElementById("titleinput").value = "";
  document.getElementById("contentinput").value = "";
  let results = await fetch(url + "/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "x-auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      Title: title,
      Content: content,
    }),
  });
  if (results.status == 200) {
    GetPosts();
  }
}
