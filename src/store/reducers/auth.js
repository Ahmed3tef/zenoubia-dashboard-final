import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import i18next from '../../i18n';
import { APIBase } from './api';

const initialState = {
  token: null,
  expiresInSeconds: null,
  expiresInMillis: null,
  rememberMe: false,
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (user, thunkAPI) => {
    return axios
      .post(`${APIBase}admin/login`, user, thunkAPI)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      });
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRememberMe(state, action) {
      state.rememberMe = action.payload;
    },
    logout(state) {
      //SESSION
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('tokenExpiration');

      //STORAGE
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');

      state.token = null;
      state.expiresInSeconds = null;
      state.didAutoLogout = false;
    },
    tryLogin(state) {
      state.token =
        sessionStorage.getItem('token') ?? localStorage.getItem('token');

      if (!state.token) return;

      const tokenExpiration =
        sessionStorage.getItem('tokenExpiration') ??
        localStorage.getItem('tokenExpiration');

      const expiresInMillis = +tokenExpiration - new Date().getTime();

      state.expiresInMillis = expiresInMillis;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        {
          if (action.payload && action.payload.status === 0) {
            state.error = i18next.t('authError');
            state.isLoading = false;
            return;
          }

          state.token = action.payload.token.token;
          state.expiresInSeconds = action.payload.token.exp;

          const expiresInMillis = +state.expiresInSeconds * 1000;
          const expirationDate = new Date().getTime() + expiresInMillis;

          localStorage.clear();
          sessionStorage.clear();

          if (state.rememberMe) {
            localStorage.setItem('token', state.token);
            localStorage.setItem('tokenExpiration', expirationDate);
          } else {
            sessionStorage.setItem('token', state.token);
            sessionStorage.setItem('tokenExpiration', expirationDate);
          }

          state.isLoading = false;
          state.error = null;
          state.expiresInMillis = expiresInMillis;
        }
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload.message;
        state.isLoading = false;
      });
  },
});

export const { logout, setRememberMe, tryLogin } = authSlice.actions;
export default authSlice.reducer;
