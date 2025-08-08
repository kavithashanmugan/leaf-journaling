import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { colors } from "../constants/colors";
import { resetQuiz, updatePointsAddedFlag } from "../store/quizSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { addQuizScores } from "../api/quizActions";
import { addUserPoints } from "../api/userActions";
import { useEffect } from "react";

export default function FinishedQuiz() {
  const { score, numQuestions, pointsAddedFlag } = useSelector(
    (state) => state.quiz
  );

  const numWrongAnswers = numQuestions - score;
  const percentage = Math.round((score / numQuestions) * 100);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  useFocusEffect(() => {
    const addData = async () => {
      await addQuizScores(score, numWrongAnswers);
      await addUserPoints(score);
    };
    try {
      if (!pointsAddedFlag) {
        addData();
        dispatch(updatePointsAddedFlag());
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, something went wrong",
        text2: "Maybe try again later",
      });
    }
  });

  return (
    <View style={styles.finishedContainer}>
      <Text style={styles.headingText}>
        <Text style={styles.boldText}>{score}</Text>{" "}
        {score === 1 ? "Point" : "Points"}
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <View style={[styles.dot, { backgroundColor: "#8AAC66" }]}></View>
          <Text style={styles.figure}>{percentage}%</Text>
        </View>
        <View style={styles.stat}>
          <View style={[styles.dot, { backgroundColor: "#58ADD4" }]}></View>
          <Text style={styles.figure}>{numQuestions} Total Questions</Text>
        </View>
        <View style={styles.stat}>
          <View style={[styles.dot, { backgroundColor: "#0A64A5" }]}></View>
          <Text style={styles.figure}>{score} Correct</Text>
        </View>
        <View style={styles.stat}>
          <View style={[styles.dot, { backgroundColor: "#8AC0E5" }]}></View>
          <Text style={styles.figure}>{numWrongAnswers} Wrong</Text>
        </View>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => {
            dispatch(resetQuiz());
            navigation.navigate("Quiz");
          }}
        >
          <View style={styles.optionIconContainer}>
            <Image
              source={require("../assets/images/redo.png")}
              style={styles.icon}
            />
          </View>
          <Text>Play again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate("Leaderboard")}
        >
          <Image
            source={require("../assets/images/eyeIcon.png")}
            style={styles.eyeIcon}
          />
          <Text>View leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  finishedContainer: {
    marginVertical: 40,
  },
  headingText: {
    color: colors.black,
    textAlign: "center",
    fontSize: 28,
    letterSpacing: 2,
  },
  boldText: {
    fontWeight: "700",
  },
  statsContainer: {
    marginHorizontal: 20,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    flexWrap: "wrap",
  },
  stat: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  figure: {
    color: colors.black,
    fontSize: 18,
  },
  optionsContainer: {
    marginTop: 50,
    width: 250,
    flexDirection: "row",
    gap: 30,
    justifyContent: "space-between",
    alignSelf: "center",
  },
  optionContainer: {
    alignItems: "center",
    gap: 3,
  },
  optionIconContainer: {
    backgroundColor: "#0a64a5",
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  eyeIcon: {
    width: 45,
    height: 45,
  },
});
