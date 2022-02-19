import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getPhotos } from '../API'
import { Photo } from './../AppTypes';

export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async () => {        
      const res = await getPhotos();
      return res.data      
    }
  )
 

type InitValues = {  
  allPhotos: Photo[],  
  activePage: Photo[],
  pageNumber: number,  
  isLoading: boolean,
  error: string | null
}  

const initialState: InitValues = {
  allPhotos: [],  
  pageNumber: 1,
  activePage: [],  
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
    changePhotoList(state: InitValues, actions){
      state.allPhotos = actions.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state: InitValues) => {
        state.isLoading = true
    })
    builder.addCase(fetchPhotos.fulfilled, (state: InitValues, action) => {
        state.allPhotos = action.payload
        state.isLoading = false
        state.error = null
    })
    builder.addCase(fetchPhotos.rejected, (state: InitValues) => {
        state.error = "Bad request !"        
        state.isLoading = true
    })
  }    
})

export const {setPageNumber, changePhotoList} = photosSlice.actions
export default photosSlice.reducer