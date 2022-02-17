import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPhotos } from '../API'
import { Photos } from '../AppTypes'

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async () => {        
      const res = await getPhotos()
      return res
    }
  )

type InitValues = {
  photos: Photos[]
  isLoading: boolean
  error: string | null
}  

const initialState: InitValues = {
  photos: [],
  isLoading: false,
  error: null  
}

export const photosSlice = createSlice({
  name: 'photos',  
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state: InitValues) => {
        state.isLoading = true
    })
    builder.addCase(fetchPhotos.fulfilled, (state: InitValues, action) => {
        state.photos = action.payload
        state.isLoading = false
        state.error = null
    })
    builder.addCase(fetchPhotos.rejected, (state: InitValues) => {
        state.error = "Bad request !"        
        state.isLoading = true
    })
  }    
})

export default photosSlice.reducer