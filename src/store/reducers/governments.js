import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import loadData, { loadDataWithId } from './loadData';

const initialState = {
  governments: [],
  isLoading: false,
  error: null,
};

export const loadGovernments = createAsyncThunk(
  'governments/loadGovernments',
  (thunkAPI) => loadData(thunkAPI, 'governoment')
);
export const loadGovernmentsWithCountryId = createAsyncThunk(
  'governments/loadGovernmentsWithCountryId',
  (id, thunkAPI) => loadDataWithId(thunkAPI, 'governoment', id)
);

export const governmentsSlice = createSlice({
  name: 'governments',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadGovernments.pending, (state, action) => {
        state.governments = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadGovernments.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.governments = [];
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
              country: obj.countryId,
            };
          });

          state.governments = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadGovernments.rejected, (state, action) => {
        state.isLoading = false;
        state.governments = null;
        state.error = action.payload;
      })
      .addCase(loadGovernmentsWithCountryId.pending, (state, action) => {
        state.governments = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadGovernmentsWithCountryId.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.governments = [];
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
              country: obj.countryId,
            };
          });

          state.governments = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadGovernmentsWithCountryId.rejected, (state, action) => {
        state.isLoading = false;
        state.governments = null;
        state.error = action.payload;
      });
  },
});

export const getGovernments = (state) => state.governments;

export default governmentsSlice.reducer;
