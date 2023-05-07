import { createSlice } from "@reduxjs/toolkit";
import { logInAction, verifyAction  } from "./authActions";



const authorizationReducer = createSlice({
  name: "authorization",
  initialState: {
    token: "",
    isAuth: false,
    isLoading: false,
    isValid: false,
  },
  reducers: {
    getToken(state, action) {
      state.token = action.payload;
    },
    getAuth(state, action) {
      state.isAuth = action.payload;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logInAction.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logInAction.fulfilled, (state, action) => {
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(logInAction.rejected, (state, action) => {
      state.isLoading = false;
      state.isValid = true;
    });
    builder.addCase(verifyAction.pending, (state, action) => {
      state.isLoading = true;
    });
  },
});
export const { getToken, getUserInfo, getAuth , setLoading} = authorizationReducer.actions;
export default authorizationReducer.reducer;
