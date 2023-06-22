// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { createUser } from "./operations";

// export const userSlice = createAsyncThunk({
//   name: "user",
//   initialState: {
//     email: "",
//     login: "",
//     photo: null,
//     uid: "",
//     isAuth: false,
//     error: null,
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createUser.pending, (state, action) => {})
//       .addCase(createUser.fulfilled, (state, action) => {
//         const { email, login, photo, uid } = action.payload;
//         state.email = email;
//         state.login = login;
//         state.photo = photo;
//         state.uid = uid;
//         state.isAuth = true;
//         state.error = null;
//       })
//       .addCase(createUser.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });
// export const userReducer = userSlice.reducer;
