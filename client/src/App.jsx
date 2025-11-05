import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
// const backendurl = 'http://localhost:5000'
const backendurl=import.meta.env.VITE_BACKEND_URL;
import { io } from 'socket.io-client'




function App() {

  const socket = useMemo(() => io(backendurl, {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  }), [])
  const [user, setUser] = useState(null);
  const [totalUser, setTotalUser] = useState([]);
  const [joinUser, setJoinUser] = useState(null);

  useEffect(() => {
    socket.on("received", (data) => {
      console.log("data", data);
      // setTotalUser(data.currUsers);
      console.log("recieved updated users", data.currUsers);
    })
    socket.on("allUsers",(data)=>{
      console.log("hello from allusers")
      setTotalUser(data);
    })
  // return () => {
  //   socket.off("connect");
  //   socket.off("disconnect");
  // };
  }, [])

  const generateId = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    // afjbkdfal
  }
  const uuid = () => {
    return generateId() + generateId() + "-" + generateId() + "-" + generateId() + "-" + generateId() + generateId() + generateId() + generateId();
  }
  return (
    <div className='container'>
       <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage uuid={uuid} setUser={setUser} socket={socket} setJoinUser={setJoinUser} />}></Route>
        <Route path='/:roomId' element={<RoomPage user={user} socket={socket} totalUser={totalUser} setTotalUser={setTotalUser} />}></Route>
      </Routes>
    </div>
  )
}

export default App
