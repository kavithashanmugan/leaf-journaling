import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import { colors } from "../constants/colors";
import { getUserPoints, isUser } from "../api/userActions";
import Toast from "react-native-toast-message";
import {
  getNumActivePaths,
  getUserActivePath,
  userStartedPath,
} from "../api/pathActions";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SubscriptionContext } from "../contexts/SubscriptionContext";
import { useNavigation } from "@react-navigation/native";

const PATH_IMAGES = [
  require("../assets/images/paths/suffragette-bg.png"),
  require("../assets/images/paths/dream-log-bg.png"),
  require("../assets/images/paths/morning-bg.png"),
  require("../assets/images/paths/root-bg.png"),
  require("../assets/images/paths/stoic-bg.png"),
];

export default function PathItem({ item, onSelectPath }) {
  const [userPoints, setUserPoints] = useState(0);
  const [currentPath, setCurrentPath] = useState(null);

  const navigation = useNavigation();

  const { isPremium } = useContext(SubscriptionContext);

  useEffect(() => {
    const fetchData = async () => {
      const points = await getUserPoints();
      setUserPoints(points);

      const activePath = await getUserActivePath();
      if (activePath !== 0) {
        setCurrentPath(activePath);
      }
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

  const handleValidPath = async () => {
    if (!item["is_free"] && !isPremium) {
      // Alert.alert("Sorry, this path is for premium members only");
      navigation.navigate("Paywall");
    } else if (currentPath && currentPath !== item.id) {
      Alert.alert(
        "You're already on a path, it's true, wait 7 days then start anew"
      );
    } else if (item["num_points"] > userPoints) {
      Alert.alert(
        "Not enough points to begin this way. Start leaf journaling to earn your play!"
      );
    } else {
      onSelectPath(item.id);
    }
  };

  return (
    <TouchableOpacity style={styles.plan} onPress={handleValidPath}>
      <View style={styles.circle}>
        <Image
          source={PATH_IMAGES[Math.floor(Math.random() * PATH_IMAGES.length)]}
          style={styles.circleBg}
        />
      </View>
      <Text style={styles.planName}>{item["path_name"]}</Text>
      <Text style={styles.planPoints}>{item["num_points"]} points</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  plan: {
    alignItems: "center",
    width: 120,
  },
  circleBg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: 2,
    borderWidth: 2,
    borderColor: colors.blue,
  },
  planName: {
    marginTop: 6,
    color: colors.black,
    textAlign: "center",
    fontSize: 16,
  },
  planPoints: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "700",
  },
});
