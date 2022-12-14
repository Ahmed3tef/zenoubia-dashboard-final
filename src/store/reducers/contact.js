import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import loadData from './loadData';

const initialState = {
  mails: [],
  isLoading: false,
  error: null,
};

export const loadMails = createAsyncThunk(
  'mails/loadMails',
  (token, thunkAPI) => loadData(thunkAPI, 'contactus', token)
);

export const mailsSlice = createSlice({
  name: 'mails',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadMails.pending, (state, action) => {
        state.mails = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadMails.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.mails = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }

          let data = payload.data.map((obj, i) => {
            const { name, _id: id, email, subject, message, phone } = obj;
            return {
              number: i + 1,
              id,
              name,
              email,
              subject,
              message,
              phone,
            };
          });

          state.mails = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadMails.rejected, (state, action) => {
        state.isLoading = false;
        state.mails = null;
        state.error = action.payload;
      });
  },
});

export const getMails = (state) => state.mails;

export default mailsSlice.reducer;
