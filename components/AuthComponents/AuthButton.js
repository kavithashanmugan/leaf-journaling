import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

const AuthButton = ({ isSubmitting, children, ...props }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          borderColor: isSubmitting ? "#ffca35" : "#ffeb94",
          backgroundColor: isSubmitting ? "#f6ffbd" : "#ffeb94",
        },
      ]}
      {...props}
    >
      <Text style={styles.buttonText}>
        {isSubmitting ? <ActivityIndicator /> : children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    borderWidth: 1,
    marginTop: 10,
  },
  buttonText: {
    color: "#0A64A5",
    textAlign: "center",
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "500",
  },
});

export default AuthButton;
