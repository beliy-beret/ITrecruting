import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAlbum } from '../API';
import { Photo } from './../AppTypes';

export const fetchAlbum = createAsyncThunk(
  'photos/fetchAlbum',
  async (id: number) => {        
      const res = await getAlbum(id);
      return res.data      
  }
)

type InitValues = {  
  album: Photo[],
  albumId: number,  
  isLoading: boolean,
  error: string | null
}  

const initialState: InitValues = {
  album: [],
  albumId: 1,  
  isLoading: false,
  error: null  
}

export const albumSlice = createSlice({
  name: 'album',  
  initialState,
  reducers: {
    setAlbumId(state: InitValues, action){
      state.albumId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state: InitValues) => {
        state.isLoading = true
    })
    builder.addCase(fetchAlbum.fulfilled, (state: InitValues, action) => {
        state.album = action.payload
        state.isLoading = false
        state.error = null
    })
    builder.addCase(fetchAlbum.rejected, (state: InitValues) => {
        state.error = "Bad request !"        
        state.isLoading = true
    })
  }    
})

export const {setAlbumId} = albumSlice.actions
export default albumSlice.reducer