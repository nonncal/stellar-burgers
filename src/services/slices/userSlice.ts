import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { deleteCookie, setCookie } from '../../utils/cookie';
import { get } from 'http';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  error: string;
};

export const fetchLoginUser = createAsyncThunk(
  'userSlice/loginUser',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchRegisterUser = createAsyncThunk(
  'userSlice/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchLogoutUser = createAsyncThunk(
  'userSlice/logoutUser',
  async () => logoutApi()
);

export const fetchUpdateUser = createAsyncThunk(
  'userSlice/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const fetchGetUser = createAsyncThunk('userSlice/getUser', async () =>
  getUserApi()
);

const initialState: TUserState = {
  user: null,
  isLoading: false,
  error: ''
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = '';
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchGetUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGetUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(fetchGetUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchLogoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchLogoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.error = '';
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
      })
      .addCase(fetchLogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = '';
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(fetchUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  },
  selectors: {
    getUser: (state) => state.user,
    getAuthError: (state) => state.error,
    getIsAuthLoading: (state) => state.isLoading
  }
});

export const { getUser, getAuthError, getIsAuthLoading } = userSlice.selectors;

export default userSlice;
