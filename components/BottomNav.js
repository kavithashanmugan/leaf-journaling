import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import homeActive from "../assets/images/bottom-nav/home-active.png";
import homeInactive from "../assets/images/bottom-nav/home-inactive.png";
import pathsActive from "../assets/images/bottom-nav/paths-active.png";
import pathsInactive from "../assets/images/bottom-nav/paths-inactive.png";
import quizActive from "../assets/images/bottom-nav/quiz-active.png";
import quizInactive from "../assets/images/bottom-nav/quiz-inactive.png";
import forestActive from "../assets/images/bottom-nav/forest-active.png";
import forestInactive from "../assets/images/bottom-nav/forest-inactive.png";
import profileActive from "../assets/images/bottom-nav/profile-active.png";
import profileInactive from "../assets/images/bottom-nav/profile-inactive.png";
import { colors } from "../constants/colors";

export default function BottomNav({ activeScreen }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.navItemContainer,
          { backgroundColor: activeScreen === "home" ? colors.yellow : "#fff" },
        ]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.text}>Home</Text>
        <Image
          source={activeScreen === "home" ? homeActive : homeInactive}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItemContainer,
          {
            backgroundColor: activeScreen === "paths" ? colors.yellow : "#fff",
          },
        ]}
        onPress={() => navigation.navigate("Paths")}
      >
        <Text style={styles.text}>Paths</Text>
        <Image
          source={activeScreen === "paths" ? pathsActive : pathsInactive}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItemContainer,
          { backgroundColor: activeScreen === "quiz" ? colors.yellow : "#fff" },
        ]}
        onPress={() => navigation.navigate("Quiz")}
      >
        <Text style={styles.text}>Quiz</Text>
        <Image
          source={activeScreen === "quiz" ? quizActive : quizInactive}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItemContainer,
          {
            backgroundColor: activeScreen === "forest" ? colors.yellow : "#fff",
          },
        ]}
        onPress={() => navigation.navigate("Forest")}
      >
        <Text style={styles.text}>Forest</Text>
        <Image
          source={activeScreen === "forest" ? forestActive : forestInactive}
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.navItemContainer,
          {
            backgroundColor:
              activeScreen === "profile" ? colors.yellow : "#fff",
          },
        ]}
        onPress={() => navigation.navigate("Profile")}
      >
        <Text style={styles.text}>Profile</Text>
        <Image
          source={activeScreen === "profile" ? profileActive : profileInactive}
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "#fff",
  },
  navItemContainer: {
    borderRadius: 6,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: colors.black,
    letterSpacing: 1,
  },
  icon: {
    height: 17,
    width: 17,
  },
});
