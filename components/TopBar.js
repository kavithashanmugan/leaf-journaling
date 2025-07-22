import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../constants/colors";

const POINTS = 450;
const IS_GUEST = true;
const USERNAME = "";

export default function TopBar() {
  const [isGuest, setIsGuest] = useState(IS_GUEST);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Image
          source={require("../assets/images/pointsIcon.png")}
          style={styles.pointsIcon}
        />
        <Text style={styles.pointsText}>{POINTS}</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          onPress={() => setIsMenuOpen((is) => !is)}
          style={[
            styles.accountContainer,
            {
              borderBottomLeftRadius: isMenuOpen ? 0 : 6,
              borderBottomRightRadius: isMenuOpen ? 0 : 6,
            },
          ]}
        >
          <Text style={styles.menuText}>{isGuest ? "Guest" : USERNAME}</Text>
          <AntDesign name="down" size={13} color={colors.blue} />
        </TouchableOpacity>
        {isMenuOpen && isGuest && (
          <View style={styles.menu}>
            <Pressable>
              <Text style={styles.menuText}>Sign Up</Text>
            </Pressable>
          </View>
        )}
        {isMenuOpen && !isGuest && (
          <View style={styles.menu}>
            <Pressable>
              <Text style={styles.menuText}>Account details</Text>
            </Pressable>
            <Pressable>
              <Text style={styles.menuText}>Log out</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  pointsIcon: {
    width: 20,
    height: 20,
  },
  pointsText: {
    color: colors.black,
    fontSize: 10,
    fontWeight: "600",
  },
  menuContainer: {
    width: "60%",
    position: "relative",
  },
  accountContainer: {
    height: 45,
    borderRadius: 6,
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  menuText: {
    color: colors.black,
    fontWeight: "500",
  },
  menu: {
    position: "absolute",
    top: 45,
    backgroundColor: colors.white,
    width: "100%",
    padding: 10,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  },
});
