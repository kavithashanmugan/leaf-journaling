import { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import AuthButton from "../components/AuthComponents/AuthButton";
import { colors } from "../constants/colors";
import { initiateQuiz } from "../store/quizSlice";

export default function Quiz({ navigation }) {
  const { isStarted } = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(false);

  const handleStart = async () => {
    if (!isStarted) {
      setIsFetching(true);
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&category=10&type=multiple"
      );
      const data = await response.json();

      dispatch(initiateQuiz(data["results"]));
      setIsFetching(false);
    }

    navigation.navigate("Question");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <ScrollView>
          <TopBar />
          <View style={styles.signupContainer}>
            <Text style={styles.messageHeading}>Unleash your inner poet-</Text>
            <Text style={styles.messageBody}>
              Give your literature wisdom a play; take the test and see what you
              know today!
            </Text>
            <Image
              source={require("../assets/images/book.png")}
              style={styles.messageImage}
            />
            <AuthButton isSubmitting={isFetching} onPress={handleStart}>
              {isStarted ? "Continue Quiz" : "Start Quiz"}
            </AuthButton>
          </View>
        </ScrollView>
      </ImageBackground>
      <BottomNav activeScreen="quiz" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
  },
  signupContainer: {
    backgroundColor: "#f6ffbd",
    marginHorizontal: 15,
    marginTop: 30,
    padding: 10,
    borderRadius: 6,
  },
  signupText: {
    textAlign: "center",
    color: colors.black,
    fontWeight: "700",
  },
  treeImage: {
    width: "100%",
    position: "relative",
    bottom: 150,
  },
  messageHeading: {
    color: colors.black,
    textAlign: "center",
    fontSize: 28,
    fontWeight: "500",
  },
  messageBody: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 20,
  },
  messageImage: {
    alignSelf: "center",
    marginVertical: 15,
  },
});
