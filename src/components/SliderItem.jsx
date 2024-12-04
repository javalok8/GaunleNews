import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { transform } from "@babel/core";

const { width, height } = Dimensions.get("screen");

const SliderItem = (sliderItem, index, scrollX) => {
  console.log(
    "==========================================================================="
  );
  console.log(
    "============== lokendra slider image: ",
    sliderItem.item.image_url
  );
  console.log(
    "============== lokendra slider artical id : ",
    sliderItem.item.article_id
  );
  console.log(
    "============== lokendra slider title.item: ",
    sliderItem.item.title
  );
  console.log(
    "============== lokendra slider title.item: ",
    sliderItem.item.description
  );
  console.log(
    "==========================================================================="
  );
  return (
    <View style={styles.itemWrapper} key={sliderItem.item.artical_id}>
      <Image source={{ uri: sliderItem.item.image_url }} style={styles.image} />
      <LinearGradient
        colors={["transparent", "#rgba(0, 0, 0, 0.8)"]}
        style={styles.background}
      >
        <View style={styles.sourceInfo}>
          {sliderItem.item.source_icon && (
            <Image
              source={{ uri: sliderItem.item.source_icon }}
              style={styles.sourceIcon}
            />
          )}
          <Text style={styles.sourceName}>{sliderItem.item.source_name}</Text>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {sliderItem.item.title}
        </Text>
      </LinearGradient>

      {/* <Text style={styles.description}>{sliderItem.item.description}</Text> */}
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  itemWrapper: {
    position: "relative",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width - 60,
    height: 180,
    borderRadius: 20,
  },
  background: {
    position: "absolute",
    width: width - 60,
    height: 180,
    borderRadius: 20,
    left: 30,
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
  description: {
    color: "white",
  },
});
