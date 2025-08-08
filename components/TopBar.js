import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../constants/colors";
import { useIsUser } from "../hooks/useIsUser";
import { getUsername, getUserPoints, isUser } from "../api/userActions";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { supabase } from "../api/supabase";

export default function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");

  const [isGuest, setIsGuest] = useState(true);

  const [points, setPoints] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      const isLoggedIn = await isUser();
      if (isLoggedIn) {
        setIsGuest(false);
        const user = await getUsername();
        setUsername(user);
        const numPoints = await getUserPoints();
        setPoints(numPoints);
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

  const handleLogout = async () => {
    let { error } = await supabase.auth.signOut();
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Image
          source={require("../assets/images/pointsIcon.png")}
          style={styles.pointsIcon}
        />
        <Text style={styles.pointsText}>{points}</Text>
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
          <Text style={[styles.menuText, styles.usernameText]}>
            {isGuest ? "Guest" : username}
          </Text>
          <AntDesign name="down" size={13} color={colors.blue} />
        </TouchableOpacity>
        {isMenuOpen && isGuest && (
          <View style={styles.menu}>
            <Pressable onPress={() => navigation.navigate("SignIn")}>
              <Text style={styles.menuText}>Log In/Sign Up</Text>
            </Pressable>
          </View>
        )}
        {isMenuOpen && !isGuest && (
          <View style={styles.menu}>
            <Pressable>
              <Text style={styles.menuText}>Account details</Text>
            </Pressable>
            <Pressable onPress={handleLogout}>
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
    width: 30,
    height: 30,
  },
  pointsText: {
    color: colors.black,
    fontSize: 16,
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
    zIndex: 2,
    gap: 20,
  },
  usernameText: {
    fontWeight: "700",
  },
});
