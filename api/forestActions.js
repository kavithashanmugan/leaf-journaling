import { supabase } from "./supabase";

export const getForestDay = async (dayNum) => {
  const { data } = await supabase
    .from("forest_days")
    .select("*")
    .eq("day_num", dayNum);

  if (data) {
    return data;
  } else {
    return [];
  }
};
