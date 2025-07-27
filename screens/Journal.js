import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";

import TopBar from "../components/TopBar";
import KeepAwake from "../components/KeepAwake";
import BottomNav from "../components/BottomNav";
import Poem from "../components/Poem";
import SurpriseMe from "../components/SurpriseMe";
import Search from "../components/Search";
import Journaling from "../components/Journaling";

export default function Journal({ route }) {
  const { poem, title, author } = route?.params ?? {};

  return (
    <View style={styles.screenContainer}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <ScrollView>
          <TopBar />
          <KeepAwake />
          {title ? (
            <Poem poem={poem} title={title} author={author} />
          ) : (
            <SurpriseMe />
          )}
          <Search />
          <Journaling />
        </ScrollView>
      </ImageBackground>
      <BottomNav activeScreen="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  background: {
    flex: 1,
  },
});
