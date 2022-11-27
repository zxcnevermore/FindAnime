import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios.js';
import { RootState } from '../store';



export type TParam = {
  login: string;
  password: string;
};

export type TUser = {
  id: number;
  login: string;
  email: string;
  roles: string[];
  accessToken: string;
};

export interface IUser {
  data: TUser | null;
  load: 'success' | 'loading' | 'error';
}

const initialState: IUser = {
  data: null,
  load: 'loading'
};

export const fetchUser = createAsyncThunk<TUser, TParam>(
  'login/fetchUser',
  async (params) => {
    const { data } = await axios.post<TUser>(
      '/auth/sigin', params
    );
    return data;
  },
  );



const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
      window.localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.data = null
      state.load = 'loading'
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.load = 'success'
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.data = null
      state.load = 'error'
    });
  },
});

export const loginSelector = (state: RootState) => state.login;

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
