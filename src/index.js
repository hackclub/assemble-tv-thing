import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

let color = "black";

io.on("connection", (socket) => {
  socket.emit("color", color);

  socket.on("emoji", (emoji) => {
    socket.broadcast.emit("emoji", emoji);
  });

  socket.on("color", (selectedColor) => {
    color = selectedColor;
    socket.broadcast.emit("color", selectedColor);
  });

  socket.on("message", (message) => {
    io.emit("messageForReview", message);
  });

  socket.on("acceptMessage", (message) => {
    io.emit("message", message);
  });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: "./views" });
});

app.get("/display", (req, res) => {
  res.sendFile("display.html", { root: "./views" });
});

app.get("/admin", (req, res) => {
  res.sendFile("admin.html", { root: "./views" });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
