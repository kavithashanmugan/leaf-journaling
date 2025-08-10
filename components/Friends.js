import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import AddFriendModal from "./AddFriendModal";
import {
  acceptFriendRequest,
  addFriendRequest,
  deleteFriendRequest,
  friendRequestExists,
  getFriendRequests,
  getFriendsInitiatedByOther,
  getFriendsInitiatedByUser,
  getIdByUsername,
  getUserId,
} from "../api/userActions";
import Toast from "react-native-toast-message";
import FriendRequest from "./FriendRequest";
import Friend from "./Friend";

export default function Friends() {
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsByUser, setFriendsByUser] = useState([]);
  const [friendsByOther, setFriendsByOther] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFriendRequests();
      setFriendRequests(data);

      const friendsInitiatedByUser = await getFriendsInitiatedByUser();
      setFriendsByUser(friendsInitiatedByUser);

      const friendsInitiatedByOther = await getFriendsInitiatedByOther();
      setFriendsByOther(friendsInitiatedByOther);
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

  const handleAddFriend = async (usernameToAdd) => {
    try {
      const userToId = await getIdByUsername(usernameToAdd);

      if (!userToId) {
        return Alert.alert(
          "Sorry, we couldn't find any users with that username"
        );
      }

      const userFromId = await getUserId();

      // if (userToId === userFromId) {
      //   return Alert.alert("You can't send yourself a friend request!");
      // }

      const alreadyRequested = await friendRequestExists(userFromId, userToId);
      const alreadyBeenAsked = await friendRequestExists(userToId, userFromId);

      if (alreadyRequested || alreadyBeenAsked) {
        return Alert.alert("Sorry, this friend request already exists");
      }

      const friendAdded = await addFriendRequest(userFromId, userToId);
      if (friendAdded) {
        return Alert.alert("Friend request sent");
      } else {
        throw Error();
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, something went wrong",
        text2: "Maybe try again later",
      });
    }
  };

  const handleDeleteRequests = async (id) => {
    await deleteFriendRequest(id);
    setFriendRequests((prevState) =>
      prevState.filter((friend) => friend.id !== id)
    );
  };

  const handleAcceptRequests = async (id) => {
    await acceptFriendRequest(id);
    setFriendRequests((prevState) =>
      prevState.filter((friend) => friend.id !== id)
    );
  };

  return (
    <>
      <View style={styles.container}>
        {friendRequests.length > 0 && (
          <View style={styles.requestsContainer}>
            {friendRequests.map((friendRequest) => (
              <FriendRequest
                key={friendRequest.id}
                friend={friendRequest}
                onDeleteRequest={handleDeleteRequests}
                onAcceptRequest={handleAcceptRequests}
              />
            ))}
          </View>
        )}
        {friendsByUser.length > 0 && (
          <View style={styles.requestsContainer}>
            {friendsByUser.map((friend) => (
              <Friend key={friend["user_to"]} friendId={friend["user_to"]} />
            ))}
            {friendsByOther.map((friend) => (
              <Friend
                key={friend["user_from"]}
                friendId={friend["user_from"]}
              />
            ))}
          </View>
        )}
        <TouchableOpacity
          onPress={() => setShowAddFriendModal(true)}
          style={styles.addFriendContainer}
        >
          <Image
            source={require("../assets/images/add-friend.png")}
            style={styles.addFriendIcon}
          />
          <Text style={styles.addFriendText}>Add a Friend</Text>
        </TouchableOpacity>
      </View>
      <AddFriendModal
        modalVisible={showAddFriendModal}
        setModalVisible={setShowAddFriendModal}
        onAddFriend={handleAddFriend}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
  },
  addFriendContainer: {
    alignItems: "center",
    gap: 5,
  },
  addFriendIcon: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  addFriendText: {
    textAlign: "center",
    fontWeight: "700",
  },
  requestsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 15,
  },
});
