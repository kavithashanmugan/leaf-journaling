import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../constants/colors";
import { getWeeklyStreak } from "../api/journalActions";
import WeeklyStreakItem from "./WeeklyStreakItem";

export default function WeeklyReport() {
  const [streakArray, setStreakArray] = useState({});

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const dailyStreak = await getWeeklyStreak();
      setStreakArray(dailyStreak);
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
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MasteryQuiz")}
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
