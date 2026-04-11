import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Forgotpassword from './pages/Forgotpassword'
import Home from './pages/Home'
import { useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
import { Navigate } from 'react-router-dom'
import getSuggestedUsers from './hooks/getSuggestedUsers'
export const serverUrl="http://localhost:7000"
const App = () => {
    getCurrentUser()
    getSuggestedUsers()
  const {userData}=useSelector(state=>state.user)
  return (
  <Routes>
    <Route path='/signup' element={!userData?<SignUp/>:<Navigate to ={'/'}/>}/>
    <Route path='/signin' element={!userData?<SignIn/>:<Navigate to ={'/'}/>}/>
    <Route path='/forgot-password' element={!userData?<Forgotpassword/>:<Navigate to ={'/'}/>}/> 
    <Route path='/' element={userData?<Home/>:<Navigate to ={'/signin'}/>}/>

  </Routes>
  )
}

export default App