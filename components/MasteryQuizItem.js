import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colors";

export default function MasteryQuizItem({
  color,
  heading,
  name,
  onSelect,
  children,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <View style={[styles.dot, { backgroundColor: color }]}></View>
        <Text style={styles.headingText}>{heading}</Text>
      </View>
      <Text style={styles.bodyText}>{children}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.dontKnow]}
          onPress={() => onSelect(name, "0")}
        >
          <Text style={styles.buttonText}>Don't Know</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.low]}
          onPress={() => onSelect(name, "L")}
        >
          <Text style={styles.buttonText}>Low</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.high]}
          onPress={() => onSelect(name, "H")}
        >
          <Text style={styles.buttonText}>High</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    padding: 20,
    borderRadius: 6,
    gap: 12,
  },
  headingContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  bodyText: {
    color: colors.black,
    fontSize: 12,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 85,
    height: 30,
    borderWidth: 1,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: "600",
  },
  dontKnow: {
    borderColor: colors.white,
  },
  low: {
    borderColor: "#58ADD4",
  },
  high: {
    borderColor: colors.blue,
  },
});
