import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Forgotpassword from './pages/Forgotpassword'
export const serverUrl="http://localhost:7000"
const App = () => {
  return (
  <Routes>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/signin' element={<SignIn/>}/>
    <Route path='/forgot-password' element={<Forgotpassword/>}/> 

  </Routes>
  )
}

export default App