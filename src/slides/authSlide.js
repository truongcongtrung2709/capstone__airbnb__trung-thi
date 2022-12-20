import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "../services/authAPI";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};
// signin action
export const signin = createAsyncThunk("auth/signin", async (values) => {
  try {
    const data = await authAPI.signin(values);
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  } catch (error) {
    throw error;
  }
});
// signup action
export const signup = createAsyncThunk("auth/signup", async (values) => {
  try {
    const data = await authAPI.signup(values);
    return data.content;
  } catch (error) {
    throw error;
  }
});

const authSlide = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      localStorage.removeItem("user");
      return { ...state, user: null };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state, action) => {
      return { ...state, loading: true };
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      return { ...state, loading: false, user: action.payload };
    });
    builder.addCase(signin.rejected, (state, action) => {
      return { ...state, loading: false, error: action.error.message };
    });
    builder.addCase(signup.pending, (state) => {
      return { ...state, isLoading: true };
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      return { ...state, isLoading: false, myAcount: action.payload };
    });
    builder.addCase(signup.rejected, (state, action) => {
      return { ...state, isLoading: false, myAcount: action.error.message };
    });
  },
});
export const { logout } = authSlide.actions;
export default authSlide.reducer;
