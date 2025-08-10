import { format, subDays } from "date-fns";
import { supabase } from "./supabase";
import { getUserId } from "./userActions";

export const storeJournalEntry = async (title, content) => {
  await supabase.from("journal_entries").insert({ title, content });
};

export const getStreak = async (userId) => {
  const { data } = await supabase
    .from("streak")
    .select("last_date, streak")
    .eq("user_id", userId);

  const today = new Date();
  const yesterday = subDays(today, 1);

  if (data.length > 0) {
    const last_journaled = new Date(data[0]["last_date"]);

    if (last_journaled >= yesterday) {
      return data[0]["streak"];
    } else {
      return 0;
    }
  } else {
    return 0;
  }
};

export const addToStreak = async (userId) => {
  const { data } = await supabase
    .from("streak")
    .select("last_date, streak")
    .eq("user_id", userId);

  const today = new Date();
  const yesterday = subDays(today, 1);
  const lastDate = format(today, "yyyy-MM-dd");

  if (data.length > 0) {
    const last_journaled = new Date(data["last_date"]);
    if (last_journaled == yesterday) {
      await supabase
        .from("streak")
        .update([{ last_date: lastDate, streak: data["streak"] + 1 }])
        .select()
        .eq("user_id", userId);
    } else {
      await supabase
        .from("streak")
        .update({ last_date: lastDate, streak: 1 })
        .eq("user_id", userId);
    }
  } else {
    await supabase
      .from("streak")
      .insert({ last_date: lastDate, streak: 1, user_id: userId });
  }
};

export const getLastJournaled = async (userId) => {
  const { data } = await supabase
    .from("journal_entries")
    .select("created_at")
    .eq("user_id", userId);

  return data[data.length - 1]["created_at"];
};

export const getAllJournalEntries = async () => {
  const userId = await getUserId();

  const { data } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("user_id", userId);

  return data;
};
