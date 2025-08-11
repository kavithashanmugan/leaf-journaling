import { supabase } from "./supabase";

export const isUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (!data.user) return false;

  return true;
};

export const getUserId = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user.id;
};

export const getUsername = async () => {
  const userId = await getUserId();

  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("user_id", userId);

  if (data) {
    return data[0]["username"];
  } else {
    return null;
  }
};

export const getUsernameById = async (userId) => {
  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("user_id", userId);

  if (data.length > 0) {
    return data[0]["username"];
  } else {
    return null;
  }
};

export const getIdByUsername = async (username) => {
  const { data } = await supabase
    .from("profiles")
    .select("user_id")
    .eq("username", username);

  if (data.length > 0) {
    return data[0]["user_id"];
  } else {
    return null;
  }
};

export const getUserPoints = async () => {
  const userId = await getUserId();

  const { data } = await supabase
    .from("profiles")
    .select("points")
    .eq("user_id", userId);

  if (data) {
    return data[0]["points"];
  } else {
    return 0;
  }
};

export const addUserPoints = async (numExtraPoints) => {
  const userId = await getUserId();
  const existingPoints = await getUserPoints();
  const totalPoints = existingPoints + numExtraPoints;

  const { data } = await supabase
    .from("profiles")
    .update({ points: totalPoints })
    .eq("user_id", userId)
    .select();

  console.log(data);
};

export const friendRequestExists = async (userFrom, userTo) => {
  const { data } = await supabase
    .from("friends")
    .select("id")
    .eq("user_from", userFrom)
    .eq("user_to", userTo);

  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const addFriendRequest = async (userFrom, userTo) => {
  const { data } = await supabase
    .from("friends")
    .insert({ user_from: userFrom, user_to: userTo })
    .select();

  if (data.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const getFriendRequests = async () => {
  const userId = await getUserId();

  const { data } = await supabase
    .from("friends")
    .select("*")
    .eq("user_to", userId)
    .eq("user_to_agreed", false);

  if (data.length > 0) {
    return data;
  } else {
    return [];
  }
};

export const deleteFriendRequest = async (id) => {
  await supabase.from("friends").delete().eq("id", id);
};

export const acceptFriendRequest = async (id) => {
  await supabase.from("friends").update({ user_to_agreed: true }).eq("id", id);
};

export const getFriendsInitiatedByUser = async () => {
  const userId = await getUserId();

  const { data } = await supabase
    .from("friends")
    .select("user_to")
    .eq("user_from", userId)
    .eq("user_to_agreed", true);

  if (data) {
    return data;
  } else {
    return [];
  }
};

export const getFriendsInitiatedByOther = async () => {
  const userId = await getUserId();

  const { data } = await supabase
    .from("friends")
    .select("user_from")
    .eq("user_to", userId)
    .eq("user_to_agreed", true);

  if (data) {
    return data;
  } else {
    return [];
  }
};

export const addMasteryQuizItem = async (name, response) => {
  const userId = await getUserId();

  const { data } = await supabase.from("mastery_quiz").select("id");

  if (data.length > 0) {
    await supabase
      .from("mastery_quiz")
      .upsert({ id: data[0]["id"], [name]: response });
  } else {
    await supabase.from("mastery_quiz").insert({ [name]: response });
  }
};
