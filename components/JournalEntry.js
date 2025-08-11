import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { format } from "date-fns";

import { colors } from "../constants/colors";

export default function JournalEntry({ title, content, date }) {
  const [isShortened, setIsShortened] = useState(content.length > 30);
  const [isExpanded, setIsExpanded] = useState(false);

  const shortenedContent = isShortened ? content.slice(0, 30) + "..." : content;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      <Text style={styles.contentText}>
        {isExpanded ? content : shortenedContent}
      </Text>
      {isShortened && !isExpanded && (
        <TouchableOpacity onPress={() => setIsExpanded(true)}>
          <Text style={styles.readMoreText}>Read More</Text>
        </TouchableOpacity>
      )}
      {isShortened && isExpanded && (
        <TouchableOpacity onPress={() => setIsExpanded(false)}>
          <Text style={styles.readMoreText}>Read Less</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.dateText}>
        Saved on {format(date, "MMM do, yyyy")}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.yellow,
    padding: 20,
    borderRadius: 6,
    gap: 10,
  },
  titleText: {
    color: colors.blue,
    fontSize: 20,
  },
  contentText: {
    color: colors.black,
    fontSize: 16,
  },
  dateText: {
    color: "#22251180",
  },
  readMoreText: {
    color: colors.blue,
    fontWeight: "500",
  },
});
