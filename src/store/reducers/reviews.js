import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIBase } from './api';
import { loadDataWithId } from './loadData';

const initialState = {
  reviews: [],
  error: null,
};

export const loadReviews = createAsyncThunk(
  'reviews/loadReviews',
  (id, thunkAPI) => loadDataWithId(thunkAPI, 'product/review', id)
);

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadReviews.pending, (state, action) => {
        state.reviews = [];
        state.error = null;
      })
      .addCase(loadReviews.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.reviews = [];
            state.error = payload.message;
            return;
          }

          let { rating } = payload.data;
          const productName = payload.data.names.english;
          // let {}
          const reviews = rating.map((rating) => {
            const {
              personComment: comment,
              starRate,
              timestamp: date,
              userId: { displayName: userName, imageUrl: userImg },
              _id: id,
            } = rating;
            return {
              productName,
              comment,
              starRate,
              date,
              userName,
              userImg: userImg
                ? userImg
                : `${APIBase}productImage/9edd350a-966f-494a-8ce0-625ce802fbcd.jpeg`,
              id,
            };
          });

          // console.log(reviews);
          state.reviews = reviews;
          state.error = null;
        }
      })
      .addCase(loadReviews.rejected, (state, action) => {
        // console.log(action);
        state.reviews = null;
        state.error = action.payload;
      });
  },
});

export const getReviews = (state) => state.reviews;

export default reviewsSlice.reducer;
