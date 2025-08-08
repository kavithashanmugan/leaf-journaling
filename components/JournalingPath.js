import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { colors } from "../constants/colors";

export default function JournalingPath({ onSave, day }) {
  const [title, setTitle] = useState("");
  const [journalEntry, setJournalEntry] = useState("");

  useEffect(() => {
    setTitle("");
    setJournalEntry("");
  }, [day]);

  return (
    <View>
      <View style={styles.titleContainer}>
        <Image
          source={require("../assets/images/journal.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Title"
          style={styles.title}
          onChangeText={setTitle}
          value={title}
        />
      </View>
      <View style={styles.journalContainer}>
        <Image
          source={require("../assets/images/journal.png")}
          style={styles.icon}
        />
        <TextInput
          placeholder="Start Writing Here"
          style={styles.journal}
          multiline
          onChangeText={setJournalEntry}
          value={journalEntry}
          submitBehavior="submit"
          onSubmitEditing={() => onSave(title, journalEntry)}
          returnKeyType="send"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => onSave(title, journalEntry)}
      >
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
