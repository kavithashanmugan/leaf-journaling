import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export default function WeeklyQuizItem({ color, score }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.marker,
          {
            backgroundColor:
              score === "H"
                ? colors.blue
                : score === "L"
                ? "#58ADD4"
                : colors.white,
          },
        ]}
      ></View>
      <View style={[styles.dot, { backgroundColor: color }]}></View>
      <Text style={styles.text}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 5,
  },
  marker: {
    width: 20,
    height: 50,
    borderRadius: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
