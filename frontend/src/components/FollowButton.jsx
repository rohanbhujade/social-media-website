import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../App'
import { toggleFollow } from '../redux/userSlice'

const FollowButton = ({targetUserID,tailwind,onFollowChange}) => {
    const {following}=useSelector(state=>state.user)
    const isFollowing=following.includes(targetUserID)
    const dispatch=useDispatch()
    const handleFollow=async()=>{
        try {
            const result=await axios.get(`${serverUrl}/api/user/follow/${targetUserID}`,{withCredentials:true})
            if(onFollowChange){
                onFollowChange()
            }
            dispatch(toggleFollow(targetUserID))
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <button className={tailwind} onClick={handleFollow}>
        {isFollowing?"Following":"Follow"}
    </button>
  )
}

export default FollowButton