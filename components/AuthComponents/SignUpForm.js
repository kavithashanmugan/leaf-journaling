import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import AuthButton from "./AuthButton";
import ForgotPasswordLink from "./ForgotPasswordLink";
import TermsAndConditionsText from "./TermsAndConditionsText";
import { useDispatch, useSelector } from "react-redux";
import passwordVisible from "../../assets/images/passwordVisible.png";
import passwordInvisible from "../../assets/images/passwordInvisible.png";
import { supabase } from "../../api/supabase";
import { useNavigation } from "@react-navigation/native";

const SignUpForm = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useDispatch();
  const storedEmail = useSelector((state) => state.user.emailAddress);
  const [email, setEmail] = useState(storedEmail);

  const [isUsernameEmpty, setIsUsernameEmpty] = useState(false);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);

  const navigation = useNavigation();

  const handleContinue = async () => {
    if (!username) {
      setIsUsernameEmpty(true);
      return;
    } else {
      setIsUsernameEmpty(false);
    }

    if (!password) {
      setIsPasswordEmpty(true);
      return;
    } else {
      setIsPasswordEmpty(false);
    }

    setIsSubmitting(true);

    try {
      const { data: emailData, error: emailError } = await supabase
        .from("profiles")
        .select("*")
        .eq("email", email);

      if (emailError && emailError.code !== "PGRST116") {
        throw error;
      }

      if (emailData.length > 0) {
        setEmailTaken(true);
        return;
      } else {
        setEmailTaken(false);
      }

      const { data: usernameData, error: usernameError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username);

      if (usernameData.length > 0) {
        setUsernameTaken(true);
        return;
      } else {
        setUsernameTaken(false);
      }

      const { data: signUpData, error: signUpError } =
        await supabase.auth.signUp({
          email: email,
          password: password,
        });

      if (signUpData) {
        const { data: addUserData, error: addUserError } = await supabase
          .from("profiles")
          .insert([{ email: email, username: username }])
          .select();

        navigation.navigate("Home");
      } else {
        throw Error;
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
      <Text style={styles.headingText}>Sign Up</Text>
      <Text style={styles.inputNameText}>Email Address</Text>
      <View
        style={[
          styles.emailInput,
          { borderColor: emailTaken ? "#850608" : "#ffeb94" },
        ]}
      >
        <TextInput
          placeholder="Enter your email address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={email}
          autoCorrect={false}
        />
      </View>
      {emailTaken && (
        <Text style={styles.errorText}>
          That email address is already in use
        </Text>
      )}
      <Text style={styles.inputNameText}>Username</Text>
      <View
        style={[
          styles.usernameInput,
          {
            borderColor:
              isUsernameEmpty || usernameTaken ? "#850608" : "#ffeb94",
          },
        ]}
      >
        <View style={styles.atContainer}>
          <Text style={styles.atText}>@</Text>
        </View>
        <TextInput
          placeholder="Enter your username"
          autoCapitalize="none"
          onChangeText={setUsername}
        />
      </View>
      {isUsernameEmpty && (
        <Text style={styles.errorText}>You must enter a username</Text>
      )}
      {usernameTaken && (
        <Text style={styles.errorText}>That username is already in use</Text>
      )}
      <Text style={styles.inputNameText}>Password</Text>
      <View
        style={[
          styles.emailInput,
          styles.passwordInput,
          { borderColor: isPasswordEmpty ? "#850608" : "#ffeb94" },
        ]}
      >
        <TextInput
          placeholder="Enter your password"
          autoCapitalize="none"
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword((show) => !show)}>
          <Image
            source={showPassword ? passwordVisible : passwordInvisible}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      </View>
      {isPasswordEmpty && (
        <Text style={styles.errorText}>You must enter a password</Text>
      )}
      <AuthButton isSubmitting={isSubmitting} onPress={handleContinue}>
        Sign Up
      </AuthButton>
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
  emailInput: {
    flexDirection: "row",
    padding: 8,
    paddingLeft: 22,
    alignItems: "center",
    gap: 20,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: "#00000030",
    marginTop: 5,
    width: "100%",
    height: 55,
  },
  usernameInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    borderRadius: 6,
    borderWidth: 2,
    backgroundColor: "#00000030",
    marginTop: 5,
    width: "100%",
    height: 55,
  },
  atContainer: {
    width: 55,
    height: 51,
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
  passwordInput: {
    justifyContent: "space-between",
  },
  passwordIcon: {
    width: 30,
    objectFit: "contain",
  },
  errorText: {
    color: "#850608",
    fontSize: 10,
  },
});

export default SignUpForm;
