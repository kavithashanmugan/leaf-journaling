import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";

import AuthButton from "./AuthButton";
import ForgotPasswordLink from "./ForgotPasswordLink";
import TermsAndConditionsText from "./TermsAndConditionsText";
import { supabase } from "../../api/supabase";
import { addEmail } from "../../store/userSlice";

const SignInSignUpForm = () => {
  const [email, setEmail] = useState("rachel@example.com");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation();

  const dispatch = useDispatch();

  const handleContinue = async () => {
    dispatch(addEmail(email));

    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      if (data) {
        // Email exists, redirect to sign-in page
        navigation.navigate("SignIn", { type: "signIn" });
      } else {
        // Email does not exist, redirect to sign-up page
        navigation.navigate("SignIn", { type: "signUp" });
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, something went wrong",
        text2: "Please try again in a few minutes",
      });
      console.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>
        Sign In <Text style={styles.smallHeadingText}>or</Text> Sign Up
      </Text>
      <Text style={styles.inputNameText}>Email Address</Text>
      <View style={styles.usernameInput}>
        <TextInput
          placeholder="Enter your email address"
          autoCapitalize="none"
          onChangeText={setEmail}
          autoCorrect={false}
          value={email}
        />
      </View>

      <AuthButton isSubmitting={isSubmitting} onPress={handleContinue}>
        Continue
      </AuthButton>
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.beginText}>Explore as a Guest</Text>
        <Image
          source={require("../../assets/images/right-arrow.png")}
          style={styles.arrow}
        />
      </TouchableOpacity>
      <ForgotPasswordLink />
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
    backgroundColor: "#00000030",
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
  rowContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  beginText: {
    color: "#0a64a5",
    fontFamily: "Inter",
    fontWeight: 500,
    fontSize: 18,
  },
  arrow: {
    width: 50,
    objectFit: "contain",
  },
});

export default SignInSignUpForm;
