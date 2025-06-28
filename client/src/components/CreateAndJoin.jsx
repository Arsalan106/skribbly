import React, { useState } from 'react'
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Socket } from 'socket.io-client';

const CreateAndJoin = ({uuid,setUser,socket,setJoinUser}) => {
   const navigate=useNavigate();
  const [roomId1,setRoom1]=useState("");
  const [roomName1,setRoomName1]=useState("");
  const [roomName2,setRoomName2]=useState("");
  const [roomId2,setRoomId2]=useState("");
  const inputRef=useRef(null);
  const handleCopy=()=>{
    const input=inputRef.current;
    if(!input) return;
    input.select();
    input.setSelectionRange(0,9999);

    navigator.clipboard.writeText(input.value)
    .then(()=>{
      alert("Copied"+input.value);
    })
    .catch((err)=>{
      console.log("failed to copy text:",err);
    })
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(roomName1);
    console.log(roomId1);
    const roomData={
      roomName1,
      roomId1,
      userId:uuid(),
      host:true,
      presenter:true
    }
    setUser(roomData);
    socket.emit("joinRoom",roomData);
    navigate(`/${roomId1}`)
  }
  const handleJoinRoom=(e)=>{
    e.preventDefault();
    console.log(roomId2);
    console.log(roomName2);
    const joinData={
      roomName2,
      roomId2,
      userId2:uuid(),
      host:false,
      presenter:false
    }
    setUser(joinData);
    socket.emit("joinRoom",joinData);
    navigate(`/${roomId2}`)
    
  }

  return (
    <div className='h-screen w-screen flex justify-around items-center bg-black p-8 mr-5'>
      {/* Glassmorphism backdrop container */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20'></div>
      
      {/* Create Room Card */}
      <div className='border border-blue-500/30 p-8 w-2/5 flex flex-col items-center h-2/3 gap-8 rounded-2xl bg-gray-900/80 backdrop-blur-md z-10 shadow-2xl shadow-blue-500/20'>
        <h1 className='text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 font-bold'>Create Room</h1>
        <form className='w-full max-w-md'>
          <div className='mb-4 flex flex-col gap-8'>
            <input 
              className='border border-gray-600 bg-gray-800 text-white p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400' 
              type="text" 
              placeholder='Enter Your name' 
              value={roomName1}
              onChange={(e)=>setRoomName1(e.target.value)}
            />
            <div className='w-full flex rounded-lg border border-gray-600 bg-gray-800 overflow-hidden'>
              <input 
                className='p-3 w-full bg-transparent text-white focus:outline-none placeholder-gray-400' 
                type="text" 
                value={roomId1}
                ref={inputRef}
                // defaultValue={text}
                placeholder='Generate Room Code'
                disabled
                // onChange={(e)=>setText(e.target.value)}
              />
              <div className='flex'>
                <button 
                  onClick={()=>setRoom1(uuid())}
                
                  className='cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 px-4 text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center'
                  type='button'
                >
                  Generate
                </button>
                <button 
                  onClick={handleCopy}
                  className=' cursor-pointer bg-gradient-to-r from-red-600 to-red-700 px-4 text-white hover:from-red-700 hover:to-red-800 transition-all duration-300 flex items-center justify-center'
                  type='button'
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
          <button
            className='cursor-pointer w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 mt-6 shadow-lg'
            type='submit'
            onClick={handleSubmit}
          >
            Create Room
          </button>
        </form>
      </div>

      {/* Join Room Card */}
      <div className='border-2 border-purple-500/30 p-8 w-2/5 flex flex-col items-center h-2/3 gap-8 rounded-2xl bg-gray-900/80 backdrop-blur-md z-10 shadow-2xl shadow-purple-500/20'>
        <h1 className='text-6xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600 font-bold'>Join Room</h1>
        <form className='w-full max-w-md'>
          <div className='mb-4 flex flex-col gap-8'>
            <input 
              className='border border-gray-600 bg-gray-800 text-white p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400' 
              type="text" 
              placeholder='Enter Your name' 
              value={roomName2}
              onChange={(e)=>setRoomName2(e.target.value)}
            />
            <input 
              className='border border-gray-600 bg-gray-800 text-white p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-400' 
              type="text" 
              placeholder='Enter Room Code' 
              value={roomId2}
              onChange={(e)=>setRoomId2(e.target.value)}
            />
          </div>
          <button
            className='cursor-pointer w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 mt-6 shadow-lg'
            type='submit'
            onClick={handleJoinRoom}
          > 
            Join Room
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateAndJoin