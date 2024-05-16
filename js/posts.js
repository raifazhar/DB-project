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

async function GetPosts() {
  let results = await fetch(url + "/api/posts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
  });
  if (results.status == 200) {
    let data = await results.json();
    BuildPosts(data);
  }
}

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
      title: title,
      content: content,
    }),
  });
  if (results.status == 200) {
    alert("Posted!");
    GetPosts();
  } else if (results.status == 401) {
    alert("Please login to add a post");
    window.location.href = "../signUpPage/signup.html";
  }
}

async function BuildPosts(posts) {
  let postlist = document.getElementById("posts");
  postlist.innerHTML = "";
  let postBtn = document.createElement("button");
  postBtn.innerHTML = "POST";
  postBtn.id = "postBtn";
  postlist.append(postBtn);
  InitializeButton();
  posts.forEach((element) => {
    let li = document.createElement("li");
    let headdiv = document.createElement("div");
    headdiv.innerHTML = `<div class="post-user">${element.Name}</div>
    <div class="post-title">${element.Title}</div>`;
    headdiv.className = "post-header";
    li.append(headdiv);
    let p = document.createElement("p");
    element.Content = element.Content.replace(/(?:\r\n|\r|\n)/g, `<br>`);
    p.innerHTML = `<div class="post-content-inner">${element.Content}</div>`;
    p.className = "post-content";
    li.append(p);
    li.className = "post";
    postlist.append(li);
  });
}

window.addEventListener("checkUserFinished", GetPosts);
