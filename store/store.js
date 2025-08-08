import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import quizReducer from "./quizSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz: quizReducer,
  },
});
