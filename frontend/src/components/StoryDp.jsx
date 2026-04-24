import React from 'react'
import dp from '../assets/dp.webp'
import { FiPlusCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
const StoryDp = ({profileImage,userName,story}) => {
  const {userData}=useSelector(state=>state.user)
  const navigate=useNavigate()
  const handleClick=()=>{
    if(!story && userName=="Your Story"){
      navigate('/upload')
    }
    else if(story && userName=="Your Story"){
      navigate(`/story/${userData.userName}`)
    }
    else{
      navigate(`/story/${userName}`)
    }
  }
  return (
    <div className='flex flex-col w-[80px]' >
      <div className={`w-[80px] h-[80px] ${story?"bg-gradient-to-b from-blue-500 to-blue-950":""}  rounded-full flex justify-center items-center relative`} onClick={handleClick}>
         <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img src={profileImage || dp} className="w-full object-cover h-full" alt="" />
                    {!story && userName=="Your Story" && <div>
                      <FiPlusCircle className='text-black absolute bg-white bottom-[8px] right-[10px] rounded-full w-[22px] h-[22px]'/>
                      </div> }
                      
                </div>
                </div>
                <div className='text-white text-[14px] text-center truncate w-full'>{userName}</div>
    </div>
  )
}

export default StoryDp