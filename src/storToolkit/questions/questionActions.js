import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getInfoUserRequests,
  getQuestionsRequests,
  getAnswersRequests,
} from "../../api/authorizationRequests";
import { getQuestions, getAnswers, getDate } from "./questionsReducers";

export const getQuestionsAction = createAsyncThunk(
  "questions/getQuestionsAction",
  async function (token, { rejectWithValue, dispatch }) {
    try {
      const resUserInfo = await getInfoUserRequests(
        token.token,
        token.enqueueSnackbar
      );
      const resQuestions = await getQuestionsRequests(
        token.token,
        token.enqueueSnackbar
      );
      const resAnswers = await getAnswersRequests(
        token.token,
        token.enqueueSnackbar
      );
    //   if (!resUserInfo.data || !resQuestions.data) {
    //     throw new Error("Server error!");
    //   }

      localStorage.setItem("user_info", JSON.stringify(resUserInfo.data));

      localStorage.setItem("questions", JSON.stringify(resQuestions.data));
      dispatch(getQuestions(resQuestions.data));

      if (resAnswers.data) {
        localStorage.setItem("answers", JSON.stringify(resAnswers.data));
        dispatch(getAnswers(resAnswers.data.answers));
        dispatch(getDate(resAnswers.data.created_at));
      } else {
        localStorage.setItem("answers", JSON.stringify([]));
      }

      return token;
    } catch (error) {
      token.enqueueSnackbar("The given data was invalid.", {
        variant: "error",
      });
      return rejectWithValue(error);
    }
  }
);

// export const extraReducer = (builder) => {
//   builder.addCase(getQuestionsAction.pending, (state, action) => {
//     state.isDataLoading = true;
//     console.log("pending");
//   });
//   builder.addCase(getQuestionsAction.fulfilled, (state, action) => {
//     state.isDataLoading = false;
//     console.log("fulfilled");
//   });

//   builder.addCase(getQuestionsAction.rejected, (state, action) => {
//     state.isDataLoading = false;
//     state.isError = true;
//     console.log("rejected");
//   });
// };
