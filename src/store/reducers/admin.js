import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIBase } from './api';

const initialState = {
  admin: [],
  isLoading: false,
  error: null,
};

export const loadAdmin = createAsyncThunk('admin', (token, thunkAPI) => {
  return axios
    .get(
      `${APIBase}admin`,
      {
        headers: {
          authorization: token,
        },
      },
      thunkAPI
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err.response.data;
    });
});

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadAdmin.pending, (state, action) => {
        state.admin = {
          name: '',
          phone: '',
          imageUrl: '',
        };
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAdmin.fulfilled, (state, { payload }) => {
        let data;
        if (payload) {
          if (payload.status === 0) {
            state.admin = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          const { _id: id, name, phone, imageUrl, email } = payload.data;

          data = {
            id,
            name,
            phone,
            imageUrl: APIBase + imageUrl,
            email,
          };
        }

        state.admin = data;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(loadAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.admin = null;
        state.error = action.payload;
      });
  },
});

export const getAdmin = (state) => state.admin;

export default adminSlice.reducer;
