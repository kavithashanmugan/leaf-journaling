import { View, Text, StyleSheet } from "react-native";

const TopScore = ({ position, username, points }) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSideContainer}>
        <View style={styles.infoContainer}>
          <View style={styles.positionContainer}>
            <Text style={styles.positionText}>
              {position < 10 ? "0" + position : position}
            </Text>
          </View>

          <Text style={styles.username}>@{username}</Text>
        </View>
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>{points} pts</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#ffeb94",
    width: "100%",
    borderRadius: 6,
  },
  leftSideContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  position: {
    color: "#222511",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 21,
  },
  username: {
    color: "#222511",
    fontFamily: "Inter",
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "600",
  },
  pointsContainer: {
    width: 80,
    height: 30,
    backgroundColor: "#0a64a5",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  pointsText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 15,
  },
  positionContainer: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#0164a5",
    justifyContent: "center",
    alignItems: "center",
  },
  positionText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  infoContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});

export default TopScore;
