import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface ISearch {
	searchValue: string;
	pageValue: number;
}

const initialState: ISearch = {
	searchValue: '',
	pageValue: 1,
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setTitle(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setPage(state) {
			state.pageValue += 1;
		},
		setPageOne(state, action: PayloadAction<number>) {
			state.pageValue = action.payload;
		},
	},
});

export const searchSelector = (state: RootState) => state.search;

export const { setTitle, setPage, setPageOne } = searchSlice.actions;

export default searchSlice.reducer;
