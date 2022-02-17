import { configureStore } from '@reduxjs/toolkit'
import photos from './photosSlice'

export const store = configureStore({
  reducer: {
    photos  
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch