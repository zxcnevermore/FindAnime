import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface ISearch {
  searchValue: string;
  limitAnime: number;
}

const initialState: ISearch = {
  searchValue: '',
  limitAnime: 5,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setLimit(state) {
      state.limitAnime += 5;
    },
    setCurrentTitle(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    }
  },
});

export const searchSelector = (state: RootState) => state.search;

export const { setTitle, setLimit, setCurrentTitle } = searchSlice.actions;

export default searchSlice.reducer;
