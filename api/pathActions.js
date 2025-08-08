import { supabase } from "./supabase";

export const getFreePlans = async () => {
  const { data, error } = await supabase
    .from("paths")
    .select("*")
    .eq("is_free", true);

  return data;
};

export const getPremiumPlans = async () => {
  const { data, error } = await supabase
    .from("paths")
    .select("*")
    .eq("is_free", false);

  return data;
};

export const getUserActivePath = async () => {
  const { data, error } = await supabase
    .from("user_paths")
    .select("path_id")
    .lt("day_num", 8);

  if (data.length > 0) {
    return data[0]["path_id"];
  } else {
    return 0;
  }
};

export const userStartedPath = async (pathId) => {
  const { data, error } = await supabase
    .from("user_paths")
    .select("*")
    .eq("path_id", pathId);

  if (data.length > 0) {
    return true;
  }

  return false;
};

export const getUserPathDay = async (pathId) => {
  const { data, error } = await supabase
    .from("user_paths")
    .select("day_num")
    .eq("path_id", pathId);

  if (data) {
    return data[0]["day_num"];
  }
};

export const startUserPath = async (pathId) => {
  await supabase.from("user_paths").insert({ path_id: pathId });
};

export const getPath = async (pathId, dayNum) => {
  const { data } = await supabase
    .from("path_days")
    .select("*")
    .eq("path_num", +pathId)
    .eq("day_num", +dayNum);

  if (data) {
    return data;
  }
};

export const getNumActivePaths = async () => {
  const { data } = await supabase
    .from("user_paths")
    .select("id")
    .neq("day_num", 8);

  if (data) {
    return data.length;
  } else {
    return 0;
  }
};

export const getNumCompletedPaths = async () => {
  const { data } = await supabase
    .from("user_paths")
    .select("id")
    .eq("day_num", 8);

  if (data) {
    return data.length;
  } else {
    return 0;
  }
};

export const updateDayNum = async (pathId, newDayNum) => {
  await supabase
    .from("user_paths")
    .update({ day_num: newDayNum })
    .eq("path_id", pathId);
};

export const getDayText = async (dayNum) => {
  const { data } = await supabase
    .from("forest_days")
    .select("*")
    .eq("day_num", dayNum);

  if (data) {
    return data;
  } else {
    return null;
  }
};
