import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/colors";

export default function KeepAwake() {
  const [isOn, setIsOn] = useState(false);

  return (
    <View style={styles.container}>
      {isOn ? (
        <TouchableOpacity onPress={() => setIsOn(false)}>
          <Image source={require("../assets/images/home/awake-on.png")} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={() => setIsOn(true)}>
          <Image source={require("../assets/images/home/awake-off.png")} />
        </TouchableOpacity>
      )}
      <Text style={styles.headingText}>Journal Mode</Text>
      <Text style={styles.bodyText}>Prevent your screen from going dark</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: "center",
  },
  headingText: {
    color: colors.black,
    textAlign: "center",
    fontWeight: "500",
  },
  bodyText: {
    color: "#333",
    fontSize: 10,
    textAlign: "center",
  },
});
