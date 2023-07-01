import { configureStore } from "@reduxjs/toolkit";
import { userReducer, postReducer } from "./slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
  },
});
