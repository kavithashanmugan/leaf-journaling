import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import { useIsUser } from "../hooks/useIsUser";
import { colors } from "../constants/colors";
import ForestStats from "../components/ForestStats";
import { getUserId, getUsername } from "../api/userActions";
import { getStreak } from "../api/journalActions";
import ProgressTracking from "../components/ProgressTracking";

export default function Profile() {
  const [username, setUsername] = useState(null);
  const [streak, setStreak] = useState(0);
  const [screenOption, setScreenOption] = useState("friends");

  const { isPremiumMember } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedUsername = await getUsername();
      setUsername(fetchedUsername);

      const userId = await getUserId();
      const fetchedStreak = await getStreak(userId);
      setStreak(fetchedStreak);
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
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <ScrollView>
          <TopBar />
          <Image
            source={require("../assets/images/paths/dream-log-bg.png")}
            style={styles.circle}
          />
          <Text style={styles.usernameText}>@{username}</Text>
          <View style={styles.rowContainer}>
            <View style={styles.innerRowContainer}>
              <Image
                source={require("../assets/images/streak-icon.png")}
                style={styles.icon}
              />
              <Text style={styles.streakText}>
                Streak: {streak} {streak === 1 ? "day" : "days"}
              </Text>
            </View>
            <View style={styles.innerRowContainer}>
              <AntDesign
                name={isPremiumMember ? "star" : "staro"}
                size={20}
                color={colors.blue}
              />
              <Text style={styles.streakText}>
                {isPremiumMember ? "Premium plan" : "Free plan"}
              </Text>
            </View>
          </View>
          <View style={styles.screenOptionsContainer}>
            <TouchableOpacity
              style={[
                styles.optionContainer,
                { borderWidth: screenOption === "progress" ? 2 : 0 },
              ]}
              onPress={() => setScreenOption("progress")}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color:
                      screenOption === "progress" ? "#222511" : "#22251130",
                  },
                ]}
              >
                Progress Tracking
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionContainer,
                { borderWidth: screenOption === "report" ? 2 : 0 },
              ]}
              onPress={() => setScreenOption("report")}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: screenOption === "report" ? "#222511" : "#22251130",
                  },
                ]}
              >
                Weekly Report
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.optionContainer,
                { borderWidth: screenOption === "friends" ? 2 : 0 },
              ]}
              onPress={() => setScreenOption("friends")}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: screenOption === "friends" ? "#222511" : "#22251130",
                  },
                ]}
              >
                Friends
              </Text>
            </TouchableOpacity>
          </View>
          {screenOption === "progress" && <ProgressTracking />}
        </ScrollView>
      </ImageBackground>
      <BottomNav activeScreen="profile" />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
  },
  circle: {
    marginTop: 30,
    alignSelf: "center",
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  usernameText: {
    marginTop: 20,
    color: colors.black,
    textAlign: "center",
    fontSize: 18,
    letterSpacing: 7,
  },
  rowContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
    alignItems: "center",
  },
  innerRowContainer: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  screenOptionsContainer: {
    backgroundColor: "#fff",
    marginTop: 25,
    marginHorizontal: 20,
    borderRadius: 6,
    flexDirection: "row",
  },
  optionContainer: {
    borderColor: "#0a64a5",
    width: "33%",
    paddingHorizontal: 12,
    paddingVertical: 11,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  optionText: {
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14,
    lineHeight: 20,
  },
});
