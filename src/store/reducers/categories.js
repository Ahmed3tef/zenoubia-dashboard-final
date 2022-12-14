import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import loadData from './loadData';

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const loadCategories = createAsyncThunk(
  'categories/loadCategories',
  thunkAPI => loadData(thunkAPI, 'cat')
);

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [loadCategories.pending]: (state, action) => {
      state.categories = [];
      state.isLoading = true;
      state.error = null;
    },
    [loadCategories.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      if (payload) {
        if (payload.status === 0) {
          state.categories = [];
          state.isLoading = false;
          state.error = payload.message;
          return;
        }
        let data = payload.data.map((obj, i) => {
          return {
            id: obj.id,
            englishName: obj.names.english,
            arabicName: obj.names.arabic,
            imgUrl: obj.image.imageUrl,
            imgAlt: obj.image.alt,
            createdAt: obj.createdAt,
            updatedAt: obj.updatedAt,
            position: 1 + i,
          };
        });

        state.categories = data;
        state.isLoading = false;
        state.error = null;
      }
    },
    [loadCategories.rejected]: (state, action) => {
      // console.log(action);
      state.isLoading = false;
      state.categories = null;
      state.error = action.payload;
    },
  },
});

export const getCategories = state => state.categories;

export default categoriesSlice.reducer;
