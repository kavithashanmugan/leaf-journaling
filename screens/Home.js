import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import KeepAwake from "../components/KeepAwake";
import Quote from "../components/Quote";
import BottomNav from "../components/BottomNav";
import Search from "../components/Search";
import JournalNow from "../components/JournalNow";
import { useIsUser } from "../hooks/useIsUser";
import { colors } from "../constants/colors";
import { getUserPoints } from "../api/userActions";
import Toast from "react-native-toast-message";

const QUOTES = [
  '"Do not think your single vote does not matter much. The rain that refreshes the parched ground is made up of single drops. All that separates, whether of race, class, creed, or sex, is inhuman, and must be overcome."',
  "“All that separates, whether of race, class, creed, or sex, is inhuman, and must be overcome.”",
  "“The question for me is whether we can keep Earth a safe, pleasant place for humankind and the ecosystems we rely on.”",
  "“We are tired of having a 'sphere' doled out to us, and of being told that anything outside that sphere is 'unwomanly'. We want to be natural just for a change … we must be ourselves at all risks.”",
];

export default function Home({ navigation }) {
  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];

  const { isLoggedInUser } = useIsUser();

  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const userPoints = await getUserPoints();
      setPoints(userPoints);
    };
    try {
      fetchData();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, something went wrong",
        text2: "Please try again later",
      });
    }
  }, [isLoggedInUser]);

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <TopBar />
        <KeepAwake />
        <Quote quoteText={quote} />
        <Search />
        {!isLoggedInUser && (
          <TouchableOpacity
            style={styles.signupContainer}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.signupText}>
              Sign up to start earning points for your creativity!
            </Text>
          </TouchableOpacity>
        )}
        {isLoggedInUser && points === 0 && (
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Start writing to earn points!</Text>
          </View>
        )}
        <JournalNow />
      </ImageBackground>
      <BottomNav activeScreen="home" />
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
  signupContainer: {
    backgroundColor: colors.yellow,
    marginHorizontal: 15,
    padding: 10,
    borderRadius: 6,
  },
  signupText: {
    textAlign: "center",
    color: colors.black,
    fontWeight: "700",
  },
});
