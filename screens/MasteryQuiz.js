import { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import { colors } from "../constants/colors";
import MasteryQuizItem from "../components/MasteryQuizItem";
import { addMasteryQuizItem } from "../api/userActions";

export default function MasteryQuiz({ route, navigation }) {
  const [quizAnswers, setQuizAnswers] = useState({});

  const { questions } = route.params;

  const handleSelectAnswer = (name, response) => {
    setQuizAnswers((prev) => ({ ...prev, [name]: response }));
  };

  const handleSave = async () => {
    for (let question of questions) {
      const quizAnswerResponse = quizAnswers[question.name] ?? "0";

      await addMasteryQuizItem(question.name, quizAnswerResponse);

      navigation.navigate("Profile");
    }
  };

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <ScrollView>
          <TopBar />
          <View style={styles.quizContainer}>
            <View>
              <Text style={styles.headingText}>
                Self-Mastery Assessment Quiz
              </Text>
              <Text style={styles.bodyText}>
                Please reflect on your experience during the course and select
                the option that best describes your current level of mastery for
                each skill.
              </Text>
            </View>
            {questions.map((question) => (
              <MasteryQuizItem
                key={question.id}
                color={question.color}
                heading={question.heading}
                name={question.name}
                onSelect={handleSelectAnswer}
                answer={quizAnswers[question.name]}
              >
                {question.body}
              </MasteryQuizItem>
            ))}
            <Text style={styles.bodyText}>
              Thank you for completing this assessment! Your responses will help
              you understand your current mastery levels and guide your
              continued growth.
            </Text>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
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
    position: "relative",
  },
  quizContainer: {
    marginVertical: 40,
    marginHorizontal: 20,
    gap: 25,
  },
  headingText: {
    color: colors.black,
    textAlign: "center",
    fontSize: 18,
  },
  bodyText: {
    color: colors.black,
    textAlign: "center",
    lineHeight: 22,
  },
  button: {
    height: 50,
    backgroundColor: colors.yellow,
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  buttonText: {
    color: colors.blue,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
  },
});
