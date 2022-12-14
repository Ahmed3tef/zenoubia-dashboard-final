import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import loadData from './loadData';

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

export const loadOrders = createAsyncThunk(
  'orders/loadOrders',
  (token, thunkAPI) => loadData(thunkAPI, 'order', token)
);

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadOrders.pending, (state, action) => {
        state.orders = [];
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadOrders.fulfilled, (state, { payload }) => {
        if (payload) {
          if (payload.status === 0) {
            state.orders = [];
            state.isLoading = false;
            state.error = payload.message;
            return;
          }
          let data = payload.data.map((obj, i) => {
            return {
              id: obj._id,
              userInfo: {
                name: `${obj.firstName} ${obj.lastName}`,
                phone: obj.phone,
                email: obj.email,
              },
              address: {
                country: obj.countryId.names,
                government: obj.governomentId.names,
                city: obj.cityId && obj.cityId.names ? obj.cityId.names : '',
                address: obj.address,
              },
              order: obj.products,
              // orderName: obj.products.map(p => p.)
              prices: obj.products.map((product) => {
                return {
                  currentPrice: product.priceId.price.currentPrice,
                  discountPrice: product.priceId.price.discountPrice,
                };
              }),
              quantity: obj.products.map((p) => p.quantity),
              orderNumber: obj.ranking,
              totalPrice: obj.total,
              coupon: obj.couponId,
              orderStatus: obj.orderStatus,
              notes: obj.adminNotes.adminComment,
            };
          });
          state.orders = data;
          state.isLoading = false;
          state.error = null;
        }
      })
      .addCase(loadOrders.rejected, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.orders = null;
        state.error = action.payload;
      });
  },
});

export const getOrders = (state) => state.orders;

export default ordersSlice.reducer;
