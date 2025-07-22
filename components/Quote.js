import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "../constants/colors";

export default function Quote({ quoteText }) {
  return (
    <View style={styles.container}>
      <Text>Quote</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    paddingLeft: 20,
    paddingTop: 5,
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
