import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
const { width, height } = Dimensions.get("screen").width;

const BreakingNews = ({ breakingNews }) => {
  const navigation = useNavigation();
  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get("screen").width;
  const [activeIndex, setActiveIndex] = useState(0);

  /**
   *
   * =========================== METHOD TO AUTO SLIDE SCROLL ===========================
   *
   */
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === breakingNews.length - 1) {
        flatlistRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatlistRef.current.scrollToIndex({
          index: activeIndex + 1,
          animation: true,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  });
  /**
   *
   * =========================== END OF METHOD ===========================
   *
   */

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });

  /**
   *
   *
   * =========================== METHOD TO RENDER ITEM INSIDE FLATLIST ===========================
   *
   */
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("NewsDetail", { item })}
      >
        <View key={index} style={styles.itemWrapper}>
          <Image
            source={{ uri: item.image_url }}
            style={{ height: 200, width: screenWidth, borderRadius: 20 }}
          />
          <LinearGradient
            style={styles.background}
            colors={["transparent", "#rgba(0, 0, 0, 0.8)"]}
          >
            <View style={styles.sourceInfo}>
              {item.source_icon && (
                <Image
                  source={{ uri: item.source_icon }}
                  style={styles.sourceIcon}
                />
              )}
              <Text style={styles.sourceName}>{item.source_name}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };
  /**
   *
   *
   * =========================== END OF METHOD ===========================
   *
   */

  // Handle Scroll
  const handleScroll = (event) => {
    // Get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    // Get the index of current active item

    const index = scrollPosition / screenWidth;

    // Update the index

    setActiveIndex(index);
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return breakingNews.map((dot, index) => {
      // if the active index === index

      if (activeIndex === index) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "red",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 6,
            }}
          ></View>
        );
      } else {
        return (
          <View
            key={index}
            style={{
              backgroundColor: "#262626",
              height: 10,
              width: 10,
              borderRadius: 5,
              marginHorizontal: 5,
            }}
          ></View>
        );
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.breakingNewsTitle}>Breaking News</Text>
      <FlatList
        data={breakingNews}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item, index) => index}
        horizontal={true}
        pagingEnabled={true}
        onScroll={handleScroll}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {renderDotIndicators()}
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  breakingNewsTitle: {
    color: "#333",
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "600",
  },
  dotIndicator: {
    backgroundColor: "red",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },
  dotIndicatorView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dotIndicatorActive: {
    backgroundColor: "green",
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 6,
  },

  /**
   * for item list
   */
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width,
    height: 200,
    borderRadius: 30,
  },
  background: {
    position: "absolute",
    width: width,
    height: 200,
    borderRadius: 25,
    left: 0,
    right: 0,
    top: 0,
    padding: 20,
  },
  sourceIcon: {
    height: 25,
    width: 25,
    borderRadius: 20,
  },
  sourceInfo: {
    flexDirection: "row",
    position: "absolute",
    top: 85,
    paddingHorizontal: 20,
    alignItems: "center",
    gap: 10,
  },
  sourceName: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },

  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
    position: "absolute",
    top: 120,
    paddingHorizontal: 20,
  },
});
