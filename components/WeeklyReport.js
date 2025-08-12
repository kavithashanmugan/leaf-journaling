import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../constants/colors";
import { getWeeklyStreak } from "../api/journalActions";
import WeeklyStreakItem from "./WeeklyStreakItem";
import { getMasteryQuizScores } from "../api/userActions";
import WeeklyQuizItem from "./WeeklyQuizItem";

const MASTERY_QUIZ_QUESTIONS = [
  {
    id: 1,
    heading: "Self-Reflection & Awareness",
    body: "How well do you feel you understand your thoughts and emotions after journaling and poetry exploration?",
    color: "#8AAC66",
    name: "reflection_awareness",
  },
  {
    id: 2,
    heading: "Critical Thinking",
    body: "How effectively can you analyse and interpret personal experiences and poetic themes?",
    color: "#9747FF",
    name: "critical_thinking",
  },
  {
    id: 3,
    heading: "Emotional Expression",
    body: "How comfortable are you expressing your feelings and insights creatively and authentically?",
    color: "#58ADD4",
    name: "emotional_expression",
  },
  {
    id: 4,
    heading: "Memory & Self-Discovery",
    body: "Have you created personal memory capsules that reflect your life journey and growth?",
    color: "#FFCA35",
    name: "memory",
  },
  {
    id: 5,
    heading: "Creative Engagement",
    body: "How often do you engage with classic poems to foster inspiration and introspection?",
    color: "#E5E5ED",
    name: "creative_engagement",
  },
  {
    id: 6,
    heading: "Mindfulness & Presence",
    body: "How aware are you of the present moment through your reflective writing practices?",
    color: "#85C441",
    name: "mindfulness",
  },
  {
    id: 7,
    heading: "Goal Setting & Personal Growth",
    body: "Have you identified areas for development and set intentions for ongoing self-exploration?",
    color: "#D9D785",
    name: "goals",
  },
];

export default function WeeklyReport() {
  const [streakArray, setStreakArray] = useState({});
  const [masteryScores, setMasteryScores] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const dailyStreak = await getWeeklyStreak();
      setStreakArray(dailyStreak);

      const quizScores = await getMasteryQuizScores();
      const namesAndColors = {};
      for (let question of MASTERY_QUIZ_QUESTIONS) {
        namesAndColors[question.name] = question.color;
      }

      for (let key in quizScores) {
        if (Object.keys(namesAndColors).includes(key)) {
          setMasteryScores((prev) => ({
            ...prev,
            [namesAndColors[key]]: quizScores[key],
          }));
        }
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
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.streakContainer}>
        <View style={styles.rowContainer}>
          <Image
            source={require("../assets/images/streak-clipboard.png")}
            style={styles.icon}
          />
          <Text style={styles.headingText}>Streak</Text>
        </View>
        <View style={styles.markersContainer}>
          {Object.keys(streakArray)
            .reverse()
            .map((date) => (
              <WeeklyStreakItem
                key={date}
                isFilled={streakArray[date]}
                day={format(date, "eeeee")}
              />
            ))}
        </View>
      </View>
      <View style={styles.streakContainer}>
        <View style={styles.rowContainer}>
          <Image
            source={require("../assets/images/mastered-skills-icon.png")}
            style={styles.icon}
          />
          <Text style={styles.headingText}>Mastered Skills</Text>
        </View>
        <View style={styles.markersContainer}>
          {Object.keys(masteryScores).map((item) => (
            <WeeklyQuizItem color={item} score={masteryScores[item]} />
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("MasteryQuiz", {
            questions: MASTERY_QUIZ_QUESTIONS,
          })
        }
      >
        <Text style={styles.buttonText}>Check Your Mastery</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 20,
    alignItems: "center",
    gap: 30,
  },
  streakContainer: {
    alignItems: "center",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: 20,
    objectFit: "contain",
  },
  headingText: {
    color: colors.black,
    textAlign: "center",
    fontWeight: "500",
  },
  markersContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  button: {
    width: "100%",
    marginHorizontal: 20,
    height: 50,
    backgroundColor: colors.yellow,
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  buttonText: {
    color: colors.blue,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
});
