import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import SliderItem from "../components/SliderItem";
import Animated, {
  useSharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

const BreakingNews = ({ newsList }) => {
  const [data, setData] = useState(newsList);
  const [paginationIndex, setPaginationIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const ref = useAnimatedRef();
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.breakingNewsTitle}>Breaking News</Text>
      <View style={styles.slideWrapper}>
        <Animated.FlatList
          data={data}
          ref={ref}
          keyExtractor={(_, index) => `list_item${index}`}
          renderItem={({ item, index }) => (
            <SliderItem item={item} index={index} scrollX={scrollX} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          onScroll={onScrollHandler}
        />
      </View>
    </View>
  );
};

export default BreakingNews;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  breakingNewsTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  slideWrapper: {
    justifyContent: "center",
  },
});
