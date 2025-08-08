import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { colors } from "../constants/colors";
import { resetQuiz, updatePointsAddedFlag } from "../store/quizSlice";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { addQuizScores, getTotalPercentage } from "../api/quizActions";
import { addUserPoints, getUserPoints } from "../api/userActions";
import { useEffect, useState } from "react";
import { getNumCompletedPaths } from "../api/pathActions";

export default function ProgressTracking() {
  const [userPoints, setUserPoints] = useState(0);
  const [quizPercentage, setQuizPercentage] = useState("-");
  const [completedPaths, setCompletedPaths] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const points = await getUserPoints();
      setUserPoints(points);

      const percentage = await getTotalPercentage();
      setQuizPercentage(percentage);

      const numCompletedPaths = await getNumCompletedPaths();
      setCompletedPaths(numCompletedPaths);
    };

    try {
      fetchData();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, something went wrong",
        text2: "Maybe try again later",
      });
    }
  }, []);

  return (
    <View style={styles.finishedContainer}>
      <Text style={styles.headingText}>
        Your Score <Text style={styles.boldText}>{userPoints}</Text>{" "}
        {userPoints === 1 ? "Point" : "Points"}
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <View style={[styles.dot, { backgroundColor: "#8AAC66" }]}></View>
          <Text style={styles.figure}>
            {quizPercentage} quiz questions correct
          </Text>
        </View>
        <View style={styles.stat}>
          <View style={[styles.dot, { backgroundColor: "#58ADD4" }]}></View>
          <Text style={styles.figure}>{completedPaths} Completed Paths</Text>
        </View>
      </View>
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

  optionContainer: {
    alignItems: "center",
    gap: 3,
    marginTop: 50,
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
});
