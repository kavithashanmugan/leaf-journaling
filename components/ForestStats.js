import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../constants/colors";
import Toast from "react-native-toast-message";
import { getNumActivePaths, getNumCompletedPaths } from "../api/pathActions";

export default function ForestStats() {
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
      <Text style={styles.headingText}>Forest</Text>
      <View style={styles.userPathsContainer}>
        <View style={styles.userPathContainer}>
          <View style={styles.rowContainer}>
            <Image
              source={require("../assets/images/forest-stats-creating.png")}
              style={styles.icon}
            />
            <Text style={styles.number}>{numActivePaths}</Text>
          </View>
          <Text style={styles.pathText}>
            {numActivePaths === 1
              ? "Memory Capsule in Progress"
              : "Memory Capsules in Progress"}
          </Text>
        </View>
        <View style={styles.userPathContainer}>
          <View style={styles.rowContainer}>
            <Image
              source={require("../assets/images/forest-stats-planted.png")}
              style={styles.icon}
            />
            <Text style={styles.number}>{numCompletedPaths}</Text>
          </View>
          <Text style={styles.pathText}>
            {numCompletedPaths === 1
              ? "Planted Memory Capsule"
              : "Planted Memory Capsules"}
          </Text>
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
    paddingHorizontal: 15,
  },
  userPathContainer: {
    maxWidth: "40%",
  },
  rowContainer: {
    flexDirection: "row",
    gap: 5,
    alignSelf: "center",
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
    textAlign: "center",
  },
});
