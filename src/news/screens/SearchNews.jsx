import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import { NewsItem } from "../components/NewsList";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

export default function SearchNews({ route }) {
  const navigation = useNavigation();

  const { searchQuery, category, country } = route.params;

  const [searchNews, setSearchNews] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  console.log(
    "Lokendra Search Query value: ",
    searchQuery,
    " Category: ",
    category,
    " Country: ",
    country
  );

  const getSearchNews = async () => {
    try {
      let categoryString = "";
      let countryString = "";
      let queryString = "";
      if (category) {
        categoryString = `&category=${category}`;
      }
      if (country) {
        countryString = `&country=${country}`;
      }
      if (searchQuery) {
        queryString = `&q=${searchQuery}`;
      }

      const URL = `https://newsdata.io/api/1/news?apikey=pub_61159224d4587a387d6a2276b18050fcd1a0d&language=en&image=1&removeduplicate=1&size=10${categoryString}${countryString}${queryString}`;
      //const URL = `https://newsdata.io/api/1/news?apikey=pub_61159224d4587a387d6a2276b18050fcd1a0d&language=en&image=1&removeduplicate=1&size=10`;
      const response = await axios.get(URL);
      console.log("===Lokendra Search News: ", response.data.status);
      if (response && response.data) {
        setSearchNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Lokendra Error from URL: ", error);
    }
  };

  useEffect(() => {
    // Dynamically set header options
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
      ),
      title: "Search",
    });

    //method to get searching news
    getSearchNews();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <FlatList
          data={searchNews}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("NewsDetail", { item })}
            >
              <NewsItem item={item} index={index} />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
  },
});
