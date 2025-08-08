import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TopBar from "../components/TopBar";
import { colors } from "../constants/colors";
import PathStats from "../components/PathStats";
import BottomNav from "../components/BottomNav";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { getPath, updateDayNum } from "../api/pathActions";
import Journaling from "../components/Journaling";
import JournalingPath from "../components/JournalingPath";
import { addUserPoints, getUserId } from "../api/userActions";
import { addToStreak, storeJournalEntry } from "../api/journalActions";

export default function PathDay({ route, navigation }) {
  let { pathId, dayNum } = route?.params;

  const [day, setDay] = useState(dayNum);

  const [pathData, setPathData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPath(pathId, day);

      if (data) {
        setPathData(data[0]);
      } else {
        throw new Error("Error fetching data");
      }
    };
    try {
      if (day <= 7) fetchData();
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, something went wrong",
        text2: "Maybe try again later",
      });
    }
  }, [day]);

  const handleSave = async (title, journalEntry) => {
    if (journalEntry === "") {
      Toast.show({
        type: "info",
        text1: "Please type something in your journal!",
      });
      return;
    }
    const words = journalEntry.split();
    const numExtraPoints = Math.ceil(words.length / 50) * 5;
    try {
      await addUserPoints(numExtraPoints);
      await storeJournalEntry(title, journalEntry);
      const userId = await getUserId();
      await addToStreak(userId);
      if (day <= 7) {
        await updateDayNum(pathId, day + 1);
        setDay(day + 1);
        navigation.navigate("Forest", { pathDay: day });
      }
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: "Sorry, something went wrong",
        text2: "Maybe try again later",
      });
    }
  };

  const handleRestartPath = async () => {
    await updateDayNum(pathId, 1);
    setDay(1);
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <ScrollView>
          <TopBar />
          <PathStats />
          <View style={styles.pathContainer}>
            {day === 8 ? (
              <>
                <Text style={styles.dayNumText}>
                  Congratulations! You completed this path!
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleRestartPath}
                >
                  <Text style={styles.buttonText}>Restart path</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.dayNumText}>Day {day}</Text>
                <Text style={styles.nameText}>{pathData.name}</Text>
                <Text style={styles.headingText}>Prompt:</Text>
                <Text style={styles.promptText}>{pathData.prompt}</Text>
                <Text style={styles.headingText}>Action:</Text>
                <Text style={styles.promptText}>{pathData.action}</Text>
                <JournalingPath onSave={handleSave} day={day} />
              </>
            )}
          </View>
        </ScrollView>
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
    paddingHorizontal: 15,
  },
  pathContainer: {
    marginTop: 40,
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 30,
    backgroundColor: colors.yellow,
    borderRadius: 6,
    alignItems: "center",
  },
  dayNumText: {
    color: colors.black,
    textAlign: "center",
    fontSize: 28,
  },
  nameText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "500",
  },
  headingText: {
    marginTop: 20,
    color: colors.black,
    fontSize: 16,
    textAlign: "center",
  },
  promptText: {
    color: colors.black,
    textAlign: "center",
  },
  button: {
    marginTop: 20,
    backgroundColor: colors.blue,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.white,
  },
});
