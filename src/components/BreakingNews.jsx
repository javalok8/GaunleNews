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

const BreakingNews = ({ newsList }) => {
  const navigation = useNavigation();
  const flatlistRef = useRef();
  // Get Dimesnions
  const screenWidth = Dimensions.get("screen").width;
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto Scroll
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === carouselData.length - 1) {
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

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });
  // Data for carousel
  const carouselData = [
    {
      id: "01",
      image: require("../assets/images/1.jpg"),
      title: "संसारको सबैभन्दा बुढो चरा, ७४ वर्षको उमेरमा पार्यो अण्डा",
      sourceName: "ESPN",
    },
    {
      id: "02",
      image: require("../assets/images/2.jpg"),
      title: "के राजीनामा दिँदैछन् एप्पलका सीईओले",
      sourceName: "Narchyang",
    },
    {
      id: "03",
      image: require("../assets/images/3.jpg"),
      title: "सोसल मिडियाको लत छ ? यसरी छुटाउनुहोस्” ",
      sourceName: "Shikha",
    },
    {
      id: "04",
      image: require("../assets/images/4.jpg"),
      title:
        "‘पुष्पा २’ बन्यो भारत र विश्वभर सर्वाधिक ओपनिङ गर्ने भारतीय फिल्म ",
      sourceName: "Histan",
    },
    {
      id: "05",
      image: require("../assets/images/5.jpg"),
      title: "रङ नम्बर : कति मासु खान्छौं भगवान् ! ",
      sourceName: "Doba",
    },
    {
      id: "06",
      image: require("../assets/images/6.jpg"),
      title: "एनपीएलमा शतक हान्ने पहिलो खेलाडी बने आन्द्रेस” ",
      sourceName: "Narchyang Lekha",
    },
  ];

  //  Display Images slider // UI
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Notification", { item })}
      >
        <View key={item.id} style={styles.itemWrapper}>
          <Image
            source={item.image}
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
              <Text style={styles.sourceName}>{item.sourceName}</Text>
            </View>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    );
  };

  // Handle Scroll
  const handleScroll = (event) => {
    // Get the scroll position
    const scrollPosition = event.nativeEvent.contentOffset.x;
    console.log({ scrollPosition });
    // Get the index of current active item

    const index = scrollPosition / screenWidth;

    console.log({ index });
    // Update the index

    setActiveIndex(index);
  };

  // Render Dot Indicators
  const renderDotIndicators = () => {
    return carouselData.map((dot, index) => {
      // if the active index === index

      if (activeIndex === index) {
        return (
          <View
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
        data={carouselData}
        ref={flatlistRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
