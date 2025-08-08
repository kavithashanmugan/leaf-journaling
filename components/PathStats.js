import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../constants/colors";
import Toast from "react-native-toast-message";
import { getNumActivePaths, getNumCompletedPaths } from "../api/pathActions";

export default function PathStats() {
  const [numActivePaths, setNumActivePaths] = useState(0);
  const [numCompletedPaths, setNumCompletedPaths] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const activePaths = await getNumActivePaths();
      setNumActivePaths(activePaths);

      const completedPaths = await getNumCompletedPaths();
      setNumCompletedPaths(completedPaths);
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
    <>
      <Text style={styles.headingText}>Paths</Text>
      <View style={styles.userPathsContainer}>
        <View style={styles.userPathContainer}>
          <View style={styles.rowContainer}>
            <Image
              source={require("../assets/images/bottom-nav/paths-active.png")}
              style={styles.icon}
            />
            <Text style={styles.number}>{numActivePaths}</Text>
          </View>
          <Text style={styles.pathText}>Active</Text>
        </View>
        <View style={styles.userPathContainer}>
          <View style={styles.rowContainer}>
            <Image
              source={require("../assets/images/checkmark.png")}
              style={styles.icon}
            />
            <Text style={styles.number}>{numCompletedPaths}</Text>
          </View>
          <Text style={styles.pathText}>Completed</Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headingText: {
    marginTop: 50,
    color: colors.black,
    textAlign: "center",
    fontSize: 28,
    letterSpacing: 2,
  },
  userPathsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  number: {
    color: colors.blue,
    textAlign: "center",
    fontSize: 20,
  },
  pathText: {
    color: colors.black,
    fontSize: 16,
  },
});
