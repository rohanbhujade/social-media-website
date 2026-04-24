import React, { useState } from 'react'
import dp from '../assets/dp.webp'
import VideoPlayer from './VideoPlayer'
import { GoBookmarkFill, GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineBookmarkBorder, MdOutlineComment } from 'react-icons/md';
import { IoSendSharp } from "react-icons/io5";
import axios from 'axios';
import { serverUrl } from '../App';
import { setPostData } from '../redux/postSlice';
import { setUserData } from '../redux/userSlice';
import FollowButton from './FollowButton';

const Post = ({post}) => {
    const {userData}=useSelector(state=>state.user)
    const {postData}=useSelector(state=>state.post)
    const dispatch=useDispatch()
    const [showComment, setShowComment] = useState(false)
    const [message, setmessage] = useState('')
    const handleLike=async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/post/like/${post._id}`,{withCredentials:true})
            const updatedPost=result.data
            const updatedPosts=postData.map(p=>p._id==post._id?updatedPost:p)
            dispatch(setPostData(updatedPosts))
        } catch (error) {
            console.log(error)
        }
    }
    const handleSaved=async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/post/saved/${post._id}`,{withCredentials:true})
            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleComment=async()=>{
        try {
            const result=await axios.post(`${serverUrl}/api/post/comment/${post._id}`,{message},{withCredentials:true})
            const updatedPost=result.data
            const updatedPosts=postData.map(p=>p._id==post._id?updatedPost:p)
            dispatch(setPostData(updatedPosts))
        } catch (error) {
            console.log(error)
        }
    }
    
  return (
    <div className='w-[90%]  flex flex-col gap-[10px] bg-white items-center shadow-2xl shadow-[#00000058] rounded-2xl pb-[20px]'>
        <div className='flex justify-between w-full h-[80px] px-[10px] items-center'>
            <div className='flex justify-center items-center gap-[10px] md:gap-[20px]'>
             <div className="w-[40px] h-[40px] md:h-[60px] md:w-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                        <img src={post.author?.profileImage || dp} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className='w-[150px] font-semibold truncate'>{post.author?.userName}
                    </div>
                    </div>
                   {userData._id !=post.author._id && <FollowButton tailwind={'px-[10px] md:w-[100px] w-[60px] py-[5px] h-[30px] md:h-[40px] bg-black text-white cursor-pointer rounded-2xl text-[14px] md:text-[16px]'} targetUserID={post.author._id} />}
        </div>
              <div className="w-[90%] flex items-center justify-center ">
        {post.mediaType=="image" && <div className="w-[90%] flex items-center justify-center ">
            <img src={post.media} className="w-[80%] object-cover rounded-2xl" alt="" />
            </div>}
        {post.mediaType=="video" && <div className="w-[80%] flex flex-col items-center justify-center ">
            <VideoPlayer media={post.media}/>
            </div>} 
        </div>
        <div className='flex w-full h-[60px] justify-between items-center px-[20px] mt-[10px]'>
            <div className='flex justify-center items-center gap-[10px]'>
                <div className='flex justify-center items-center gap-[5px]' onClick={handleLike}>
                    {!post.likes.includes(userData._id) && <GoHeart className='w-[25px] h-[25px] cursor-pointer'/>}
                    {post.likes.includes(userData._id) && <GoHeartFill className='w-[25px] h-[25px] cursor-pointer text-red-600'/>}
                    <span>{post.likes.length}</span>
                </div>
                <div className='flex justify-center items-center gap-[5px]' onClick={()=>setShowComment(prev=>!prev)}>
                    <MdOutlineComment className='w-[25px] cursor-pointer h-[25px]'/>
                    <span>{post.comments.length}</span>
                </div>
            </div>
            <div onClick={handleSaved}>{!userData?.saved?.some(s => (s._id || s).toString() === post._id.toString())
    ? <MdOutlineBookmarkBorder className='w-[25px] h-[25px] cursor-pointer'/>
    : <GoBookmarkFill className='w-[25px] h-[25px] cursor-pointer'/>
}</div>
        </div>
        {post.caption && <div className='flex justify-start items-center gap-[10px] w-full
         px-[20px] '>
            <h1 className='font-semibold'>{post.author.userName}</h1>
            <div>{post.caption}</div>
        </div>}
        {showComment && <div className='w-full flex flex-col gap-[30px] pb-[20px]'>
            <div className='flex justify-between items-center h-[80px] w-full px-[20px] relative'>
            <div className="w-[40px] h-[40px] md:h-[60px] md:w-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                        <img src={userData?.profileImage || dp} className="w-full object-cover" alt="" />
                    </div>
                    <input type="text" className='px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none h-[40px]' placeholder='Add a comment...' 
                    onChange={(e)=>setmessage(e.target.value)} value={message} />
                    <button className='absolute right-[20px] cursor-pointer' onClick={handleComment}><IoSendSharp className='w-[25px] h-[25px]' /></button>
                    </div>
                    <div className='w-full max-w-[300px] overflow-auto'>
                        {post.comments.map((com,index)=>(
                            <div key={index} className='w-full px-[20px] py-[20px] flex items-center gap-[20px] border-b-2 border-b-gray-200'>
                                <div className="w-[40px] h-[40px] md:h-[60px] md:w-[60px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                        <img src={com.author?.profileImage || dp} className="w-full object-cover" alt="" />
                               </div>
                               <div className='flex flex-col gap-[5px]'>
                                <div className='w-[150px] font-semibold truncate'>{com.author?.userName} </div>
                               <div>{com.message}</div>
                               </div>
                                </div>
                        ))}
                    </div>
            </div>}
    </div>
  )
}

export default Post