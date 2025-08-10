import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { colors } from "../constants/colors";
import { getUsernameById } from "../api/userActions";
import { getLastJournaled } from "../api/journalActions";
import { transformDate } from "../utils/transformDate";

export default function Friend({ friendId }) {
  const [friendUsername, setFriendUsername] = useState("");
  const [lastJournalled, setLastJournalled] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = await getUsernameById(friendId);
      setFriendUsername(username);

      const unformattedlastJournaled = await getLastJournaled(friendId);

      const formattedLastJournaled = transformDate(unformattedlastJournaled);
      setLastJournalled(formattedLastJournaled);
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
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{friendUsername}</Text>
        <Text style={styles.lastJournalled}>
          {lastJournalled ? `Last journalled ${lastJournalled}` : ""}
        </Text>
      </View>
      <TouchableOpacity>
        <Image
          source={require("../assets/images/cowrite-icon.png")}
          style={styles.cowriteIcon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    padding: 20,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  username: {
    color: colors.black,
    fontWeight: "700",
  },
  lastJournalled: {
    color: "#22251170",
    fontSize: 12,
  },
  cowriteIcon: {
    width: 20,
    objectFit: "contain",
  },
});
