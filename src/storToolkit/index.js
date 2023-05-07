import { combineReducers , configureStore } from "@reduxjs/toolkit";
import questionsReducer from "./questions/questionsReducers";
import authorizationReducer from "./auth/authReducer";

const rootReducer = combineReducers({
    authorization: authorizationReducer,
    questions: questionsReducer,
})

export const store = configureStore({
    reducer: rootReducer,

})

