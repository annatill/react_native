// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { auth } from "../firebase/config";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// export const createUser = createAsyncThunk(
//   "user/createUser",
//   async ({ login, email, password, photo }, { rejectWithValue }) => {
//     try {
//       const userCredential = await auth.createUserWithEmailAndPassword(
//         email,
//         password
//       );
//       const user = {
//         uid: userCredential.user.uid,
//         email: userCredential.user.email,
//         login,
//         photo,
//       };
//       return user;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
