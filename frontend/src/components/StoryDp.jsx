import React from 'react'
import dp from '../assets/dp.webp'
const StoryDp = ({profileImage,userName}) => {
  return (
    <div className='flex flex-col w-[80px]' >
      <div className='w-[80px] h-[80px] bg-gradient-to-b from-blue-500 to-blue-950 rounded-full flex justify-center items-center'>
         <div className="w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                    <img src={dp} className="w-full object-cover" alt="" />
                </div>
                </div>
                <div className='text-white text-[14px] text-center truncate w-full'>{userName}</div>
    </div>
  )
}

export default StoryDp