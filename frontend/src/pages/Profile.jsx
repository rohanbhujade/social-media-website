import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.webp";
import Nav from "../components/Nav";
import FollowButton from "../components/FollowButton";
import { LogOut } from "lucide-react";
import Post from "../components/Post";
import { setSelectedUser } from "../redux/messageSlice";
const Profile = () => {
  const { userName } = useParams();
  const navigate=useNavigate()
  const [postType, setpostType] = useState("posts")
  const { profileData,userData } = useSelector((state) => state.user);
  const {postData}=useSelector(state=>state.post)
  const dispatch = useDispatch();
  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleProfile();
  }, [dispatch, userName]);

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="w-full h-[80px] flex justify-between items-center text-white px-[30px]">
        <div onClick={()=>navigate('/')}>
          <MdOutlineKeyboardBackspace className="text-white w-[25px] h-[25px] cursor-pointer" />
        </div>
        <div className="font-semibold text-[20px]">{profileData?.userName}</div>
   <button
  onClick={handleLogOut}
  className="flex items-center gap-2 px-5 py-2 rounded-xl cursor-pointer transition-all duration-150 active:scale-95"
  style={{
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.2)',
    color: 'rgba(239,68,68,0.8)',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.background = 'rgba(239,68,68,0.15)'
    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.35)'
  }}
  onMouseLeave={e => {
    e.currentTarget.style.background = 'rgba(239,68,68,0.1)'
    e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'
  }}
>
  <LogOut className="w-[15px] h-[15px]" />
  <span className="text-[13px] font-semibold tracking-wide">Log Out</span>
</button>
      </div>
      <div className="w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
        <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileData?.profileImage || dp}
            className="w-full object-cover h-full"
            alt=""
          />
        </div>
        <div>
          <div className="font-semibold text-[22px] text-white">
            {profileData?.name}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">
            {profileData?.profession || "New user"}
          </div>
          <div className="text-[17px] text-[#ffffffe8]">{profileData?.bio}</div>
        </div>
      </div>
      <div
        className="w-full h-[100px] flex items-center justify-center gap-[40px]
         md:gap-[60px] px-[20%] pt-[30px]"
      >
        <div>
          <div className="text-white text-[22px] md:text-[30px] font-semibold">
            {profileData?.posts?.length}
          </div>
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Posts
          </div>
        </div>
       <div>
  <div className="flex items-center justify-center gap-[20px]">

    <div
      className="relative h-[40px]"
      style={{
        width: `${40 + (Math.min(profileData?.followers?.length ?? 0, 3) - 1) * 12}px`,
      }}
    >
      {profileData?.followers?.slice(-3).map((user, index) => (
        <div
          key={index}
          className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden absolute"
          style={{ left: `${index * 12}px`, zIndex: index }}
        >
          <img
            src={user?.profileImage || dp}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      ))}
    </div>

    <div className="text-white text-[22px] md:text-[30px] font-semibold">
      {profileData?.followers?.length}
    </div>

  </div>

  <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
    Followers
  </div>
</div>
        <div>
  <div className="flex items-center justify-center gap-[20px]">
    
    <div
      className="relative h-[40px]"
      style={{
        width: `${40 + (Math.min(profileData?.following?.length, 3) - 1) * 9}px`,
      }}
    >
      {profileData?.following?.slice(-3).map((user, index) => (
        <div
          key={index}
          className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden absolute"
          style={{ left: `${index * 9}px`, zIndex: index }}
        >
          <img
            src={user?.profileImage || dp}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      ))}
    </div>

    <div className="text-white text-[22px] md:text-[30px] font-semibold">
      {profileData?.following?.length}
    </div>

  </div>

  <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
    Following
  </div>
</div>
      </div>
      <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[20px]">
        {profileData?._id==userData?._id ?<button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl" onClick={()=>navigate('/editprofile')}>Edit Profile
            </button>:<>
            <FollowButton tailwind={"px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl"} targetUserID={profileData?._id} onFollowChange={handleProfile}/>
            <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl" onClick={()=>{dispatch(setSelectedUser(profileData))
              navigate('/messageArea')}}>Message</button>
            </>}
      </div>
      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[100px]">
         {profileData?._id==userData._id && <div className="w-[90%] max-w-[500px] h-[80px] bg-white rounded-full flex justify-center items-center gap-[10px]">
        <div onClick={()=>setpostType("posts")} className={`${postType=="posts"?"bg-black text-white shadow-2xl shadow-black":""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:bg-black hover:text-white hover:shadow-black hover:shadow-2xl cursor-pointer `}>Posts</div>
        <div onClick={()=>setpostType("saved")} className={`${postType=="saved"?"bg-black text-white shadow-2xl shadow-black":""} w-[28%] h-[80%] flex justify-center items-center text-[19px] font-semibold rounded-full hover:bg-black hover:text-white hover:shadow-black hover:shadow-2xl cursor-pointer `}>Saved</div>
  
      </div>} 
            <Nav/>
            {postType=="posts" && postData.map((post,index)=>(
  post?.author._id==profileData?._id && 
  <Post post={post} key={index}/>
)) }
{postType == "saved" && postData?.map((post, index) => (
    userData?.saved?.some(s => (s._id || s).toString() === post._id.toString()) 
    && <Post post={post} key={index} />
))}

        </div>
      </div>
    </div>
  );
};

export default Profile;
