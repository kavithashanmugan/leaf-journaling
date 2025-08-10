import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getUsername } from "../api/userActions";
import { colors } from "../constants/colors";

export default function FriendRequest({
  friend,
  onDeleteRequest,
  onAcceptRequest,
}) {
  const [usernameFrom, setUsernameFrom] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const username = await getUsername(friend["user_from"]);
      setUsernameFrom(username);
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
    <View style={styles.container}>
      <Text style={styles.requestText}>
        @{usernameFrom} has sent you a friend request!
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onAcceptRequest(friend.id)}
        >
          <Text style={styles.buttonText}>Accept Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onDeleteRequest(friend.id)}
        >
          <Text style={styles.buttonText}>Delete Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F6FFBD",
    padding: 20,
    borderRadius: 6,
    alignItems: "center",
    gap: 10,
  },
  requestText: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.yellow,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.blue,
  },
});
