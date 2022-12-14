import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { loadDataWithParams } from './loadData';

const initialState = {
  mostSelling: [],
  mostCustomer: [],

  error: null,
};

export const loadMostSelling = createAsyncThunk(
  'reports/loadMostSelling',
  ({ params, data, token }, thunkAPI) =>
    loadDataWithParams(thunkAPI, 'reports/mostselling', params, data, token)
);
export const loadMostCustomers = createAsyncThunk(
  'reports/loadMostCustomers',
  ({ params, data, token }, thunkAPI) =>
    loadDataWithParams(thunkAPI, 'reports/mostcustomer', params, data, token)
);

export const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadMostSelling.pending, (state, action) => {
        state.mostSelling = [];
        state.error = null;
      })
      .addCase(loadMostSelling.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.mostSelling = [];
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              id: obj.product._id,
              position: 1 + i,
              name: obj.product.names,
              count: obj.count,
            };
          });
          // console.log(data);
          state.mostSelling = data;
          state.error = null;
        }
      })
      .addCase(loadMostSelling.rejected, (state, action) => {
        // console.log(action);
        state.mostSelling = [];
        state.error = action.payload;
      })
      .addCase(loadMostCustomers.pending, (state, action) => {
        state.mostCustomer = [];
        state.error = null;
      })
      .addCase(loadMostCustomers.fulfilled, (state, { payload }) => {
        // console.log(payload);
        if (payload) {
          if (payload.status === 0) {
            state.mostCustomer = [];
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            // console.log(obj);
            return {
              firstName: obj._id.firstName,
              lastName: obj._id.lastName,
              phone: obj._id.phone,
              email: obj._id.email,
              count: obj.count,
              totalAmount: obj.totalAmount,
              position: i + 1,
              id: i,
            };
          });
          // console.log(data);
          state.mostCustomer = data;
          state.error = null;
        }
      })
      .addCase(loadMostCustomers.rejected, (state, action) => {
        // console.log(action);
        state.mostCustomer = [];
        state.error = action.payload;
      });
  },
});

export const getReports = (state) => state.reports;

export default reportsSlice.reducer;
