import http from "http"
import path from "path"
import { Server } from "socket.io"
import express from "express"

const app = express();
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
});

const httpServer = http.Server(app);
const io = new Server(httpServer, { cors: { origin: "*" }});
const users = [];

 io.on("connection", (socket) => {
    
    socket.on("onLogin", (user) => {
        const updatedUser = {
            ...user,
            online: true,
            socketID: socket.id,
            messages: []
        };

        const existUser = users.find((x) => x.name === updateUser.name);
        if (existUser) {
            existUser.socketID = socket.id;
            existUser.online = true;
        }
        else {
            users.push(updatedUser);
        }

        const admin = users.find((x) => x.name === "Admin" && x.online);
        if (admin) {
            io.to(admin.socketID).emit("updateUser", updatedUser);
        }
        if (updatedUser.name === "Admin") {
            io.to(updatedUser.socketID).emit("listUsers", users);
        }
    });

    socket.on("disconnect", () => {
        const user = users.findIndex((x) => x.socketID === socket.id);
        if (user) {
            user.online = false;
            const admin = users.find((x) => x.name === "Admin" && x.online);
            if (admin) {
                io.to(admin.socketID).emit("updateUser", user);
            }
        }
    });
    socket.on("onUserSelected", (user) => {
        const admin = users.find((x) => x.name === "Admin" && x.online);

        if (admin) {
            const existUser = users.findIndex((x) => x.name === user.name);
            io.to(admin.socketID).emit("selectUser", existUser);
        }
    });
    socket.on("onMessage", (message) => {
        if (message.from === "Admin") {
            const user = user.find((x) => x.name === message.to && x.online);

            if (user) {
                io.to(user.socketID).emit("message", message);
                user.messages.push(message);
            }
            else {
                io.to(socket.id).emit("message", {
                    from: "System",
                    to: "Admin",
                    body: "User is not online."
                });
            }
        }
        else {
            const admin = users.find((x) => x.name === "Admin" && x.online);

            if (admin) {
                io.to(admin.socketID).emit("message", message);
                const user = users.find((x) => x.name === message.from && x.online);
                if (user) {
                    user.messages.push(message);
                }
                else {
                    io.to(socket.id).emit("message", {
                        from: "System",
                        to: message.from,
                        body: "Sorry, Admin is not online right now"
                    });
                }
            }
        }
    });
 })

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});