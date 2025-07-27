import { View, Text, StyleSheet, TextInput } from "react-native";
import AuthButton from "./AuthButton";
import TermsAndConditionsText from "./TermsAndConditionsText";

import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const RecoverPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        We sent an email{" "}
        <Text style={styles.smallHeadingText}>
          with the instructions to recover your credentials
        </Text>
      </Text>
      <Text style={styles.instructionsText}>
        Once you resolve this issue, we suggest you try to sign in again.
      </Text>

      <AuthButton isSubmitting={isSubmitting} onPress={handleContinue}>
        Go to Sign In or Sign Up
      </AuthButton>

      <TermsAndConditionsText />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  headingText: {
    color: "#0164a5",
    fontFamily: "Inter",
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
  },
  smallHeadingText: {
    fontSize: 18,
    fontWeight: 300,
  },
  usernameInput: {
    flexDirection: "row",
    padding: 8,
    paddingLeft: 22,
    alignItems: "center",
    gap: 20,
    borderRadius: 6,
    borderColor: "#ffeb94",
    borderWidth: 2,
    backgroundColor: "#00000008",
    marginTop: 5,
    width: "100%",
    height: 55,
  },
  atContainer: {
    width: 55,
    height: 55,
    backgroundColor: "#ffeb94",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  atText: {
    fontSize: 30,
    color: "#0164a5",
  },
  inputNameText: {
    marginTop: 13,
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 24,
  },
  instructionsText: {
    marginVertical: 5,
    textAlign: "center",
  },
});

export default RecoverPassword;
