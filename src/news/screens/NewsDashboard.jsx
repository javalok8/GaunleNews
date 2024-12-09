import { StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../components/Header";
import SearchingBar from "../components/SearchingBar";
import BreakingNews from "../components/BreakingNews";
import Categories from "../components/Categories";
import NewsList from "../components/NewsList";
import Loading from "../components/Loading";

export default function NewsDashboard() {
  const { top: safeTop } = useSafeAreaInsets();
  //breaking news state
  const [breakingNews, setBreakingNews] = useState([{}]);
  const [news, setNews] = useState([{}]);
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
  //to get All the news
  const getNews = async (category = "") => {
    try {
      let categoryString = "";
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=pub_61159224d4587a387d6a2276b18050fcd1a0d&language=en&image=1&removeduplicate=1&size=10${categoryString}`;
      const response = await axios.get(URL);
      console.log("===Lokendra Get All News: ", response.data.status);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Lokendra Error from URL: ", error);
    }
  };

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  /**
   *  ============== method to change category
   *
   */
  const onCatChanged = (category) => {
    console.log("======= Lokendra Selected Category is : " + category);
    setNews([]);
    getNews(category);
  };

  return (
    <ScrollView style={[styles.container, { marginTop: safeTop }]}>
      <Header />
      <SearchingBar withHorizontalPadding={true} />
      {isLoading ? (
        <Loading size={"large"} color="black" />
      ) : (
        <BreakingNews breakingNews={breakingNews} />
      )}
      <Categories onCategoryChanged={onCatChanged} />
      {isLoading ? (
        <Loading size={"large"} color="black" />
      ) : (
        <NewsList newsList={news} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
