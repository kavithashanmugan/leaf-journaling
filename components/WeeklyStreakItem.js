import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export default function WeeklyStreakItem({ day, isFilled }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.marker,
          { backgroundColor: isFilled ? colors.blue : colors.white },
        ]}
      ></View>
      <Text style={styles.text}>{day}</Text>
      <Text style={styles.text}>{isFilled ? "1" : "0"}</Text>
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
});
