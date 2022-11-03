import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

export type TParam = {
  search?: string;
  limit?: number;
};

export type TAnime = {
  id: string;
  image: string;
  title: string;
  episodes: number;
  status: string;
  desc: string;
  genres: string[];
};

export interface IAnime {
  data: TAnime[];
  totalData: number;
  load: 'loading' | 'success' | 'error';
}

const initialState: IAnime = {
  totalData: 0,
  data: [],
  load: 'success',
};

export const fetchAnime = createAsyncThunk<IAnime, TParam>(
  'anime/fetchAnimeStatus',
  async (params) => {
    const { search, limit } = params;
    const { data } = await axios.get<IAnime>(
      `http://localhost:5000/anime?title=${search}&page=1&size=${limit}`,
    );
    return data;
  },
);

const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setData(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnime.pending, (state) => {
      state.load = 'loading';
      state.data = []
    });
    builder.addCase(fetchAnime.fulfilled, (state, action) => {
      state.totalData = action.payload.totalData;
      state.data = [...state.data, ...action.payload.data];
      state.load = 'success';
    });
    builder.addCase(fetchAnime.rejected, (state) => {
      state.load = 'error';
      state.data = [];
      state.totalData = 0;
    });
  },
});

export const animeSelector = (state: RootState) => state.anime;

export const { setData } = animeSlice.actions;

export default animeSlice.reducer;
