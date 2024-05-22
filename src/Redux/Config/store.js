import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../Slice/apiSlice";

const store = configureStore({
  reducer: {
    content: apiSlice,
  },
});
export default store;
