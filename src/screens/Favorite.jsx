import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loading from "../components/Loading";
import { NewsItem } from "../components/NewsList";
import { useIsFocused } from "@react-navigation/native";

export default function Favorite({ navigation }) {
  const [bookmarkNews, setBookmarkNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

  const getBookmarkNews = async () => {
    await AsyncStorage.getItem("bookmark").then(async (token) => {
      const res = JSON.parse(token);
      setIsLoading(true);
      if (res) {
        console.log("==========Lokendra Bookmark News : ", res);
        let query_string = res.join(",");
        console.log("Lokendra Query_String is : ", query_string);
        const URL = `https://newsdata.io/api/1/news?apikey=pub_61159224d4587a387d6a2276b18050fcd1a0d&id=${query_string}`;
        console.log("URL is : ", URL);
        const response = await axios.get(URL);
        setBookmarkNews(response.data.results);
        setIsLoading(false);
      } else {
        setBookmarkNews([]);
        setIsLoading(false);
      }
    });
  };

  navigation.setOptions({
    headerShown: true,
    title: "Favorite",
  });

  useEffect(() => {
    getBookmarkNews();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <FlatList
          data={bookmarkNews}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => navigation.navigate("NewsDetail", { item })}
            >
              <NewsItem item={item} index={item.id} />
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
  },
});
