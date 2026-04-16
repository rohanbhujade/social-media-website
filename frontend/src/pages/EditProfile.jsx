import React, { useRef, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dp from '../assets/dp.webp'
import { serverUrl } from '../App'
import axios from 'axios'
import { setProfileData, setUserData } from '../redux/userSlice'
import { ClipLoader } from 'react-spinners'
const EditProfile = () => {
    const navigate=useNavigate()
    const {userData}=useSelector(state=>state.user)
    const [frontendImage, setFrontendImage] = useState(userData.profileImage||dp)
    const [backendImage, setBackendImage] = useState(null)
    const [name, setname] = useState(userData.name || "")
    const [userName, setUserName] = useState(userData.userName || "")
    const [bio, setBio] = useState(userData.bio || "")
    const [profession, setProfession] = useState(userData.profession || "")
    const [gender, setGender] = useState(userData.gender || "")
    const imageInput=useRef()
    const [loading, setloading] = useState(false)
    const handleImage=(e)=>{
      const file=e.target.files[0]
      setBackendImage(file)
      setFrontendImage(URL.createObjectURL(file))
    }
    const dispatch=useDispatch()
    const handleEditProfile=async()=>{
      setloading(true)
      try {
        const formdata=new FormData()
        formdata.append("name",name)
        formdata.append("userName",userName)
        formdata.append("bio",bio)
        formdata.append("profession",profession)
        formdata.append("gender",gender)
        if(backendImage){
          formdata.append("profileImage",backendImage)
        }
        if (gender !== "male" && gender !== "female") {
  alert("Select gender")
}
        const result=await axios.post(`${serverUrl}/api/user/editProfile`,formdata,{withCredentials:true})
        dispatch(setProfileData(result.data))
        dispatch(setUserData(result.data))
        setloading(false)
        navigate(`/profile/${userData.userName}`)
      } catch (error) {
        setloading(false)
        console.log(error)
      }
    }
  return (
    <div className='w-full min-h-[100vh] bg-black flex flex-col gap-[20px] items-center'>
        <div className='w-full h-[80px] flex items-center gap-[20px] px-[20px]' >
                  <MdOutlineKeyboardBackspace className="text-white w-[25px] h-[25px] cursor-pointer" onClick={()=>navigate(`/profile/${userData.userName}`)} />
                    <h1 className='text-white text-[20px] font-semibold '>Edit Profile</h1>
                </div>
                <div className="w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden" 
                onClick={()=>imageInput.current.click()}>
                  <input type="file" accept='image/*' ref={imageInput} hidden onChange={handleImage}/>
                          <img
                            src={frontendImage}
                            className="w-full object-cover"
                            alt=""
                          />
                        </div>
                        <div className='text-blue-500 text-center text-[18px] font-semibold cursor-pointer'  onClick={()=>imageInput.current.click()}>Change Your Profile Picture</div>
                        <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border border-2 bg-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold ' placeholder='Enter Your Name' onChange={(e)=>setname(e.target.value)} value={name}  />
                        <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] b order border-2 bg-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold ' placeholder='Enter Your Username'  onChange={(e)=>setUserName(e.target.value)} value={userName}  />
                        <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border border-2 bg-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold ' placeholder='Bio'  onChange={(e)=>setBio(e.target.value)} value={bio}  />
                        <input type="text" className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border border-2 bg-gray-700 rounded-2xl px-[20px] outline-none text-white font-semibold ' placeholder='Profession'value={profession}  onChange={(e)=>setProfession(e.target.value)}  />
                       <select
  className='w-[90%] max-w-[600px] h-[60px] bg-gray-700 border-2 rounded-2xl px-[20px] outline-none text-white font-semibold'
  value={gender}
  onChange={(e) => setGender(e.target.value)}
>
  <option>Select Gender</option>
  <option value="male">Male</option>
  <option value="female">Female</option>
</select>
                       <button
  onClick={handleEditProfile}
  disabled={loading}
  className={`relative w-[60%] max-w-[400px] h-[54px] rounded-xl font-semibold text-[15px] overflow-hidden transition-all duration-300 backdrop-blur-lg cursor-pointer border ${
    loading
      ? "bg-white/20 text-white/50 border-white/10 cursor-not-allowed"
      : "bg-white/90 text-black border-white/40 hover:bg-white hover:scale-105 hover:shadow-[0_10px_30px_rgba(99,102,241,0.25)]"
  }`}
>
  <span className="relative z-10 flex items-center justify-center gap-2">
    {loading ? <ClipLoader size={24} color="black" /> : "Save Profile"}
  </span>
  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 hover:opacity-100 transition"></span>
</button>
    </div>
  )
}

export default EditProfile