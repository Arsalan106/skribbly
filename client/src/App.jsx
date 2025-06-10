import { useState } from 'react'
import CreateandRoom from './components/CreateAndJoin'
import CreateAndJoin from './components/CreateAndJoin'
import HomePage from './pages/HomePage'
import RoomPage from './pages/RoomPage'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import './App.css'
function App() {
  const [count, setCount] = useState(0)
  return (
    <div className='container'>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route path='/:roomId' element={<RoomPage />}></Route>
      </Routes>
    </div>
  )
}

export default App
