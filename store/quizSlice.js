import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentQuestion: 0,
  questionsAndAnswers: [],
  isStarted: false,
  isFinished: false,
  score: 0,
  progress: 0,
  answeredQuestions: 0,
  alreadyAnswered: false,
  numQuestions: 10,
  pointsAddedFlag: false,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    initiateQuiz(state, action) {
      state.questionsAndAnswers = action.payload;
      state.isStarted = true;
    },
    updateProgress(state) {
      state.answeredQuestions = state.answeredQuestions + 1;
      state.alreadyAnswered = true;
    },
    increaseScore(state) {
      state.score = state.score + 1;
    },
    moveToNextQuestion(state) {
      state.currentQuestion = state.currentQuestion + 1;
      state.alreadyAnswered = false;
    },
    finishQuiz(state) {
      state.isFinished = true;
    },
    updatePointsAddedFlag(state) {
      state.pointsAddedFlag = true;
    },
    resetQuiz(state) {
      state.currentQuestion = 0;
      state.score = 0;
      state.progress = 0;
      state.answeredQuestions = 0;
      state.isStarted = false;
      state.isFinished = false;
      state.alreadyAnswered = false;
      state.pointsAddedFlag = false;
    },
  },
});

export const {
  initiateQuiz,
  updateProgress,
  increaseScore,
  moveToNextQuestion,
  finishQuiz,
  updatePointsAddedFlag,
  resetQuiz,
} = quizSlice.actions;
export default quizSlice.reducer;
