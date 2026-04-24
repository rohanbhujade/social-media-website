import React, { useEffect, useState } from 'react'
import dp from '../assets/dp.webp'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { FaEye } from "react-icons/fa";

import VideoPlayer from './VideoPlayer'
const StoryCard = ({storyData}) => {
    const navigate=useNavigate()
    const [progress, setprogress] = useState(0)
    const {userData}=useSelector(state=>state.user)
    const [showViewers, setshowViewers] = useState(false)
    useEffect(() => {
      const interval=setInterval(()=>{
        setprogress(prev=>{
            if(prev>=100){
                clearInterval(interval)
                navigate('/')
                return 100
            }
            return prev+1})
      },200)
      return ()=>clearInterval(interval)
    }, [navigate])
    
  return (
    <div className='w-full  max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center'>
        <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px]'>
             <MdOutlineKeyboardBackspace className="text-white w-[25px] h-[25px] cursor-pointer" onClick={()=>navigate(`/`)} />
            <div className="w-[30px] h-[30px] md:h-[40px] md:w-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                 <img src={storyData?.author?.profileImage || dp} className="w-full h-full object-cover" alt="" />
                </div>
                <div className='max-w-[120px] font-semibold truncate text-white'>
                    {storyData?.author?.userName}</div>
        </div>
        <div className='absolute top-[10px] left-0 w-full h-[5px] bg-gray-900'>
          <div className='w-[200px] h-[100%] bg-white transition-all duration-200 ease-linear' style={{width:`${progress}%`}}></div>
        </div>
        {!showViewers && <>
        <div className="w-[full] h-[90vh] flex items-center justify-center ">
        {storyData.mediaType=="image" && <div className="w-[90%] flex items-center justify-center ">
            <img src={storyData.media} className="w-[80%] object-cover rounded-2xl" alt="" />
            </div>}
        {storyData.mediaType=="video" && <div className="w-[80%] flex flex-col items-center justify-center ">
            <VideoPlayer media={storyData.media}/>
            </div>} 
        </div>
        
       {storyData?.author?.userName == userData?.userName && (
  <div onClick={()=>setshowViewers(true)}  className='cursor-pointer absolute w-full text-white h-[70px] bottom-0 p-2 left-0 flex items-center gap-3 '>
    
    {/* Eye icon + count */}
    <div className='flex items-center gap-1'>
      <FaEye />
      <span>{storyData?.viewers?.length}</span>
    </div>

    {/* Avatar Stack */}
    <div
      className="relative h-[40px] flex-shrink-0"
      style={{
        width: `${40 + (Math.min(storyData?.viewers?.length ?? 0, 3) - 1) * 12}px`,
      }}
    >
      {storyData?.viewers?.slice(0, 3).map((viewer, index) => (
        <div
          key={index}
          className="w-[30px] h-[30px] border-2 border-black rounded-full cursor-pointer overflow-hidden absolute mt-1"
          style={{ left: `${index * 12}px`, zIndex: index }}
        >
          <img
            src={viewer?.profileImage || dp}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      ))}
    </div>

  </div>
)}
        </>}
        {showViewers && <>
         <div className="w-full h-[30%] flex items-center justify-center mt-[100px] overflow-hidden py-[30px] cursor-pointer " onClick={()=>setshowViewers(false)}>
        {storyData?.mediaType=="image" && <div className="h-full flex items-center justify-center ">
            <img src={storyData?.media} className="h-full object-cover rounded-2xl" alt="" />
            </div>}
        {storyData?.mediaType=="video" && <div className="h-full flex flex-col items-center justify-center ">
            <VideoPlayer media={storyData?.media}/>
            </div>} 
        </div>
        <div className='w-full h-[70%] border-t-2 border-t-gray-800 p-[20px]'>
          <div className='text-white flex items-center gap-[10px]'><FaEye/><span>{storyData?.viewers?.length}</span>
          <span>Viewers</span></div>
 <div className='w-full max-h-full flex flex-col gap-[10px] overflow-auto pt-[20px]'>
          {storyData?.viewers?.map((viewer,index)=>(
            <div className='flex w-full items-center gap-[20px]'>
               <div className="w-[30px] h-[30px] md:h-[40px] md:w-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                 <img src={viewer?.profileImage || dp} className="w-full h-full object-cover" alt="" />
                </div>
                <div className='max-w-[120px] font-semibold truncate text-white'>
                    {viewer?.userName}</div>
              </div>
          ))}
        </div>
        </div>
        </>}
       
        
    </div>
  )
}

export default StoryCard