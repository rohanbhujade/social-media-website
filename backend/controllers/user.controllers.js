import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).populate("posts loops")
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "get current user error" });
  }
};
export const suggestedUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `get suggested user ${error}` });
  }
};
export const editProfile = async (req, res) => {
  try {
    const { userName, name, bio, profession, gender } = req.body;
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: `user not found` });
    }
    const sameUserWithUserName = await User.findOne({ userName }).select(
      "-password"
    );
    if (sameUserWithUserName && sameUserWithUserName._id != req.userId) {
      return res.status(400).json({ message: "username already exists !" });
    }
    let profileImage;
    if (req.file) {
      profileImage =await uploadOnCloudinary(req.file.path);
    }
    user.name = name;
    user.userName = userName;
    user.profession = profession;
    user.bio = bio;
    user.gender = gender;
    if(profileImage){
        user.profileImage = profileImage;
    }
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `edit profile error ${error}` });
  }
};
export const getProfile = async (req, res) => {
  try {
    const userName = req.params.userName;
    const user = await User.findOne({ userName }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `get profile error ${error}` });
  }
};
