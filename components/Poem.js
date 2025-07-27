import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../constants/colors";

export default function Poem({ title, author, poem }) {
  return (
    <View style={styles.container}>
      <View style={styles.poemContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        {poem.map((line, index) => (
          <Text key={index} style={styles.line}>
            {line}
          </Text>
        ))}
      </View>

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
    paddingVertical: 15,
    backgroundColor: colors.white,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "center",
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
  poemContainer: {
    width: "70%",
    alignItems: "center",
  },
  title: {
    color: colors.blue,
    fontSize: 18,
    fontWeight: 700,
    textAlign: "center",
    zIndex: 2,
  },
  author: {
    color: colors.blue,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    zIndex: 2,
  },
  line: {
    color: colors.blue,
    textAlign: "center",
    zIndex: 2,
  },
});
