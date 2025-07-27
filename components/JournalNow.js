import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function JournalNow() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Journal")}
    >
      <Image
        source={require("../assets/images/leaf-journaling.png")}
        style={styles.icon}
      />
      <Text style={styles.text}>Journal Now</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    justifyContent: "center",
  },
  icon: {
    width: 40,
    height: 30,
  },
  text: {
    color: colors.black,
    fontWeight: 500,
    fontSize: 20,
  },
});
