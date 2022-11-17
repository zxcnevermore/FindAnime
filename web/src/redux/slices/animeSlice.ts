import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';

export type TParam = {
  search?: string;
  limit?: number;
};

export type TAnime = {
  id: number;
  image: string;
  title: string;
  episodes: number;
  status: string;
  desc: string;
  genres: string[];
  type: string;
};

export interface IAnime {
  totalItems: number;
  anime: TAnime[];
  load: 'loading' | 'success' | 'error';
}

const initialState: IAnime = {
  totalItems: 0,
  anime: [],
  load: 'loading',
};

export const fetchAnime = createAsyncThunk<IAnime, TParam>(
  'anime/fetchAnimeStatus',
  async (params) => {
    const { search, limit } = params;
    const { data } = await axios.get<IAnime>(
      `http://localhost:8080/get/all?title=${search}&page=1&size=${limit}`,
    );
    return data;
  },
  );



const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setData(state) {
      state.anime = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnime.pending, (state) => {
      state.load = 'loading';
      state.anime = []
    });
    builder.addCase(fetchAnime.fulfilled, (state, action) => {
      state.totalItems = action.payload.totalItems;
      state.anime = [...state.anime, ...action.payload.anime];
      state.load = 'success';
    });
    builder.addCase(fetchAnime.rejected, (state) => {
      state.load = 'error';
      state.anime = [];
      state.totalItems = 0;
    });
  },
});

export const animeSelector = (state: RootState) => state.anime;

export const { setData } = animeSlice.actions;

export default animeSlice.reducer;
