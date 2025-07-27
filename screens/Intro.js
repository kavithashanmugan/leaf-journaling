import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import AuthButton from "../components/AuthComponents/AuthButton";
import { useEffect } from "react";

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <TouchableOpacity
          style={styles.infoContainer}
          onPress={() => navigation.navigate("IntroTwo")}
        >
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>
            Leaf <Text style={styles.lingo}>Journaling</Text>
          </Text>
          <Text style={styles.introText}>
            Your Life, Your Art - Create a Memory Capsule with Every Page
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.beginText}>Begin Your Journey</Text>
            <Image
              source={require("../assets/images/right-arrow.png")}
              style={styles.arrow}
            />
          </View>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    width: deviceWidth > 600 ? 500 : 280,
    backgroundColor: "#ffca3520",
    padding: deviceWidth > 600 ? 30 : 10,
    marginTop: 15,
  },
  welcomeText: {
    color: "#0a64a5",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: 700,
  },
  brandText: {
    color: "#0a64a5",
    fontFamily: "Astrud",
    fontSize: 55,
    textAlign: "center",
  },
  lingo: {
    fontFamily: "Selznick",
  },
  introText: {
    color: "#22252d",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 500,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  beginText: {
    color: "#0a64a5",
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 18,
  },
  arrow: {
    width: 50,
    objectFit: "contain",
  },
});

export default Intro;
