import React from "react";
import logo from "../assets/logo.png";
import { FaRegHeart } from "react-icons/fa6";
import dp from '../assets/dp.webp'
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { LogOut } from "lucide-react"

import OtherUser from "./OtherUser";
const LeftHome = () => {
    const {userData,suggestedUsers}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    const handleLogOut=async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/auth/signout`,{withCredentials:true})
            dispatch(setUserData(null))
        } catch (error) {
            console.log(error); 
        }
    }
  return (
    <div className="w-[25%] hidden lg:block min-h-[100vh] bg-[black] border-r-2 border-gray-900">
      <div className="w-full h-[100px] flex items-center justify-between p-[20px]">
        <img src={logo} alt="" className="w-[110px]" />
        <div>
          <FaRegHeart className="text-white w-[25px] h-[25px]" />
        </div>
      </div>
      <div className="flex items-center justify-between p-[10px] w-full gap-[10px] border-b-2 border-b-gray-800 py-[10px]">
        <div className="flex items-center gap-[10px]">
        <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
            <img src={userData.profileImage || dp} className="w-full object-cover h-full" alt="" />
        </div>
        <div>
            <div className="text-[18px] text-white font-semibold">{userData.userName}</div>
            <div className="text-[15px] text-gray-400 font-semibold">{userData.name}</div>
        </div>
        </div>
      <button
  onClick={handleLogOut}
  className="group relative flex items-center gap-2 px-4 py-2 rounded-xl text-[13px] font-semibold text-red-400/80 border border-red-500/10 bg-red-950/20 hover:bg-red-950/40 hover:border-red-400/25 hover:text-red-300 overflow-hidden transition-all duration-300 cursor-pointer"
>
  {/* shimmer sweep */}
  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-red-400/10 to-transparent skew-x-12 pointer-events-none" />
  
  {/* dot pulse */}
  <span className="relative flex h-1.5 w-1.5">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-50" />
    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500/70" />
  </span>

  Log out

  <LogOut className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:opacity-100 opacity-60 transition-all duration-300" />
</button>
      </div>
      <div className="w-full flex flex-col gap-[20px] p-[20px]">
        <h1 className="text-[white] text-[19px]">Suggested Users</h1>
        {suggestedUsers && suggestedUsers.slice(0,3).map((user,index)=>(
            <OtherUser key={index} user={user}/>
        ))}
      </div>

    </div>
  );
};

export default LeftHome;
