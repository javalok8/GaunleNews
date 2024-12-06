import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import SearchingBar from "../components/SearchingBar";
import BreakingNews from "../components/BreakingNews";

export default function NewsDashboard() {
  const { top: safeTop } = useSafeAreaInsets();
  //breaking news state
  const [breakingNews, setBreakingNews] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const getBreakingNews = async () => {
    try {
      const URL =
        "https://newsdata.io/api/1/news?apikey=pub_61159224d4587a387d6a2276b18050fcd1a0d&country=ca&language=en&image=1&removeduplicate=1&size=5";
      const response = await axios.get(URL);
      console.log("===Lokendra Response Data: ", response.data.status);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Lokendra Error from URL: ", error);
    }
  };

  useEffect(() => {
    getBreakingNews();
  }, []);

  return (
    <View style={[styles.container, { marginTop: safeTop }]}>
      <Header />
      <SearchingBar />
      {isLoading ? (
        <ActivityIndicator size="large" color="black" />
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
