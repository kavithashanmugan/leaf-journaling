import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import TopBar from "../components/TopBar";
import KeepAwake from "../components/KeepAwake";

export default function Home() {
  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <TopBar />
        <KeepAwake />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
    alignItems: "center",
  },
});
