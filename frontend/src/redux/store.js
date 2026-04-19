import {configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import postSlice from './postSlice'
import loopSlice from './loopSlice'
import storySlice from './storySlice'

export const store=configureStore({
    reducer:{
        user:userSlice,
        post:postSlice,
        story:storySlice,
        loop:loopSlice
    }
})
