export const selectQuestions = (state) => state.questions.questions;
export const selectAnswers = (state) => state.questions.answers;
export const selectIsQuestionsLoading = (state) => state.questions.isDataLoading;
export const selectIsQuestionsError = (state) => state.questions.isError;
export const selectMergeData = (state) => state.questions.mergeData;
