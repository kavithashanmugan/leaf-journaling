import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Button,
  ActivityIndicator,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import { colors } from "../constants/colors";
import { useNavigation } from "@react-navigation/native";

const API_URL = "https://poetrydb.org/";

export default function Search() {
  const [searchBy, setSearchBy] = useState("Author name");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPoem, setSelectedPoem] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    setIsFetching(true);

    let searchByType;
    switch (searchBy) {
      case "A line from a poem":
        searchByType = "lines";
        break;
      case "Author name":
        searchByType = "author";
        break;
      case "Poem title":
        searchByType = "title";
        break;
    }

    const response = await fetch(
      `${API_URL}${searchByType}/${searchTerm}/title`
    );
    const titles = await response.json();
    const selectedTitle =
      titles[Math.floor(Math.random() * titles.length)].title;

    const poemResponse = await fetch(
      `${API_URL}title/${selectedTitle}/lines.json`
    );
    const poem = await poemResponse.json();
    setSelectedPoem(poem.lines);

    const authorResponse = await fetch(
      `${API_URL}title/${selectedTitle}/author`
    );
    const author = await authorResponse.json();
    setSelectedAuthor(author.author);

    const titleResponse = await fetch(`${API_URL}title/${selectedTitle}/title`);
    const title = await titleResponse.json();
    setSelectedTitle(title.title);

    setIsFetching(false);

    navigation.navigate("Journal", {
      poem: poem[0].lines,
      author: author[0].author,
      title: title[0].title,
    });
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <Entypo name="magnifying-glass" size={20} color={colors.blue} />
        <TextInput
          placeholder="Search..."
          onChangeText={setSearchTerm}
          style={{ flex: 1 }}
        />
      </View>
      <TouchableOpacity
        onPress={() => setIsDropdownOpen((is) => !is)}
        style={styles.dropdown}
      >
        <Text style={styles.chosenSearchMethod}>{searchBy}</Text>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={18}
          color={colors.blue}
          style={{
            transform: `rotate(${isDropdownOpen ? "180deg" : "0deg"})`,
          }}
        />
      </TouchableOpacity>
      {isDropdownOpen && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            onPress={() => {
              setSearchBy("Author name");
              setIsDropdownOpen(false);
            }}
          >
            <Text>Author name</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSearchBy("A line from a poem");
              setIsDropdownOpen(false);
            }}
          >
            <Text>A line from a poem</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSearchBy("Poem title");
              setIsDropdownOpen(false);
            }}
          >
            <Text>Poem title</Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.searchButton} onPress={handleSubmit}>
        <Text style={styles.searchButtonText}>
          {isFetching ? <ActivityIndicator /> : "Search for poems"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    margin: 15,
  },
  searchInputContainer: {
    height: 40,
    flexDirection: "row",
    gap: 10,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  dropdown: {
    marginTop: 10,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    position: "relative",
  },
  chosenSearchMethod: {
    color: colors.blue,
    fontWeight: "700",
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 20,
    position: "absolute",
    width: "100%",
    top: 80,
    zIndex: 10,
  },
  searchButton: {
    backgroundColor: colors.blue,
    width: "100%",
    height: 40,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
