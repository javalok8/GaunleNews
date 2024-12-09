import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import SearchingBar from "../components/SearchingBar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CheckBox from "../components/CheckBox";
import { useNewsCategories } from "../../hooks/useNewsCategories";
import { useNewsCountries } from "../../hooks/useNewsCountries";
import { useNavigation } from "@react-navigation/native";

export default function Discover({ route }) {
  //const { item } = route.params;
  const { top: safeTop } = useSafeAreaInsets();

  const navigation = useNavigation();

  const { categories, toggleNewsCategory } = useNewsCategories();
  const { countries, toggleNewsCountry } = useNewsCountries();

  //for query
  const [searchQuery, setSearchQuery] = useState(" ");
  const [category, setCategory] = useState(" ");
  const [country, setCountry] = useState(" ");

  return (
    <View style={[styles.container, { paddingTop: safeTop + 20 }]}>
      <SearchingBar setSearchQuery={setSearchQuery} />
      <Text style={styles.titleCategory}>Categories</Text>
      <View style={styles.listContainer}>
        {categories.map((item) => (
          <CheckBox
            key={item.id}
            label={item.title}
            checked={item.selected}
            onPress={() => {
              toggleNewsCategory(item.id);
              setCategory(item.slug);
            }}
          />
        ))}
      </View>
      <Text style={styles.titleCategory}>Countries</Text>
      <View style={styles.listContainer}>
        {countries.map((item, index) => (
          <CheckBox
            key={index}
            label={item.name}
            checked={item.selected}
            onPress={() => {
              toggleNewsCountry(index);
              setCountry(item.code);
            }}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.searchBtn}
        onPress={() =>
          navigation.navigate("SearchNews", { searchQuery, category, country })
        }
      >
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleCategory: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    marginBottom: 10,
  },
  listContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  searchBtn: {
    backgroundColor: "#FF4C4C",
    alignItems: "center",
    padding: 14,
    borderRadius: 15,
    marginVertical: 10,
  },
  searchText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
