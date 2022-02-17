import { configureStore } from '@reduxjs/toolkit'
import userPhotos from './photosSlice'

export const store = configureStore({
  reducer: {
      userPhotos
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch