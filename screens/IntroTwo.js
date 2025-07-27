import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";

import { colors } from "../constants/colors";
import AuthButton from "../components/AuthComponents/AuthButton";

const IntroTwo = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <Image
          source={require("../assets/images/tree.png")}
          style={styles.tree}
        />
        <Text style={styles.introText}>
          Dive into poetry, journal every day,
        </Text>
        <Text style={styles.introText}>
          Save memory capsules along the way,
        </Text>
        <Text style={styles.introText}>And watch your forest sway!</Text>
        <AuthButton onPress={() => navigation.navigate("Home")}>
          <Text>Explore as a Guest &rarr;</Text>
        </AuthButton>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signInText}>or continue with email</Text>
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
  tree: {
    width: 220,
    height: 270,
    objectFit: "contain",
    marginBottom: 20,
  },
  introText: {
    color: colors.black,
    fontSize: 16,
    textAlign: "center",
    fontWeight: 500,
    lineHeight: 24,
  },
  signInText: {
    marginTop: 20,
    color: colors.black,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default IntroTwo;
