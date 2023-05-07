import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequests, verifyRequests } from "../../api/authorizationRequests";
import { getAuth, setLoading } from "./authReducer";

export const logInAction = createAsyncThunk(
  "authorization/logInAction",
  async function (value, { rejectWithValue }) {
    try {
      const response = await loginRequests(
        value.url,
        value.userData,
        value.enqueueSnackbar
      );
      await localStorage.setItem(
        "access_token",
        JSON.stringify(response.data.access_token)
      );

      return response;
    } catch (error) {
      value.enqueueSnackbar("The given data was invalid.", {
        variant: "error",
      });
      return rejectWithValue(error);
    }
  }
);

export const verifyAction = createAsyncThunk(
  "authorization/verifyAction",
  async function (verifyData, { rejectWithValue, dispatch }) {
    try {
      const response = await verifyRequests(
        verifyData.token,
        verifyData.urlData,
        verifyData.enqueueSnackbar
      );
      verifyData.enqueueSnackbar(response.data.message, {
        variant: "Success",
      });
      dispatch(getAuth(true));
      dispatch(setLoading(false));

      return response;
    } catch (error) {
      localStorage.clear();
      verifyData.navigate("/logIn");
      verifyData.enqueueSnackbar("Account already verified", {
        variant: "Error",
      });
      dispatch(setLoading(false));
    }
  }
);

// export const extraReducerAuth = (builder) => {
//   builder.addCase(logInAction.pending, (state, action) => {
//     state.isLoading = true;
//   });
//   builder.addCase(logInAction.fulfilled, (state, action) => {
//     state.isAuth = true;
//     state.isLoading = false;
//   });
//   builder.addCase(logInAction.rejected, (state, action) => {
//     state.isLoading = false;
//     state.isValid = true;
//   });
//   builder.addCase(verifyAction.pending, (state, action) => {
//     state.isLoading = true;
//   });
// }
