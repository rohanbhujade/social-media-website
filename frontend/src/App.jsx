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
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import getAllPost from './hooks/getAllPost'
import Loops from './pages/Loops'
import getAllLoops from './hooks/getAllLoops'
export const serverUrl="http://localhost:7000"
const App = () => {
    getCurrentUser()
    getSuggestedUsers()
    getAllPost()
    getAllLoops()
  const {userData}=useSelector(state=>state.user)
  return (
  <Routes>
    <Route path='/signup' element={!userData?<SignUp/>:<Navigate to ={'/'}/>}/>
    <Route path='/signin' element={!userData?<SignIn/>:<Navigate to ={'/'}/>}/>
    <Route path='/forgot-password' element={!userData?<Forgotpassword/>:<Navigate to ={'/'}/>}/> 
    <Route path='/' element={userData?<Home/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/profile/:userName' element={userData?<Profile/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/upload' element={userData?<Upload/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/loops' element={userData?<Loops/>:<Navigate to ={'/signin'}/>}/>


  </Routes>
  )
}

export default App