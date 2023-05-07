import { createSlice } from "@reduxjs/toolkit";
import { getQuestionsAction } from "./questionActions";

const questionsReducer = createSlice({
  name: "questions",
  initialState: {
    questions: {},
    answers: [],
    date: "",
    mergeData: [],
    userInfo: {},
    isDataLoading: true,
    isError: false,
  },
  reducers: {
    getUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    getQuestions(state, action) {
      state.questions = action.payload;
    },
    getAnswers(state, action) {
      state.answers = action.payload;
    },
    getDate(state, action) {
      state.date = action.payload;
    },
    mergeDataToStoreAction(state, action) {
      state.mergeData = action.payload;
    },
    changeAnswerRatingWithTagsAction(state, action) {
      let newId = action.payload.answerId;
      let newTag = action.payload.tag;
      let newRating = action.payload.rating;
      let valueItem = state.mergeData.find((item) => item.id === newId);
      if (valueItem.origin_answer.answer_data.rating == newRating) {
        let value = valueItem.origin_answer.answer_data.tags.findIndex(
          (item) => item === newTag
        );
        if (value === -1) {
          valueItem.origin_answer.answer_data.tags.push(newTag);
        } else {
          var myIndex =
            valueItem.origin_answer.answer_data.tags.indexOf(newTag);
          if (myIndex !== -1) {
            valueItem.origin_answer.answer_data.tags.splice(myIndex, 1);
          }
        }
      } else {
        valueItem.origin_answer.answer_data.rating = newRating;
        valueItem.origin_answer.answer_data.tags = [];
      }
    },
    changeAnswerMultiRatingAction(state, action) {
      let multiRatingId = action.payload.answerId;
      let indicatorRating = action.payload.indicator;
      let newMultiRating = action.payload.rating;
      const {
        origin_answer: { answer_data },
      } = state.mergeData.find((item) => item.id === multiRatingId);

      if (answer_data.length) {
        const findValue = answer_data.find(
          (item) => item.indicator == indicatorRating
        );
        !findValue
          ? answer_data.push({
              indicator: indicatorRating,
              rating: newMultiRating,
            })
          : (findValue.rating = newMultiRating);
      } else {
        answer_data.push({
          indicator: indicatorRating,
          rating: newMultiRating,
        });
      }
    },
    changeAnswerScaleAction(state, action) {
      let scaleId = action.payload.answerId;
      let valueScale = action.payload.value;
      let index = state.mergeData.findIndex((item) => item.id === scaleId);
      state.mergeData[index].origin_answer.answer_data = {
        value: valueScale,
      };
    },
    addFeedbackAction(state, action) {
      state.mergeData[action.payload.id].origin_answer.feedback =
        action.payload.feedback;
    },
    setDoneAction(state, action) {
      state.mergeData[action.payload.id].isDone = action.payload.isDone;
    },
    clearStore(state) {
      state.questions = [];
      state.answers = [];
      state.date = "";
      state.mergeData = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestionsAction.pending, (state, action) => {
      state.isDataLoading = true;
      console.log("pending");
    });
    builder.addCase(getQuestionsAction.fulfilled, (state, action) => {
      state.isDataLoading = false;
      console.log("fulfilled");
    });

    builder.addCase(getQuestionsAction.rejected, (state, action) => {
      state.isError = true;
      state.isDataLoading = false;
      console.log("rejected");
    });
  },
});

export default questionsReducer.reducer;
export const {
  getQuestions,
  getAnswers,
  getDate,
  mergeDataToStoreAction,
  changeAnswerRatingWithTagsAction,
  changeAnswerMultiRatingAction,
  changeAnswerScaleAction,
  addFeedbackAction,
  setDoneAction,
  clearStore,
} = questionsReducer.actions;
