import {
  View,
  Text,
  Modal,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import AuthButton from "../components/AuthComponents/AuthButton";
import { colors } from "../constants/colors";
import { useState } from "react";

export default function AddFriendModal({
  modalVisible,
  setModalVisible,
  onAddFriend,
}) {
  const [usernameToAdd, setUsernameToAdd] = useState("");
  return (
    <Modal
      visible={modalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headingText}>
            Enter the username of the friend you want to add:
          </Text>
          <View style={[styles.usernameInput]}>
            <View style={styles.atContainer}>
              <Text style={styles.atText}>@</Text>
            </View>
            <TextInput
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={setUsernameToAdd}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                onAddFriend(usernameToAdd);
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    height: 40,
  },
  atContainer: {
    width: 40,
    height: 36,
    backgroundColor: "#ffeb94",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  atText: {
    fontSize: 20,
    color: "#0164a5",
  },
  textInput: {
    width: "90%",
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colors.yellow,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.blue,
  },
});
