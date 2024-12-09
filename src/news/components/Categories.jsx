import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
//for vibrate button
import * as Haptics from "expo-haptics";
import newsCategoryList from "../constants/Categories";

export default function Categories({ onCategoryChanged }) {
  const scrollRef = useRef(null);
  const itemRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelectCategory = (index) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const selected = itemRef.current[index];
    setActiveIndex(index);
    selected?.measure((x) => {
      scrollRef.current?.scrollTo({
        x: x - 20,
        y: 0,
        animated: true,
      });
    });

    //this will get the slug from list
    //if you want to get title then you can do ------
    //---------  onCategoryChanged(newsCategoryList[index].title);
    onCategoryChanged(newsCategoryList[index].slug);
  };

  return (
    <View>
      <Text style={styles.trendingNewsText}>Trending News</Text>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.itemWrapper}
      >
        {newsCategoryList.map((item, index) => (
          <TouchableOpacity
            ref={(el) => (itemRef.current[index] = el)}
            key={index}
            style={[styles.item, activeIndex === index && styles.itemActive]}
            onPress={() => handleSelectCategory(index)}
          >
            <Text
              style={[
                styles.itemText,
                activeIndex === index && styles.itemTextActive,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  trendingNewsText: {
    marginHorizontal: 20,
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  itemWrapper: {
    gap: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  item: {
    borderWidth: 1,
    borderColor: "#666",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
  itemText: {
    fontSize: 14,
    color: "#666",
    letterSpacing: "0.5",
  },
  itemActive: {
    backgroundColor: "#FF4C4C",
    borderColor: "#FF4C4C",
  },
  itemTextActive: {
    fontWeight: "600",
    color: "white",
  },
});
