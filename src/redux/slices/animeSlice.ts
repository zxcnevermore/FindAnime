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
  synopsis: string;
};

interface IAnime {
  data: TAnime[];
  totalCount: number;
  load: 'loading' | 'success' | 'error';
}

const initialState: IAnime = {
  totalCount: 0,
  data: [],
  load: 'success',
};

export const fetchAnime = createAsyncThunk<IAnime, TParam>(
  'anime/fetchAnimeStatus',
  async (params) => {
    const { search, limit } = params;
    const { data } = await axios.get<IAnime>(
      `https://63051ff2697408f7edc23a12.mockapi.io/animes?title=${search}&page=1&limit=${limit}`,
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
      state.totalCount = action.payload.totalCount;
      state.data = [...state.data, ...action.payload.data];
      state.load = 'success';
    });
    builder.addCase(fetchAnime.rejected, (state) => {
      state.load = 'error';
      state.data = [];
      state.totalCount = 0;
    });
  },
});

export const animeSelector = (state: RootState) => state.anime;

export const { setData } = animeSlice.actions;

export default animeSlice.reducer;
