import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const API_URL = "https://poetrydb.org/";

export default function SurpriseMe() {
  const [isFetching, setIsFetching] = useState(false);
  const navigation = useNavigation();

  const handleClick = async () => {
    setIsFetching(true);

    const titleResponse = await fetch(`${API_URL}random/1/title`);
    const titleData = await titleResponse.json();
    const selectedTitle = titleData[0].title;

    const poemResponse = await fetch(
      `${API_URL}title/${selectedTitle}/lines.json`
    );
    const poem = await poemResponse.json();

    const authorResponse = await fetch(
      `${API_URL}title/${selectedTitle}/author`
    );
    const author = await authorResponse.json();

    navigation.navigate("Journal", {
      poem: poem[0].lines,
      author: author[0].author,
      title: selectedTitle,
    });

    setIsFetching(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <Text style={styles.quoteText}>Feeling uninspired?</Text>
        <Text style={styles.quoteText}>Type in your fave poet -</Text>
        <Text style={styles.quoteText}>Or click "Surprise Me!"</Text>
        <Text style={styles.quoteText}>And let the magic flow it!</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleClick}>
        <Text style={styles.buttonText}>
          {isFetching ? <ActivityIndicator /> : "Surprise Me!"}
        </Text>
      </TouchableOpacity>

      <Image
        source={require("../assets/images/duck.png")}
        style={styles.duckImage}
      />
      <Image
        source={require("../assets/images/sheep.png")}
        style={styles.sheepImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    paddingTop: 15,
    backgroundColor: colors.white,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: "relative",
    minHeight: 175,
  },
  duckImage: {
    position: "absolute",
    bottom: 0,
    left: "-15%",
    height: 100,
    objectFit: "contain",
  },
  sheepImage: {
    position: "absolute",
    bottom: 0,
    right: -20,
    height: 100,
    objectFit: "contain",
  },
  quoteContainer: {
    width: "70%",
    alignItems: "center",
  },
  quoteText: {
    textAlign: "center",
    color: colors.blue,
    zIndex: 2,
  },
  button: {
    marginTop: 15,
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  buttonText: {
    color: colors.blue,
    fontWeight: 600,
    fontSize: 16,
  },
});
