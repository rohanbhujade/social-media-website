import React from 'react'
import { useState,useRef } from 'react'
import { FiVolume2 } from "react-icons/fi";
import { FiVolumeX } from "react-icons/fi";

const VideoPlayer = ({media}) => {
    const videoTag=useRef()
    const [mute, setMute] = useState(false)
    const [isPlaying, setisPlaying] = useState(true)
    const handleClick=()=>{
        if(isPlaying){
            videoTag.current.pause()
            setisPlaying(false)
        }else{
            videoTag.current.play()
            setisPlaying(true)
        }
    }
  return (
    <div className='h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden'>
        <video ref={videoTag} src={media} className='h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden object-cover' autoPlay loop muted={mute} onClick={handleClick}/>
        <div onClick={()=>setMute(prev=>!prev)} className='absolute bottom-[10px] right-[10px]'>{!mute?<FiVolume2 className='w-[20px] h-[20px] text-black font-semibold'/>:<FiVolumeX className='w-[20px] h-[20px] text-black font-semibold'/>}</div>
    </div>
  )
}

export default VideoPlayer