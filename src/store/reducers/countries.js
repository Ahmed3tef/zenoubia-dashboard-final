import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import loadData from './loadData';

const initialState = {
  countries: [],
  isLoading: false,
  error: null,
};

export const loadCountries = createAsyncThunk(
  'countries/loadCountries',
  (thunkAPI) => loadData(thunkAPI, 'country')
);

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.pending, (state, action) => {
        state.countries = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCountries.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.countries = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              number: i + 1,
              id: obj.id,
              arabicName: obj.names.arabic,
              englishName: obj.names.english,
            };
          });

          state.countries = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.countries = null;
        state.error = action.payload;
      });
  },
});

export const getCountries = (state) => state.countries;

export default countriesSlice.reducer;
