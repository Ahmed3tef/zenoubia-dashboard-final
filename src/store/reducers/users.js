// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//   user: [],
//   loading: false,
//   error: null,
// };

// export const getUsersAsync = createAsyncThunk(
//   "users/getUsersAsync",
//   async (user, thunkAPI) => {
//     console.log(user);
//     return await axios
//       .get("https://reqres.in/api/users", thunkAPI)
//       .then((res) => {
//         console.log(res);
//         return res.data;
//       })
//       .catch((err) => {
//         return err.message;
//       });
//   }
// );

// export const usersSlice = createSlice({
//   name: "users",
//   initialState,
//   extraReducers: {
//     [getUsersAsync.fulfilled]: (state, action) => {
//       console.log(action);
//       state.user = action.payload.data;
//       state.loading = false;
//       state.error = null;
//     },
//     [getUsersAsync.pending]: (state, action) => {
//       state.loading = true;
//       state.error = null;
//       state.user = null;
//     },
//     [getUsersAsync.rejected]: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//       state.user = null;
//     },
//   },
// });

// export const selectUsers = (state) => state.user;

// export default usersSlice.reducer;
