import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import { colors } from "../constants/colors";
import {
  getAllTimeQuizScores,
  getDayQuizScores,
  getMonthQuizScores,
} from "../api/quizActions";
import TopScore from "../components/TopScore";

export default function Leaderboard() {
  const [screenOption, setScreenOption] = useState("all");
  const [topScores, setTopScores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (screenOption === "today") {
        const topScoreData = await getDayQuizScores();
        setTopScores(topScoreData);
      } else if (screenOption === "month") {
        const topScoreData = await getMonthQuizScores();
        setTopScores(topScoreData);
      } else if (screenOption === "all") {
        const topScoreData = await getAllTimeQuizScores();
        setTopScores(topScoreData);
      }
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
  }, [screenOption]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <ScrollView>
          <TopBar />
          <View style={styles.leaderboardContainer}>
            <Text style={styles.headingText}>Leaderboard</Text>
            <View style={styles.screenOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionContainer,
                  { borderWidth: screenOption === "month" ? 2 : 0 },
                ]}
                onPress={() => setScreenOption("month")}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: screenOption === "month" ? "#222511" : "#22251130",
                    },
                  ]}
                >
                  Month
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionContainer,
                  { borderWidth: screenOption === "today" ? 2 : 0 },
                ]}
                onPress={() => setScreenOption("today")}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: screenOption === "today" ? "#222511" : "#22251130",
                    },
                  ]}
                >
                  Today
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionContainer,
                  { borderWidth: screenOption === "all" ? 2 : 0 },
                ]}
                onPress={() => setScreenOption("all")}
              >
                <Text
                  style={[
                    styles.optionText,
                    {
                      color: screenOption === "all" ? "#222511" : "#22251130",
                    },
                  ]}
                >
                  All Time
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.topScoresContainer}>
              {topScores.map((score, index) => (
                <TopScore
                  key={score.username}
                  position={index + 1}
                  points={score.points}
                  username={score.username}
                />
              ))}
            </View>
          </View>
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
  screenOptionsContainer: {
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 25,
    borderRadius: 6,
    flexDirection: "row",
  },
  optionContainer: {
    borderColor: "#0a64a5",
    width: "33%",
    paddingHorizontal: 12,
    paddingVertical: 11,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  optionText: {
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 20,
  },
  topScoresContainer: {
    marginTop: 30,
    width: "100%",
    gap: 15,
  },
  leaderboardContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: 28,
    letterSpacing: 2,
    textAlign: "center",
  },
});
