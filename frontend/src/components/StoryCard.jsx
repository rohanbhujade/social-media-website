import React, { useEffect, useState } from 'react'
import dp from '../assets/dp.webp'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import VideoPlayer from './VideoPlayer'
const StoryCard = ({storyData}) => {
    const navigate=useNavigate()
    const [progress, setprogress] = useState(0)
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
        <div className="w-[full] h-[90vh] flex items-center justify-center ">
        {storyData.mediaType=="image" && <div className="w-[90%] flex items-center justify-center ">
            <img src={storyData.media} className="w-[80%] object-cover rounded-2xl" alt="" />
            </div>}
        {storyData.mediaType=="video" && <div className="w-[80%] flex flex-col items-center justify-center ">
            <VideoPlayer media={storyData.media}/>
            </div>} 
        </div>
        <div className='absolute top-[10px] left-0 w-full h-[5px] bg-gray-900'>
          <div className='w-[200px] h-[100%] bg-white transition-all duration-200 ease-linear' style={{width:`${progress}%`}}></div>
        </div>
    </div>
  )
}

export default StoryCard