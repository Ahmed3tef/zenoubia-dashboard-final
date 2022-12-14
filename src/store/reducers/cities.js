import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import loadData from './loadData';

const initialState = {
  cities: [],
  isLoading: false,
  error: null,
};

export const loadCities = createAsyncThunk('cities/loadCities', (thunkAPI) =>
  loadData(thunkAPI, 'city')
);

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadCities.pending, (state, action) => {
        state.cities = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCities.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.cities = [];
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
              country: obj.governomentId.countryId,
              government: obj.governomentId,
            };
          });

          state.cities = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadCities.rejected, (state, action) => {
        state.isLoading = false;
        state.cities = null;
        state.error = action.payload;
      });
  },
});

export const getcities = (state) => state.cities;

export default citiesSlice.reducer;
