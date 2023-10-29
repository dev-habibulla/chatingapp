import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counterSlice'
import activeChatReducer from './slices/activeChatSlice'

export default configureStore({
  reducer: {
    logedUser: counterReducer,
    activeChat: activeChatReducer
  }
})