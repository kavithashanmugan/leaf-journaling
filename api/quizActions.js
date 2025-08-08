import { format, subMonths } from "date-fns";

import { supabase } from "./supabase";
import { getUserId, getUsernameById } from "./userActions";

export const addQuizScores = async (correct, incorrect) => {
  await supabase.from("quiz_scores").insert({ correct, incorrect });
};

export const getDayQuizScores = async () => {
  const today = format(new Date(), "yyyy-MM-dd");

  const { data, error } = await supabase
    .from("quiz_scores")
    .select("user_id, date, correct");

  const filteredScores = data
    .filter((item) => item.date === today)
    .reduce((accumulator, current) => {
      const existingUser = accumulator.find(
        (item) => item["user_id"] === current["user_id"]
      );

      if (existingUser) {
        existingUser.points += current["correct"];
      } else {
        accumulator.push({
          user_id: current["user_id"],
          points: current["correct"],
        });
      }

      return accumulator;
    }, []);

  const scores = filteredScores
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  const topScores = [];

  for (let score of scores) {
    const username = await getUsernameById(score["user_id"]);
    topScores.push({ username, points: score.points });
  }

  return topScores;
};

export const getMonthQuizScores = async () => {
  const today = format(new Date(), "yyyy-MM-dd");
  const previousMonthDate = subMonths(today, 1);

  const { data, error } = await supabase
    .from("quiz_scores")
    .select("user_id, date, correct");

  const filteredScores = data
    .filter((item) => new Date(item.date) >= previousMonthDate)
    .reduce((accumulator, current) => {
      const existingUser = accumulator.find(
        (item) => item["user_id"] === current["user_id"]
      );

      if (existingUser) {
        existingUser.points += current["correct"];
      } else {
        accumulator.push({
          user_id: current["user_id"],
          points: current["correct"],
        });
      }

      return accumulator;
    }, []);

  const scores = filteredScores
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  const topScores = [];

  for (let score of scores) {
    const username = await getUsernameById(score["user_id"]);
    topScores.push({ username, points: score.points });
  }

  return topScores;
};

export const getAllTimeQuizScores = async () => {
  const { data, error } = await supabase
    .from("quiz_scores")
    .select("user_id, correct");

  const filteredScores = data.reduce((accumulator, current) => {
    const existingUser = accumulator.find(
      (item) => item["user_id"] === current["user_id"]
    );

    if (existingUser) {
      existingUser.points += current["correct"];
    } else {
      accumulator.push({
        user_id: current["user_id"],
        points: current["correct"],
      });
    }

    return accumulator;
  }, []);

  const scores = filteredScores
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

  const topScores = [];

  for (let score of scores) {
    const username = await getUsernameById(score["user_id"]);
    topScores.push({ username, points: score.points });
  }

  return topScores;
};

export const getTotalPercentage = async () => {
  const userId = await getUserId();
  const { data } = await supabase
    .from("quiz_scores")
    .select("correct, incorrect")
    .eq("user_id", userId);

  if (data.length > 0) {
    const totalCorrect = data.reduce((acc, cur) => acc + cur["correct"], 0);
    const totalQuestions = data.reduce(
      (acc, cur) => acc + cur["correct"] + cur["incorrect"],
      0
    );
    const percentage = Math.round((totalCorrect / totalQuestions) * 100);
    return `${percentage}%`;
  } else {
    return "-";
  }
};
