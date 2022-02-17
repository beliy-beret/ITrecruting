import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPhotos } from '../API'
import { Photo, PhotoCards } from './../AppTypes';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async () => {        
      const res = await getPhotos();
      const photos = res.data
      const pageSize = 12;
      const photoPages = [];
      for (let i = 0; i < Math.ceil(photos.length / pageSize); i++){
        photoPages.push(photos.slice((i*pageSize), (i*pageSize) + pageSize))
      }  
      return photoPages
    }
  )
 

type InitValues = {  
  photoPages: PhotoCards[]
  currentPage: Photo[]
  pageSize: number
  pageNumber: number  
  isLoading: boolean
  error: string | null
}  

const initialState: InitValues = {  
  photoPages: [],
  pageSize: 12,
  pageNumber: 1,
  currentPage: [],  
  isLoading: false,
  error: null  
}

export const photosSlice = createSlice({
  name: 'photos',  
  initialState,
  reducers: {
    setPageNumber(state: InitValues, action){
      state.pageNumber = action.payload
    },
    setCurrentPage(state: InitValues, actions){
      state.currentPage = actions.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state: InitValues) => {
        state.isLoading = true
    })
    builder.addCase(fetchPhotos.fulfilled, (state: InitValues, action) => {
        state.photoPages = action.payload
        state.isLoading = false
        state.error = null
    })
    builder.addCase(fetchPhotos.rejected, (state: InitValues) => {
        state.error = "Bad request !"        
        state.isLoading = true
    })
  }    
})

export const {setPageNumber, setCurrentPage} = photosSlice.actions
export default photosSlice.reducer