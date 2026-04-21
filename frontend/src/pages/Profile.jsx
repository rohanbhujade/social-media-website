import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { serverUrl } from "../App";
import { setProfileData, setUserData } from "../redux/userSlice";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import dp from "../assets/dp.webp";
import Nav from "../components/Nav";
import FollowButton from "../components/FollowButton";
const Profile = () => {
  const { userName } = useParams();
  const navigate=useNavigate()
  const { profileData,userData } = useSelector((state) => state.user);
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
  className="relative cursor-pointer px-5 py-2.5 text-[16px] font-semibold text-white rounded-xl bg-gradient-to-r from-red-500 to-pink-500 overflow-hidden transition-transform transition-shadow duration-300 duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,0,80,0.4)]"
>
  <span className="relative z-10">Log Out</span>
  <span className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition"></span>
</button>
      </div>
      <div className="w-full h-[150px] flex items-start gap-[20px] lg:gap-[50px] pt-[20px] px-[10px] justify-center">
        <div className="w-[80px] h-[80px] md:w-[140px] md:h-[140px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
          <img
            src={profileData?.profileImage || dp}
            className="w-full object-cover"
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
            <div className="flex relative">
                  {profileData?.followers?.slice(0,3).map((user,index)=>(
 <div key={index} className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index>0? `absolute left-[${index*9}]`:""}`}>
                <img
                  src={user?.profileImage || dp}
                  className="w-full object-cover"
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
            <div className="flex relative">
                      {profileData?.following?.slice(0,3).map((user,index)=>(
 <div key={index} className={`w-[40px] h-[40px]  border-2 border-black rounded-full cursor-pointer overflow-hidden ${index>0? `absolute left-[${index*9}]`:""}`}>
                <img
                  src={user?.profileImage || dp}
                  className="w-full object-cover"
                  alt=""
                />
              </div>
                      ))}

            </div>
            <div className="text-white text-[22px] md:text-[30px] font-semibold">
              {profileData?.following?.length}
            </div>
          </div>{" "}
          <div className="text-[18px] md:text-[22px] text-[#ffffffc7]">
            Following
          </div>
        </div>
      </div>
      <div className="w-full h-[80px] flex justify-center items-center gap-[20px] mt-[20px]">
        {profileData?._id==userData?._id ?<button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl" onClick={()=>navigate('/editprofile')}>Edit Profile
            </button>:<>
            <FollowButton tailwind={"px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl"} targetUserID={profileData?._id} onFollowChange={handleProfile}/>
            <button className="px-[10px] min-w-[150px] py-[5px] h-[40px] bg-white cursor-pointer rounded-2xl">Message</button>
            </>}
      </div>
      <div className="w-full min-h-[100vh] flex justify-center">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px]">
            <Nav/>
        </div>
      </div>
    </div>
  );
};

export default Profile;
