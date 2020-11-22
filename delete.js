const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const cors = require("cors");
const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  //join room
  socket.on("join", function (data) {
    //display the number of users in room
    users += 1;
    console.log(users);
    io.sockets.emit("usercount", { count: users + " person joined " });
    //end

    // user joining the particular room
    socket.join(data.room);

    console.log(data.user + "joined the room:" + data.room);

    //inform other on the room about event
    socket.broadcast.to(data.room).emit("new user joined", {
      user: data.user,
      message: "has joined this room ",
    });
  });

  //leave room

  socket.on("leave", function (data) {
    //number of users in room
    users--;
    io.sockets.emit("usercount", { count: "" + users });
    console.log(users);
    //end

    console.log(data.user + "has left the room " + data.room);
    socket.broadcast
      .to(data.room)
      .emit("left room", { user: data.user, message: "has left the room " });
    socket.leave(data.room);
  });

  //sending message
  socket.on("message", function (data) {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
});

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);
