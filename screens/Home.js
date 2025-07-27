import { View, Text, StyleSheet, ImageBackground } from "react-native";
import React from "react";
import TopBar from "../components/TopBar";
import KeepAwake from "../components/KeepAwake";
import Quote from "../components/Quote";
import BottomNav from "../components/BottomNav";
import Search from "../components/Search";
import JournalNow from "../components/JournalNow";

const QUOTES = [
  '"Do not think your single vote does not matter much. The rain that refreshes the parched ground is made up of single drops. All that separates, whether of race, class, creed, or sex, is inhuman, and must be overcome."',
  "“All that separates, whether of race, class, creed, or sex, is inhuman, and must be overcome.”",
  "“The question for me is whether we can keep Earth a safe, pleasant place for humankind and the ecosystems we rely on.”",
  "“We are tired of having a 'sphere' doled out to us, and of being told that anything outside that sphere is 'unwomanly'. We want to be natural just for a change … we must be ourselves at all risks.”",
];

export default function Home() {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <TopBar />
        <KeepAwake />
        <Quote quoteText={quote} />
        <Search />
        <JournalNow />
      </ImageBackground>
      <BottomNav activeScreen="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
  },
});
