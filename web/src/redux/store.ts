import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import anime from './slices/animeSlice';
import search from './slices/searchSlice';

export const store = configureStore({
    reducer: {
        anime,
        search,
    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
