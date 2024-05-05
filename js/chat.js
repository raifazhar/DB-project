// url = "https://db-project-api.vercel.app";
// // url = "http://localhost:3000";

// let users = [];
// let messages = [];
// selectedUser = null;
// let loaders = document.getElementsByClassName("loaderdiv");
// let userID = parseInt(localStorage.getItem("id"));
// const queryParams = { token: localStorage.getItem("token") };
// const socket = io(url, {
//   path: "/api/socket.io",
//   query: queryParams,
//   reconnection: false,
// });
// //When we get all users we refresh user list
// socket.on("all users", (user) => {
//   users = user;
//   selectedUser = users[0].UserID;
//   for (let i = 0; i < loaders.length; i++) {
//     loaders[i].style.display = "none";
//   }
//   UpdateUsers();
// });

// //When we recieve message we check if its from the current user or ourselves and if it is we add it to the messages
// socket.on("recieve message", (msgobj) => {
//   if (msgobj.from !== selectedUser && msgobj.from !== userID) return;
//   messages.push({
//     id: messages.length,
//     user: msgobj.from,
//     message: msgobj.msg,
//   });
//   UpdateMessages();
// });

// function SendMessage() {
//   const message = document.getElementById("m").value;
//   let msgobj = {
//     from: userID,
//     to: selectedUser,
//     msg: message,
//   };
//   socket.emit("send message", msgobj);
// }

// function UpdateUsers() {
//   try {
//     const usersList = document.getElementById("userlist");
//     usersList.replaceChildren();
//     users.forEach((user) => {
//       const userElement = document.createElement("li");
//       userElement.textContent = user.name;
//       if (user.UserID === selectedUser) {
//         userElement.style.backgroundColor = "gray";
//       }
//       userElement.addEventListener("click", () => {
//         selectedUser = user.UserID;
//         messages = [];
//         UpdateMessages();
//         UpdateUsers();
//       });
//       usersList.appendChild(userElement);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// }

// function UpdateMessages() {
//   try {
//     const messagesList = document.getElementById("messagelist");
//     messagesList.replaceChildren();
//     messages.forEach((message) => {
//       const messageElement = document.createElement("li");
//       messageElement.textContent = message.message;
//       if (message.user !== userID) {
//         messageElement.style.backgroundColor = "gray";
//       } else {
//         messageElement.style.backgroundColor = "darkgray";
//         messageElement.style.alignSelf = "flex-end";
//       }
//       messagesList.appendChild(messageElement);
//     });
//   } catch (e) {
//     console.log(e);
//   }
// }
