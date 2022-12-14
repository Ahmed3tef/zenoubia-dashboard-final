import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import loadData from './loadData';

const initialState = {
  sizes: [],
  isLoading: false,
  error: null,
};

export const loadSizes = createAsyncThunk('sizes/loadSizes', (thunkAPI) =>
  loadData(thunkAPI, 'size')
);

export const sizesSlice = createSlice({
  name: 'sizes',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadSizes.pending, (state, action) => {
        state.sizes = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadSizes.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.sizes = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              id: obj._id,
              name: obj.name,
            };
          });

          state.sizes = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadSizes.rejected, (state, action) => {
        state.isLoading = false;
        state.sizes = null;
        state.error = action.payload;
      });
  },
});

export const getSizes = (state) => state.sizes;

export default sizesSlice.reducer;
