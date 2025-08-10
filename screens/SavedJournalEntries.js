import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import { colors } from "../constants/colors";

export default function SavedJournalEntries() {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {}, []);

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <TopBar />
        <Text style={styles.headingText}>My Journal Entries</Text>
      </ImageBackground>
      <BottomNav activeScreen="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
    position: "relative",
  },
  headingText: {
    marginTop: 40,
    textAlign: "center",
    color: colors.black,
    fontSize: 18,
    fontWeight: "500",
  },
});
