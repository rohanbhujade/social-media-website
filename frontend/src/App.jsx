import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Forgotpassword from './pages/Forgotpassword'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import getCurrentUser from './hooks/getCurrentUser'
import { Navigate } from 'react-router-dom'
import getSuggestedUsers from './hooks/getSuggestedUsers'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import Upload from './pages/Upload'
import getAllPost from './hooks/getAllPost'
import Loops from './pages/Loops'
import getAllLoops from './hooks/getAllLoops'
import Story from './pages/Story'
import getAllStories from './hooks/getAllStories'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import {io} from 'socket.io-client'
import { useEffect } from 'react'
import getFollowingList from './hooks/getFollowingList'
import getPrevChatUsers from './hooks/getPrevChatUsers'
export const serverUrl="http://localhost:7000"
const App = () => {
    getCurrentUser()
    getSuggestedUsers()
    getAllPost()
    getAllLoops()
    getAllStories()
    getFollowingList()
    getPrevChatUsers()
  const {userData}=useSelector(state=>state.user)
  const {socket}=useSelector(state=>state.socket)
  const dispatch=useDispatch()
  useEffect(() => {
  if (userData) {
    const socketio = io(serverUrl, {
      query: {
        userId: userData?._id
      }
    })

    dispatch(setSocket(socketio))
    socketio.on('getOnlineUsers',(users)=>{
      dispatch(setOnlineUsers(users))
      
    })
    return () => socketio.close()
  } else {
    if (socket) {
      socket.close()
      dispatch(setSocket(null))
    }
  }
}, [userData])
  return (
  <Routes>
    <Route path='/signup' element={!userData?<SignUp/>:<Navigate to ={'/'}/>}/>
    <Route path='/signin' element={!userData?<SignIn/>:<Navigate to ={'/'}/>}/>
    <Route path='/forgot-password' element={!userData?<Forgotpassword/>:<Navigate to ={'/'}/>}/> 
    <Route path='/' element={userData?<Home/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/profile/:userName' element={userData?<Profile/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/editprofile' element={userData?<EditProfile/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/messages' element={userData?<Messages/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/messageArea' element={userData?<MessageArea/>:<Navigate to ={'/signin'}/>}/>

    <Route path='/upload' element={userData?<Upload/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/loops' element={userData?<Loops/>:<Navigate to ={'/signin'}/>}/>
    <Route path='/story/:userName' element={userData?<Story/>:<Navigate to ={'/signin'}/>}/>

  </Routes>
  )
}

export default App