import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import loadData from './loadData';

const initialState = {
  ads: [],
  isLoading: false,
  error: null,
};

export const loadAds = createAsyncThunk('ads/loadAds', thunkAPI =>
  loadData(thunkAPI, 'ads')
);

export const adsSlice = createSlice({
  name: 'ads',
  initialState,
  extraReducers: {
    [loadAds.pending]: (state, action) => {
      state.ads = [];
      state.isLoading = true;
      state.error = null;
    },
    [loadAds.fulfilled]: (state, { payload }) => {
      // console.log(payload);
      if (payload) {
        if (payload.status === 0) {
          state.ads = [];
          state.isLoading = false;
          state.error = payload.message;
          return;
        }
        let data = payload.data.map((obj, i) => {
          return {
            id: obj.id,
            englishName: obj.names.english,
            arabicName: obj.names.arabic,
            englishDesc: obj.description.english,
            arabicDesc: obj.description.arabic,
            imgUrl: obj.image.imageUrl,
            imgAlt: obj.image.alt,
            position: i + 1,
          };
        });

        state.ads = data;
        state.isLoading = false;
        state.error = null;
      }
    },
    [loadAds.rejected]: (state, action) => {
      state.isLoading = false;
      state.ads = null;
      state.error = action.payload;
    },
  },
});

export const getAds = state => state.ads;

export default adsSlice.reducer;
