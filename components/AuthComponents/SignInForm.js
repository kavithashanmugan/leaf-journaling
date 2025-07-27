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
import passwordVisible from "../../assets/images/passwordVisible.png";
import passwordInvisible from "../../assets/images/passwordInvisible.png";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

const SignInForm = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation();

  const handleContinue = async () => {};

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Sign In</Text>
      <Text style={styles.inputNameText}>Password</Text>
      <View style={[styles.emailInput, styles.passwordInput]}>
        <TextInput
          placeholder="Enter your password"
          autoCapitalize="none"
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          value={password}
        />
        <TouchableOpacity onPress={() => setShowPassword((show) => !show)}>
          <Image
            source={showPassword ? passwordVisible : passwordInvisible}
            style={styles.passwordIcon}
          />
        </TouchableOpacity>
      </View>
      <AuthButton isSubmitting={isSubmitting} onPress={handleContinue}>
        Sign In
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
    borderColor: "#ffeb94",
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
  passwordInput: {
    justifyContent: "space-between",
  },
  passwordIcon: {
    width: 30,
    objectFit: "contain",
  },
});

export default SignInForm;
