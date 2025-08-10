import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

import { getStreak } from "../api/journalActions";
import { getUserId, getUsername } from "../api/userActions";
import BottomNav from "../components/BottomNav";
import Friends from "../components/Friends";
import ProgressTracking from "../components/ProgressTracking";
import TopBar from "../components/TopBar";
import { colors } from "../constants/colors";

export default function Profile({ navigation }) {
  const [username, setUsername] = useState(null);
  const [streak, setStreak] = useState(0);
  const [screenOption, setScreenOption] = useState("friends");
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

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
          <View style={styles.accountSection}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  borderBottomLeftRadius: accountMenuOpen ? 0 : 6,
                  borderBottomRightRadius: accountMenuOpen ? 0 : 6,
                },
              ]}
              onPress={() => setAccountMenuOpen((is) => !is)}
            >
              <Text style={styles.menuText}>Account</Text>
              <FontAwesome
                name={accountMenuOpen ? "angle-up" : "angle-down"}
                size={24}
                color={colors.blue}
              />
            </TouchableOpacity>
            {accountMenuOpen && (
              <View style={styles.menu}>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Subscription</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => navigation.navigate("SavedJournalEntries")}
                >
                  <Text style={styles.menuText}>Saved Journal Entries</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                  <Text style={styles.menuText}>Delete Account</Text>
                </TouchableOpacity>
              </View>
            )}
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
          {screenOption === "friends" && <Friends />}
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
  accountSection: {
    position: "relative",
  },
  button: {
    marginHorizontal: 20,
    height: 50,
    backgroundColor: colors.yellow,
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  menuText: {
    color: colors.blue,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
  menu: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: colors.white,
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  menuItem: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
