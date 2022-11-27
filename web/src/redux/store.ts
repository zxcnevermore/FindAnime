import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import anime from './slices/animeSlice';
import search from './slices/searchSlice';
import animeById from './slices/animeByIdSlice'
import login from './slices/loginSlice';

export const store = configureStore({
    reducer: {
        anime,
        search,
        animeById,
        login,

    },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
