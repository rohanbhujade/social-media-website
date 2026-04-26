import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { editProfile, follow, followingList, getallNotifications, getCurrentUser, getProfile, markAsRead, search, suggestedUsers } from '../controllers/user.controllers.js'
import { upload } from '../middlewares/multer.js'
const userRouter=express.Router()
userRouter.get('/current',isAuth,getCurrentUser)
userRouter.get('/suggested',isAuth,suggestedUsers)
userRouter.post('/editProfile',isAuth,upload.single("profileImage"),editProfile)
userRouter.get('/getProfile/:userName',isAuth,getProfile)
userRouter.get('/follow/:targetUserId',isAuth,follow)
userRouter.get('/suggested',isAuth,suggestedUsers)
userRouter.get('/followingList',isAuth,followingList)
userRouter.get('/search',isAuth,search)
userRouter.get('/getAllNotifications',isAuth,getallNotifications)
userRouter.post('/markAsRead',isAuth,markAsRead)

export default userRouter