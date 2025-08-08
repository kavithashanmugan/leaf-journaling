import { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RenderHTML from "react-native-render-html";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import AuthButton from "../components/AuthComponents/AuthButton";
import { colors } from "../constants/colors";
import {
  finishQuiz,
  increaseScore,
  initiateQuiz,
  moveToNextQuestion,
  updateProgress,
} from "../store/quizSlice";
import FinishedQuiz from "../components/FinishedQuiz";

export default function Question() {
  const { width } = useWindowDimensions();

  const {
    questionsAndAnswers,
    currentQuestion,
    numQuestions,
    answeredQuestions,
    alreadyAnswered,
    isFinished,
    score,
  } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const question = {
    html: `<p style="font-size:1.5rem;">${questionsAndAnswers[currentQuestion]["question"]}</p>`,
  };

  const questionStyles = {
    p: {
      marginTop: 50,
      fontSize: 20,
      textAlign: "center",
    },
  };

  const correctAnswer = {
    html: questionsAndAnswers[currentQuestion]["correct_answer"],
  };
  const wrongAnswer1 = {
    html: questionsAndAnswers[currentQuestion]["incorrect_answers"][0],
  };
  const wrongAnswer2 = {
    html: questionsAndAnswers[currentQuestion]["incorrect_answers"][1],
  };
  const wrongAnswer3 = {
    html: questionsAndAnswers[currentQuestion]["incorrect_answers"][2],
  };
  const answers = [correctAnswer, wrongAnswer1, wrongAnswer2, wrongAnswer3];
  const shuffledAnswers = answers.sort((a, b) => a - b);

  const handleCheckAnswer = (answer) => {
    if (answer === correctAnswer) {
      dispatch(increaseScore());
    }
    dispatch(updateProgress());
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <ScrollView>
          <TopBar />
          {isFinished ? (
            <FinishedQuiz />
          ) : (
            <View style={styles.quizContainer}>
              <Text style={styles.quizHeading}>
                Question {currentQuestion + 1}/{numQuestions}
              </Text>

              <RenderHTML
                source={question}
                contentWidth={width}
                tagsStyles={questionStyles}
              />

              <View style={styles.answersContainer}>
                {shuffledAnswers.map((answer) => (
                  <TouchableOpacity
                    key={answer.html}
                    style={[
                      styles.answerButton,
                      {
                        borderColor: !alreadyAnswered
                          ? colors.blue
                          : answer === correctAnswer
                          ? "green"
                          : "red",
                      },
                    ]}
                    onPress={() => handleCheckAnswer(answer)}
                  >
                    <Text style={styles.answerText}>
                      <RenderHTML source={answer} contentWidth={width} />
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              {alreadyAnswered && (
                <AuthButton
                  onPress={() => {
                    if (currentQuestion < numQuestions - 1) {
                      dispatch(moveToNextQuestion());
                    } else {
                      dispatch(finishQuiz());
                    }
                  }}
                >
                  {currentQuestion < numQuestions - 1
                    ? "Next Question"
                    : "See Your Score"}
                </AuthButton>
              )}
            </View>
          )}
        </ScrollView>
      </ImageBackground>
      <BottomNav activeScreen="quiz" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
  },
  quizContainer: {
    margin: 40,
  },
  quizHeading: {
    color: colors.black,
    textAlign: "center",
    fontSize: 28,
    letterSpacing: 2,
  },
  questionText: {
    marginTop: 50,
    color: colors.black,
    fontSize: 26,
    letterSpacing: 2,
    textAlign: "center",
  },
  answersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
    justifyContent: "center",
    marginVertical: 40,
  },
  answerButton: {
    padding: 10,
    borderRadius: 6,
    borderWidth: 2,
  },
});
