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

  if (data) {
    return data[0]["username"];
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
