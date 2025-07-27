import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import SignInSignUpForm from "../components/AuthComponents/SignInSignUpForm";
import SignUpForm from "../components/AuthComponents/SignUpForm";
import SignInForm from "../components/AuthComponents/SignInForm";
import ForgotPasswordForm from "../components/AuthComponents/ForgotPasswordForm";
import RecoverPassword from "../components/AuthComponents/RecoverPassword";

const SignIn = ({ route }) => {
  const { type } = route?.params || "";

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <View style={styles.loginContainer}>
          {!type && <SignInSignUpForm />}
          {type === "signUp" && <SignUpForm />}
          {type === "signIn" && <SignInForm />}
          {type === "forgotPassword" && <ForgotPasswordForm />}
          {type === "recoverPassword" && <RecoverPassword />}
        </View>
      </ImageBackground>
    </View>
  );
};

const deviceWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    marginTop: 15,
    width: "100%",
    maxWidth: 500,
  },
});

export default SignIn;
