import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { addUserPoints, getUserId, getUserPoints } from "../api/userActions";
import { colors } from "../constants/colors";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { addToStreak, storeJournalEntry } from "../api/journalActions";

export default function Journaling() {
  const [title, setTitle] = useState("");
  const [journalEntry, setJournalEntry] = useState("");
  const navigation = useNavigation();

  const handleSave = async () => {
    if (journalEntry === "") {
      Toast.show({
        type: "info",
        text1: "Please type something in your journal!",
      });
      return;
    }
    const words = journalEntry.split();
    const numExtraPoints = Math.ceil(words.length / 50) * 5;
    try {
      await addUserPoints(numExtraPoints);
      await storeJournalEntry(title, journalEntry);
      const userId = await getUserId();
      await addToStreak(userId);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Sorry, something went wrong",
        text2: "Maybe try again later",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
        Record how your day has gone - maybe even write a poem!
      </Text>
      <View style={styles.titleContainer}>
        <Image
          source={require("../assets/images/journal.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Title"
          style={styles.title}
          onChangeText={setTitle}
        />
      </View>
      <View style={styles.journalContainer}>
        <Image
          source={require("../assets/images/journal.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="My today was..."
          style={styles.journal}
          multiline
          onChangeText={setJournalEntry}
          submitBehavior="submit"
          onSubmitEditing={handleSave}
          returnKeyType="send"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 15,
    backgroundColor: colors.yellow,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  heading: {
    color: colors.black,
    textAlign: "center",
    fontSize: 16,
  },
  titleContainer: {
    width: "100%",
    height: 40,
    marginVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 5,
    flexDirection: "row",
    gap: 10,
  },
  icon: {
    height: 30,
    width: 26,
  },
  title: {
    flex: 1,
  },
  journalContainer: {
    height: 300,
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 5,
    flexDirection: "row",
    gap: 10,
  },
  journal: {
    flex: 1,
  },
  button: {
    marginTop: 20,
    width: "100$",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e1e2e0",
    borderRadius: 6,
  },
  buttonText: {
    fontWeight: 700,
  },
});
