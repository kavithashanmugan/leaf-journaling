import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import { colors } from "../constants/colors";
import { getAllJournalEntries } from "../api/journalActions";
import JournalEntry from "../components/JournalEntry";

export default function SavedJournalEntries() {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllJournalEntries();
      setJournalEntries(data);
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
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <ScrollView>
          <TopBar />
          <Text style={styles.headingText}>My Journal Entries</Text>
          <View style={styles.journalEntriesContainer}>
            {journalEntries.reverse().map((entry) => (
              <JournalEntry
                key={entry.id}
                title={entry.title}
                content={entry.content}
                date={entry["created_at"]}
              />
            ))}
          </View>
        </ScrollView>
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
  journalEntriesContainer: {
    marginVertical: 40,
    marginHorizontal: 20,
    gap: 15,
  },
});
