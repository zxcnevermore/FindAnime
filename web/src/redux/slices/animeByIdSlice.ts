import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { TAnime } from './animeSlice';


export interface IAnime {
  data: TAnime[];
  load: 'loading' | 'success' | 'error';
}

const initialState: IAnime = {
  data: [],
  load: 'success',
};

export const fetchAnimeById = createAsyncThunk<IAnime, string | undefined >(
  'anime/fetchAnimeByIdStatus',
  async (id) => {
    const { data } = await axios.get<IAnime>(
      `http://localhost:5000/anime/${id}`,
    );
    return data;
  },
);

const animeSliceById = createSlice({
  name: 'animeById',
  initialState,
  reducers: {
    setData(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnimeById.pending, (state) => {
      state.load = 'loading';
      state.data = []
    });
    builder.addCase(fetchAnimeById.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.load = 'success';
    });
    builder.addCase(fetchAnimeById.rejected, (state) => {
      state.load = 'error';
      state.data = [];
    });
  },
});

export const animeByIdSelector = (state: RootState) => state.animeById;

export const { setData } = animeSliceById.actions;

export default animeSliceById.reducer;
