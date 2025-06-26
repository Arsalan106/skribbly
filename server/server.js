const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { updatedUsers, getUsersInRoom, removeUser } = require('./utils/user');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 5000;
let imageUrlGlobal = null;
let g_roomId;
io.on("connection", (socket) => {
  console.log(" User connected:", socket.id);

  socket.on("joinRoom", (data) => {
    const {
      roomName1, roomName2,
      roomId1, roomId2,
      userId, userId2,
      host, presenter
    } = data;

    const roomId = roomId1 || roomId2;
    const roomName = roomName1 || roomName2;
    const id = userId || userId2;
    g_roomId=roomId
    socket.join(roomId);

    const userData = {
      roomName,
      roomId,
      userId: id,
      host,
      presenter
    };
    const currUsers = updatedUsers(userData);
    console.log("Users in room:", currUsers);

    socket.emit("received", { success: true, currUsers });
    socket.broadcast.to(roomId).emit("userJoinedMessage", roomName);
    io.to(roomId).emit("allUsers", currUsers);

    if (imageUrlGlobal) {
      socket.emit("receivedData", { imageUrl: imageUrlGlobal });
    }
  });

  socket.on("whiteBoard", (data) => {
    imageUrlGlobal = data;
      socket.broadcast.to(g_roomId).emit("receivedData", { imageUrl: data });
  });
});

app.get('/', (req, res) => {
  res.send("Server is live");
});

server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
