const express=require("express");
const app=express();
const server=require('http').createServer(app);
const io=require("socket.io")(server);

const PORT=process.env.PORT||5000;

app.get('/',(req,res)=>{
    res.send("server is live");
})

server.listen(PORT,()=>console.log("server is runing on Port",PORT))