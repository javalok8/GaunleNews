import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../components/Loading";
import Moment from "moment";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function NewsDetail({ route }) {
  const navigation = useNavigation();
  const { top: safeTop } = useSafeAreaInsets();
  const { item } = route.params;

  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [bookmark, setBookmark] = useState(false);

  const newsId = item.article_id;

  const getNews = async (newsId) => {
    try {
      const URL = `https://newsdata.io/api/1/news?apikey=pub_61159224d4587a387d6a2276b18050fcd1a0d&id=${newsId}`;
      const response = await axios.get(URL);
      console.log("===Lokendra Response Data by id: ", response.data.status);
      if (response && response.data) {
        setNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Lokendra Error from URL: ", error);
    }
  };

  /**
   *
   * method to bookmark news
   *
   */
  const bookmarkNews = async () => {
    setBookmark(true);
    await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((value) => value === newsId);
        if (data == null) {
          res.push(newsId);
          AsyncStorage.setItem("bookmark", JSON.stringify(res));
          alert("News Saved!");
        }
      } else {
        let bookmark = [];
        bookmark.push(newsId);
        AsyncStorage.setItem("bookmark", JSON.stringify(bookmark));
        alert("News Saved!");
      }
    });
  };

  const removeBookmarkNews = async () => {
    setBookmark(false);
    const bookmarks = await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      return res.filter((id) => id !== newsId);
    });
    await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
    alert("News Unsaved!");
  };

  const renderBookmarkNews = async () => {
    const bookmarks = await AsyncStorage.getItem("bookmark").then((token) => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find((value) => value === newsId);
        return data == null ? setBookmark(false) : setBookmark(true);
      }
    });
    await AsyncStorage.setItem("bookmark", JSON.stringify(bookmarks));
  };

  // Dynamically set header options
  navigation.setOptions({
    headerShown: true,
    headerLeft: () => (
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={22} />
      </TouchableOpacity>
    ),
    headerRight: () => (
      <TouchableOpacity
        onPress={() => {
          bookmark
            ? removeBookmarkNews(news[0].article_id)
            : bookmarkNews(news[0].article_id);
        }}
      >
        <Ionicons
          name={bookmark ? "heart" : "heart-outline"}
          size={22}
          color={bookmark ? "red" : "black"}
        />
      </TouchableOpacity>
    ),
    title: "",
  });

  useEffect(() => {
    if (!isLoading) {
      renderBookmarkNews();
    }
  }, [isLoading]);

  useEffect(() => {
    getNews(newsId);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading size="large" />
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        >
          <Text style={styles.title}>{news[0].title}</Text>
          <View style={styles.newsInfoWrapper}>
            <Text style={styles.newsInfo}>
              {Moment(news[0].pubDate).format("MMMM DD, hh:mm a")}
            </Text>
            <Text style={styles.newsInfo}>{news[0].source_name}</Text>
          </View>
          <Image
            source={{ uri: news[0].image_url }}
            style={styles.imageStyle}
          />
          <Text style={styles.description}>{news[0].description}</Text>
        </ScrollView>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  newsInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
    marginVertical: 10,
    letterSpacing: 0.6,
  },
  newsInfo: {
    fontSize: 14,
    color: "darkgray",
  },
  imageStyle: {
    width: "100%",
    height: 300,
    marginBottom: 12,
    borderRadius: 10,
  },
  description: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.8,
    lineHeight: 22,
  },
});
