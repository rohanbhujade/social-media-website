import React from 'react'
import logo from '../assets/logo.png'
import { FaRegHeart } from 'react-icons/fa6'
import StoryDp from './StoryDp'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import Post from './Post'
import { useNavigate } from 'react-router-dom'
import { MdOutlineMessage } from 'react-icons/md'
const Feed = () => {
  const {postData}=useSelector(state=>state.post)
    const {userData}=useSelector(state=>state.user)
    const {notificationData}=useSelector(state=>state.user)
    const {storyList,currentUserStory}=useSelector(state=>state.story)
const navigate=useNavigate()
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
        <div className="w-full h-[100px] flex items-center justify-between p-[10px] lg:hidden">
                <img src={logo} alt="" className="w-[110px]" />
                <div className='flex items-center gap-[10px]'>
<div className="relative cursor-pointer" onClick={()=>navigate('/notifications')}>
          <FaRegHeart className="text-white w-[25px] h-[25px]" />
          {notificationData?.length > 0 && notificationData.some((noti) => noti.isRead === false) && (<div className='w-[10px] h-[10px] bg-red-600 rounded-full absolute top-0 right-[-5px]'></div>)}
        </div>                  
                      <MdOutlineMessage className="text-white w-[22px] h-[22px] cursor-pointer transition-transform duration-200 active:scale-90"  
                      onClick={() => navigate('/messages')} />

                </div>
              </div>
              <div className='flex w-full overflow-auto gap-[10px] items-center p-[20px]'>
                <StoryDp userName={"Your Story"} profileImage={userData.profileImage} story={currentUserStory}/>
                {storyList?.map((story,index)=>(
                  <StoryDp userName={story?.author.userName} profileImage={story?.author.profileImage} story={story} key={index}/>
                ))}
                
              </div>
              <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]'>
                <Nav/>
                {postData?.map((post,index)=>(
                  <Post post={post} key={index}/>
                ))}
              </div>
    </div>
  )
}

export default Feed