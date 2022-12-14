import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import loadData from './loadData';

const initialState = {
  colors: [],
  isLoading: false,
  error: null,
};

export const loadColors = createAsyncThunk('colors/loadColors', (thunkAPI) =>
  loadData(thunkAPI, 'color')
);

export const colorsSlice = createSlice({
  name: 'colors',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadColors.pending, (state, action) => {
        state.colors = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadColors.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.colors = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              id: obj._id,
              name: obj.name,
              hexValue: obj.hexValue,
            };
          });

          state.colors = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadColors.rejected, (state, action) => {
        state.isLoading = false;
        state.colors = null;
        state.error = action.payload;
      });
  },
});

export const getColors = (state) => state.colors;

export default colorsSlice.reducer;
