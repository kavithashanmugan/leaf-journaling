import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";

import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import { useIsUser } from "../hooks/useIsUser";
import { colors } from "../constants/colors";
import ForestStats from "../components/ForestStats";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  getDayText,
  getUserActivePath,
  getUserPathDay,
} from "../api/pathActions";
import AuthButton from "../components/AuthComponents/AuthButton";

const TREE_IMAGES = {
  1: require("../assets/images/forest-day-1.png"),
  2: require("../assets/images/forest-day-2.png"),
  3: require("../assets/images/forest-day-3.png"),
  4: require("../assets/images/forest-day-4.png"),
  5: require("../assets/images/forest-day-5.png"),
  6: require("../assets/images/forest-day-6.png"),
  7: require("../assets/images/forest-day-7.png"),
};

export default function Forest({ route, navigation }) {
  const { isLoggedInUser } = useIsUser();

  const pathDay = route?.params?.pathDay || null;

  const [day, setDay] = useState(pathDay);
  const [dayHeading, setDayHeading] = useState("");
  const [dayBody, setDayBody] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const activePath = await getUserActivePath();
      const activePathDay = await getUserPathDay(activePath);
      setDay(activePathDay);
    };

    const fetchDayMessageData = async () => {
      const dayMessageData = await getDayText(pathDay);
      if (dayMessageData) {
        setDayHeading(dayMessageData[0]["heading"]);
        setDayBody(dayMessageData[0]["body"]);
      }
    };

    if (!pathDay) {
      try {
        fetchData();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Sorry, something went wrong",
          text2: "Maybe try again later",
        });
      }
    } else {
      try {
        fetchDayMessageData();
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Sorry, something went wrong",
          text2: "Maybe try again later",
        });
      }
    }
  }, []);

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <TopBar />
        <ForestStats />
        {!isLoggedInUser && (
          <TouchableOpacity
            style={styles.signupContainer}
            onPress={() => navigation.navigate("SignIn")}
          >
            <Text style={styles.signupText}>
              Sign up to start creating your memory capsules!
            </Text>
          </TouchableOpacity>
        )}
        {pathDay ? (
          <View style={styles.signupContainer}>
            <Text style={styles.messageHeading}>{dayHeading}</Text>
            <Text style={styles.messageBody}>{dayBody}</Text>
            <Image
              source={require("../assets/images/bottom-nav/paths-active.png")}
              style={styles.messageImage}
            />
            <AuthButton
              isSubmitting={false}
              onPress={() => navigation.navigate("Paths")}
            >
              Go To Paths
            </AuthButton>
          </View>
        ) : (
          <Image
            source={TREE_IMAGES[day]}
            style={styles.treeImage}
            resizeMode="contain"
          />
        )}
      </ImageBackground>
      <BottomNav activeScreen="forest" />
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
