import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { colors } from "../constants/colors";
import {
  getFreePlans,
  getPremiumPlans,
  userStartedPath,
  getUserPathDay,
  startUserPath,
} from "../api/pathActions";
import Toast from "react-native-toast-message";
import PathItem from "../components/PathItem";
import { isUser } from "../api/userActions";
import BottomNav from "../components/BottomNav";
import PathStats from "../components/PathStats";

export default function Paths({ navigation }) {
  const [freePlans, setFreePlans] = useState([]);
  const [premiumPlans, setPremiumPlans] = useState([]);

  const handleSelectPath = async (pathId) => {
    const isLoggedIn = await isUser();
    if (!isLoggedIn) {
      Toast.show({
        type: "info",
        text1: "You need to be logged in to start a path",
      });
      return;
    }

    const isAlreadyStarted = await userStartedPath(pathId);

    if (isAlreadyStarted) {
      const dayNum = await getUserPathDay(pathId);
      navigation.navigate("PathDay", { pathId, dayNum });
    } else {
      startUserPath(pathId);
      navigation.navigate("PathDay", { pathId, dayNum: 1 });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const free = await getFreePlans();
      setFreePlans(free);

      const premium = await getPremiumPlans();
      setPremiumPlans(premium);
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
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <TopBar />
        <PathStats />
        <View style={styles.planContainer}>
          <Text style={styles.planType}>Free Plan</Text>
          <View style={styles.plansContainer}>
            <FlatList
              horizontal
              data={freePlans}
              renderItem={({ item }) => (
                <PathItem item={item} onSelectPath={handleSelectPath} />
              )}
            />
          </View>
        </View>
        <View style={styles.planContainer}>
          <Text style={styles.planType}>Premium Plan</Text>
          <View style={styles.plansContainer}>
            <FlatList
              horizontal
              data={premiumPlans}
              renderItem={({ item }) => (
                <PathItem item={item} onSelectPath={handleSelectPath} />
              )}
            />
          </View>
        </View>
      </ImageBackground>
      <BottomNav activeScreen="paths" />
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
  headingText: {
    marginTop: 50,
    color: colors.black,
    textAlign: "center",
    fontSize: 28,
    letterSpacing: 2,
  },
  userPathsContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  icon: {
    width: 20,
    height: 20,
  },
  number: {
    color: colors.blue,
    textAlign: "center",
    fontSize: 20,
  },
  pathText: {
    color: colors.black,
    fontSize: 16,
  },
  planContainer: {
    marginTop: 30,
  },
  planType: {
    color: colors.black,
    textAlign: "center",
  },
  plansContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    gap: 20,
  },
});
