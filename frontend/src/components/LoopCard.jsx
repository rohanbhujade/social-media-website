import React, { useEffect, useRef, useState } from 'react'
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import dp from '../assets/dp.webp'
import FollowButton from './FollowButton';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import { MdOutlineComment } from 'react-icons/md';
import axios from 'axios';
import { setLoopData } from '../redux/loopSlice';
import { serverUrl } from '../App';
import { IoSendSharp } from 'react-icons/io5';
const LoopCard = ({loop,key1}) => {
  const [isPlaying, setisPlaying] = useState(true)
  const [ismute, setismute] = useState(false)
  const [progress, setprogress] = useState(0)
  const {userData}=useSelector(state=>state.user)
  const {loopData}=useSelector(state=>state.loop)
  const [showHeart, setshowHeart] = useState(false)
  const dispatch=useDispatch()
  const [showComment, setshowComment] = useState(false)
  const [message, setmessage] = useState('')
  const commentRef=useRef()
  const handleTimeUpdate=()=>{
    const video=videoref.current
    if(video){
      const percent=(video.currentTime/video.duration)*100
      setprogress(percent)
    }
  }
   const handleLike=async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/loop/like/${loop._id}`,{withCredentials:true})
            const updatedLoop=result.data
            const updatedLoops=loopData.map(p=>p._id==loop._id?updatedLoop:p)
            dispatch(setLoopData(updatedLoops))
        } catch (error) {
            console.log(error)
        }
    }
      const handleComment=async()=>{
        try {
            const result=await axios.post(`${serverUrl}/api/loop/comment/${loop._id}`,{message},{withCredentials:true})
            const updatedLoop=result.data
            const updatedLoops=loopData.map(p=>p._id==loop._id?updatedLoop:p)
            dispatch(setLoopData(updatedLoops))
            setmessage('')
        } catch (error) {
            console.log(error)
        }
    }
    const videoref=useRef()
    const handleClick=()=>{
      if(isPlaying){
        videoref.current.pause()
        setisPlaying(false)
      }
      else{
        videoref.current.play()
        setisPlaying(true)
      }
    }
    const handleLikeOnDoubleClick=()=>{
      setshowHeart(true)
      setTimeout(() => {
        setshowHeart(false)
      }, 2000);
      {!loop?.likes?.includes(userData._id)?handleLike():null}
    }
    useEffect(() => {
  const observer = new IntersectionObserver(([entry]) => {
    const video = videoref.current;
    if (!video) return; // ← guard here

    if (entry.isIntersecting) {
      video.play();
      setisPlaying(true);
    } else {
      video.pause();
      setisPlaying(false);
    }
  }, { threshold: 0.6 });

  if (videoref.current) {
    observer.observe(videoref.current);
  }

  return () => {
    if (videoref.current) {
      observer.unobserve(videoref.current);
    }
  };
}, []);
    useEffect(() => {
     const handleClickOutside=(event)=>{
      if(commentRef.current && !commentRef.current.contains(event.target)){
        setshowComment(false)
      }
     }
     if(showComment){
      document.addEventListener("mousedown",handleClickOutside)
     }else{
      document.removeEventListener("mousedown",handleClickOutside)
     }
    }, [showComment])
    
    
  return (
    <div className='w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative overflow-hidden'>
      {showHeart && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heart-animation z-50'>
      <>
  <GoHeartFill
    className="w-[100px] h-[100px] drop-shadow-2xl"
    style={{ fill: "url(#heartGradient)" }}
  />

  <svg width="0" height="0">
    <defs>
      <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4d6d" />
        <stop offset="50%" stopColor="#ff0000" />
        <stop offset="100%" stopColor="#ffd166" />
      </linearGradient>
    </defs>
  </svg>
</>
        </div>}
        <div ref={commentRef} className={`absolute z-[200] bottom-0 w-full h-[500px] p-[10px] rounded-t-4xl bg-[#0e1718] transform transition-transform duration-500 ease-in-out left-0 shadow-2xl shadow-black ${showComment?"translate-y-0":"translate-y-[100%]"}`}>
          <h1 className='text-white text-[20px] text-center font-semibold'>Comments</h1>
          <div className='w-full h-[350px] overflow-y-auto flex flex col gap-[20px]'>
            {loop.comments.length==0 && <div className=' w-full text-center text-[20px] text-white font-semibold mt-[50px]'>No comments yet...</div>}
<div className="flex flex-col">
  {loop.comments?.map((com, index) => (
    <div key={com._id || index} className="w-full border-b border-gray-800 py-3">
      
      <div className="flex gap-3 items-start">
        
        {/* Avatar */}
        <div className="w-[35px] h-[35px] rounded-full overflow-hidden">
          <img
            src={com.author?.profileImage || dp}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col">
          <span className="text-white font-semibold">
            {com.author?.userName}
          </span>
          <span className="text-white/80">
            {com.message}
          </span>
        </div>

      </div>

    </div>
  ))}
</div>
          </div>
           <div className='flex justify-between items-center py-[20px] h-[80px] w-full px-[20px] fixed bottom-0'>
                      <div className="w-[30px] h-[30px] md:h-[40px] md:w-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                                  <img src={userData?.profileImage || dp} className="w-full object-cover" alt="" />
                              </div>
                              <input type="text" className='px-[10px] border-b-2 border-b-gray-500 w-[90%] text-white outline-none h-[40px]' placeholder='Add a comment...' 
                              onChange={(e)=>setmessage(e.target.value)} value={message} />
                              {message && <button className='absolute right-[20px] cursor-pointer' onClick={handleComment}><IoSendSharp className='w-[25px] h-[25px] text-white' /></button>}
                              </div>

        </div>
        <video ref={videoref} muted={ismute} autoPlay loop src={loop?.media}  className='w-full max-h-full object-cover' onClick={handleClick} onTimeUpdate={handleTimeUpdate} onDoubleClick={handleLikeOnDoubleClick}/>
        <div onClick={()=>setismute(prev=>!prev)} className='absolute top-[20px] z-[100] right-[20px]'>{!ismute?<FiVolume2 className='w-[20px] h-[20px] text-white font-semibold'/>:<FiVolumeX className='w-[20px] h-[20px] text-white font-semibold'/>}</div>
        <div className='absolute bottom-0 left-0 w-full h-[5px] bg-gray-900'>
          <div className='w-[200px] h-[100%] bg-white transition-all duration-200 ease-linear' style={{width:`${progress}%`}}></div>
        </div>
        <div className='w-full h-[100px] absolute bottom-[10px] p-[10px] flex flex-col gap-[10px] '>
          <div className='flex items-center gap-[5px] '>
                       <div className="w-[30px] h-[30px] md:h-[40px] md:w-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                                  <img src={loop?.author?.profileImage || dp} className="w-full object-cover h-full" alt="" />
                              </div>
                              <div className='max-w-[120px] font-semibold truncate text-white'>{loop?.author?.userName}
                              </div>
                              {userData?._id !==loop?.author?._id && <FollowButton targetUserID={loop.author._id} tailwind={"px-[15px] py-[5px] text-white border-2 border-white text-[14px] rounded-2xl cursor-pointer "}/>}
                              </div>
                              <div className='text-white px-[10px]'>{loop.caption}</div>
                              <div className='absolute right-0 flex flex-col gap-[20px] text-white bottom-[150px] justify-center px-[10px]'>
                                <div className='flex flex-col items-center cursor-pointer'>
                                  <div onClick={handleLike}>
                                    {!loop.likes.includes(userData._id) && <GoHeart className='w-[25px] h-[25px] cursor-pointer'/>}
                                    {loop.likes.includes(userData._id) && <GoHeartFill className='w-[25px] h-[25px] cursor-pointer text-red-600'/>}
                                  </div>
                                  <div>{loop.likes.length}</div>
                                </div>
                                <div className='flex flex-col items-center '>
                                  <div onClick={()=>setshowComment(true)}><MdOutlineComment className='w-[25px] h-[25px] cursor-pointer'/></div>
                                  <div>{loop.comments.length}</div>
                                </div>
                              </div>
        </div>
    </div>
  )
}

export default LoopCard