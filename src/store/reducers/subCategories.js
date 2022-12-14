import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loadData, { loadDataWithId } from './loadData';
const initialState = {
  subCategories: [],
  isLoading: false,
  error: null,
};

export const loadSubCategories = createAsyncThunk(
  'subCategories/loadSubCategories',
  (thunkAPI) => loadData(thunkAPI, 'subcat/all')
);
export const loadSubCategoriesWithId = createAsyncThunk(
  'subCategories/loadSubCategoriesWithId',
  (id, thunkAPI) => loadDataWithId(thunkAPI, 'subcat', id)
);

export const subCategoriesSlice = createSlice({
  name: 'subCategories',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadSubCategories.pending, (state, action) => {
        state.subCategories = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadSubCategories.fulfilled, (state, action) => {
        if (action.payload) {
          if (action.payload.status === 0) {
            state.subCategories = [];
            state.isLoading = false;
            state.error = action.payload.message;
            return;
          }
          let data = action.payload.data.map((obj, i) => {
            return {
              id: obj.data._id,
              catName: obj.catName,
              key: obj.data._id,
              englishName: obj.data.names.english,
              arabicName: obj.data.names.arabic,
              imgUrl: obj.data.image && obj.data.image.imageUrl,

              imgAlt: obj.data.image.alt,
              category: obj.data.categoriesId,
              position: i + 1,
              size: obj.data.size,
              color: obj.data.color,
              sizesId: obj.data.size.map((s) => s._id),
              colorsId: obj.data.color.map((s) => s._id),
            };
          });
          state.subCategories = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadSubCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.subCategories = null;
        state.error = action.payload.response.data.message;
      })
      .addCase(loadSubCategoriesWithId.pending, (state, action) => {
        state.subCategories = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadSubCategoriesWithId.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.subCategories = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              id: obj.data._id,
              catName: obj.catName,
              key: obj.data._id,
              englishName: obj.data.names.english,
              arabicName: obj.data.names.arabic,
              imgUrl: obj.data.image.imageUrl,
              imgAlt: obj.data.image.alt,
              category: obj.data.categoriesId,
              position: i + 1,
            };
          });

          state.subCategories = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadSubCategoriesWithId.rejected, (state, action) => {
        state.isLoading = false;
        state.subCategories = null;
        state.error = action.payload.response.data.message;
      });
  },
});

export const getSubCategories = (state) => state.subCategories;

export default subCategoriesSlice.reducer;
