const express=require("express");
const cors=require("cors");
const http=require("http");
const {Server}=require("socket.io");
const {updateUsers} =require('./utils/user');


const app=express();
app.use(cors())


const server=http.createServer(app);
console.log("hello")
const io=new Server(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        credentials:true
        // fblasfbal
    }
})

const PORT=process.env.PORT||5000;
let g_roomId,imageUrlGlobal;
let users=[];
io.on("connection",(socket)=>{
    console.log("User connected",socket.id);
    socket.on("joinRoom",(data)=>{
        console.log("userJoined",data);
        const {roomName,roomId,userId,host,presenter}=data;
        g_roomId=roomId;
        socket.join(roomId);
        console.log("emmiting the messge");
        users.push(data);
        const currUsers=users.filter((user)=>user.roomId==roomId);
        console.log("user in room ",currUsers);

        socket.emit("received",{success:true,currUsers});

        socket.broadcast.to(roomId).emit("allUsers",currUsers);
        socket.broadcast.to(roomId).emit("receivedData",{
            imageUrl:imageUrlGlobal
        })
    })
    //handle when someones send drawing image
    socket.on("whiteBoard",(data)=>{
        console.log("inside white board emmiter");
        imageUrlGlobal=data;
        socket.broadcast.to(g_roomId).emit("receivedData",{
            imageUrl:data,
        })
    })
})
app.get('/',(req,res)=>{
    res.send("server is live");
})

server.listen(PORT,()=>console.log("server is runing on Port",PORT))