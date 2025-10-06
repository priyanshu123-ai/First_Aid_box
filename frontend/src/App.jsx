import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Login from './components/Login'
import Home from "./Pages/Home"
import FirstAid from './Pages/first_Aid'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element = {<Register />}/>
        <Route path='/login' element = {<Login />}/>
        <Route path='/first-aid' element = {<FirstAid />} />
      </Routes>
      
    </div>
  )
}

export default App
