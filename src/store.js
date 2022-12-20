import { configureStore } from "@reduxjs/toolkit";
import auth from "./slides/authSlide"
const store = configureStore({
  reducer: {
    auth
  },
});
export default store;
