import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const SearchingBar = ({ withHorizontalPadding, setSearchQuery }) => {
  return (
    <View
      style={[
        styles.container,
        withHorizontalPadding && { paddingHorizontal: 20 },
      ]}
    >
      <View style={styles.searchBar}>
        <Ionicons name="search-outline" size={24} color="lightgray" />
        <TextInput
          placeholder="Search"
          style={styles.searchText}
          autoCapitalize="none"
          onChangeText={(query) => setSearchQuery(query)}
        />
      </View>
    </View>
  );
};

export default SearchingBar;

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 20,
    marginTop: 20,
  },
  searchBar: {
    backgroundColor: "#E4E4E4",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 15,
    flexDirection: "row",
    gap: 10,
  },
  searchText: {
    color: "darkgray",
    fontSize: 16,
    flex: 1,
  },
});
