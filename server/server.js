const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { updatedUsers, getUsersInRoom, removeUser,getUser } = require('./utils/user');

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
let currUsers=[];
let g_room={};
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
    // const player={id:socket.id,name:roomName};
    // g_room[roomId].players.push(player);
    socket.join(roomId);

    const userData = {
      roomName,
      roomId,
      userId: id,
      host,
      presenter,
      socketId:socket.id
    };
    currUsers = updatedUsers(userData);
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
  socket.on("disconnect",()=>{
    let user=getUser(socket.id);
    console.log("user disconnected",socket.id);
    console.log("logged out user",user);
    let getUpdatedUsers= removeUser(socket.id);
    io.to(g_roomId).emit("leftUsers",getUpdatedUsers);
    if(user){
      socket.broadcast.emit("user-left",user.roomName);
    }
    console.log("user afer loggnig out",getUpdatedUsers);
  })
});

app.get('/', (req, res) => {
  res.send("Server is live");
});

//made changes for deployment
if(process.env.NODE_ENV!="production"){
  server.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
  });
}
module.exports= server;
