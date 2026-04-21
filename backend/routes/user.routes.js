import express from 'express'
import isAuth from '../middlewares/isAuth.js'
import { editProfile, follow, getCurrentUser, getProfile, suggestedUsers } from '../controllers/user.controllers.js'
import { upload } from '../middlewares/multer.js'
const userRouter=express.Router()
userRouter.get('/current',isAuth,getCurrentUser)
userRouter.get('/suggested',isAuth,suggestedUsers)
userRouter.post('/editProfile',isAuth,upload.single("profileImage"),editProfile)
userRouter.get('/getProfile/:userName',isAuth,getProfile)
userRouter.get('/follow/:targetUserId',isAuth,follow)
userRouter.get('/suggested',isAuth,suggestedUsers)

export default userRouter