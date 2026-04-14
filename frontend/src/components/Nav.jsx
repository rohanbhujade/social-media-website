import React from 'react'
import { GoHomeFill } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { RxVideo } from "react-icons/rx";
import { FiPlusSquare } from "react-icons/fi";
import dp from '../assets/dp.webp'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Nav = () => {
  const {userData}=useSelector(state=>state.user)
  const navigate=useNavigate()
  return (
    <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
        <div><GoHomeFill className='text-white w-[25px] h-[25px]' /></div>
        <div><FiSearch className='text-white w-[25px] h-[25px]'  /></div>
        <div><FiPlusSquare className='text-white w-[25px] h-[25px]'  /></div>
        <div><RxVideo className='text-white w-[28px] h-[28px]'  /></div>
          <div className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden" onClick={()=>navigate(`/profile/${userData.userName}`)}>
                    <img src={dp} className="w-full object-cover" alt="" />
                </div>
    </div>
  )
}

export default Nav