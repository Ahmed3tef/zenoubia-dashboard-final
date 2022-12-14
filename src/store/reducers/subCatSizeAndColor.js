import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { APIBase } from './api';

const initialState = {
  sizes: [],
  colors: [],
  isLoading: false,
  error: null,
};

export const loadSizesAndColors = createAsyncThunk(
  'sizes/loadSizesAndColors',
  (id, thunkAPI) =>
    axios
      .get(
        `${APIBase}subcat/colorsizefromsubcat`,
        {
          params: { subcatId: id },
        },
        thunkAPI
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        return err.response.data;
      })
);

export const subCatSizeAndColor = createSlice({
  name: 'subCatSizeAndColor',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadSizesAndColors.pending, (state, action) => {
        state.sizes = [];
        state.colors = [];

        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadSizesAndColors.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.sizes = [];
            state.colors = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          // let data = payload.data.map((obj, i) => {
          //   console.log(obj);
          // });
          const { colors, sizes } = payload;
          let finalColors = colors.map((c) => {
            return { id: c._id, name: c.name };
          });
          let finalSizes = sizes.map((c) => {
            return { id: c._id, name: c.name };
          });

          state.sizes = finalSizes;
          state.colors = finalColors;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadSizesAndColors.rejected, (state, action) => {
        state.isLoading = false;
        state.sizes = [];
        state.colors = [];

        state.error = action.payload;
      });
  },
});

export const getSubCatSizeAndColor = (state) => state.sizes;

export default subCatSizeAndColor.reducer;
