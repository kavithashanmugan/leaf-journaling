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

const MASTERY_QUIZ_QUESTIONS = [
  {
    id: 1,
    heading: "Self-Reflection & Awareness",
    body: "How well do you feel you understand your thoughts and emotions after journaling and poetry exploration?",
    color: "#8AAC66",
    name: "reflection_awareness",
  },
  {
    id: 2,
    heading: "Critical Thinking",
    body: "How effectively can you analyse and interpret personal experiences and poetic themes?",
    color: "#9747FF",
    name: "critical_thinking",
  },
  {
    id: 3,
    heading: "Emotional Expression",
    body: "How comfortable are you expressing your feelings and insights creatively and authentically?",
    color: "#58ADD4",
    name: "emotional_expression",
  },
  {
    id: 4,
    heading: "Memory & Self-Discovery",
    body: "Have you created personal memory capsules that reflect your life journey and growth?",
    color: "#FFCA35",
    name: "memory",
  },
  {
    id: 5,
    heading: "Creative Engagement",
    body: "How often do you engage with classic poems to foster inspiration and introspection?",
    color: "#E5E5ED",
    name: "creative_engagement",
  },
  {
    id: 6,
    heading: "Mindfulness & Presence",
    body: "How aware are you of the present moment through your reflective writing practices?",
    color: "#85C441",
    name: "mindfulness",
  },
  {
    id: 7,
    heading: "Goal Setting & Personal Growth",
    body: "Have you identified areas for development and set intentions for ongoing self-exploration?",
    color: "#D9D785",
    name: "goals",
  },
];

export default function MasteryQuiz() {
  const [quizAnswers, setQuizAnswers] = useState({});

  const handleSelectAnswer = (name, response) => {
    setQuizAnswers((prev) => ({ ...prev, [name]: response }));
  };

  const handleSave = async () => {
    for (let question of MASTERY_QUIZ_QUESTIONS) {
      const quizAnswerResponse = quizAnswers[question.name] ?? "0";
      console.log(question["name"], quizAnswerResponse);
      await addMasteryQuizItem(question.name, quizAnswerResponse);
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
            {MASTERY_QUIZ_QUESTIONS.map((question) => (
              <MasteryQuizItem
                key={question.id}
                color={question.color}
                heading={question.heading}
                name={question.name}
                onSelect={handleSelectAnswer}
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
