import { configureStore } from '@reduxjs/toolkit';
import userPhotos from './photosSlice';
import album from './albumsSlice';

export const store = configureStore({
  reducer: {
      userPhotos,
      album
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch