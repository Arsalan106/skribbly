import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
const backendurl='http://localhost:5000'
import { io } from 'socket.io-client'



function App() {
 
  const socket=useMemo(()=>io(backendurl),[])
  const [count, setCount] = useState(0);
  const [user,setUser]=useState(null);
  const [totalUser,setTotalUser]=useState([]);
  const [joinUser,setJoinUser]=useState(null);

  // useEffect(()=>{
  //   socket.on("received",(data)=>{
  //       console.log("data",data);
  //       setTotalUser(data.getUsers);
  //       console.log("recieved updated users",data.getUsers);
  //   })
  // },[])
  const generateId=()=>{
    return (((1+Math.random())*0x10000) | 0).toString(16).substring(1);
  }
  const uuid=()=>{
    return generateId()+generateId()+"-"+generateId()+"-"+generateId()+"-"+generateId()+generateId()+generateId()+generateId();
  }
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<HomePage uuid={uuid} setUser={setUser} socket={socket} setJoinUser={setJoinUser} />}></Route>
        <Route path='/:roomId' element={<RoomPage user={user} socket={socket} totalUser={totalUser} />}></Route>
      </Routes>
    </div>
  )
}

export default App
