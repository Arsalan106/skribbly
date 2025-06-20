import React from 'react'
import CreateAndJoin from '../components/CreateAndJoin'
const HomePage = ({uuid,setUser,socket,setJoinUser}) => {
  return (
    <div>
      <CreateAndJoin uuid={uuid} setUser={setUser} socket={socket} setJoinUser={setJoinUser}/>
    </div>
  )
}

export default HomePage
