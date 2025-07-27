import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const ForgotPasswordLink = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("SignIn", { type: "forgotPassword" })}
    >
      <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  forgotPasswordText: {
    color: "#22252d",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 500,
    textAlign: "center",
  },
});

export default ForgotPasswordLink;
