import {
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Text, Button } from "@ui-kitten/components";
import { useTheme } from "@ui-kitten/components";
import { theme } from "../../../theme";
import Entypo from "@expo/vector-icons/Entypo";
import { useEffect } from "react";

//get the width dimension
const WIDTH = Dimensions.get("screen").width - 10 * 2;

export default function Card({ property, onPressCard }) {
  //for flatList
  const flatListRef = useRef();
  const viewConfig = {
    itemVisiblePercentThreshold: 95,
  };

  const [activeIndex, setActiveIndex] = useState();
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });

  const getItemLayout = (data, index) => ({
    length: WIDTH,
    offset: WIDTH * index, // for first image - 300 * 0 = 0pixels, 300 * 1 = 300, 300*2 = 600
    index: index,
  });

  const handlePressLeft = () => {
    if (activeIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: activeIndex - 1 });
    } else {
      // Scroll to the last image if at the beginning
      flatListRef.current?.scrollToIndex({
        index: property.images.length - 1,
      });
    }
  };
  const handlePressRight = () => {
    if (activeIndex < property.images.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
    } else {
      // Scroll to the first image if at the end
      flatListRef.current?.scrollToIndex({ index: 0 });
    }
  };

  /**
   *
   * =========================== METHOD TO AUTO SLIDE SCROLL ===========================
   */
  useEffect(() => {
    let interval = setInterval(() => {
      if (activeIndex === property.images.length - 1) {
        flatListRef.current.scrollToIndex({
          index: 0,
          animation: true,
        });
      } else {
        flatListRef.current.scrollToIndex({
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

  const { top: safeTop } = useSafeAreaInsets();
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={() => onPressCard(property.id)}>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={property.images}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToAlignment="center"
          pagingEnabled
          viewabilityConfig={viewConfig}
          onViewableItemsChanged={onViewRef.current}
          getItemLayout={getItemLayout}
          renderItem={({ item, index }) => (
            <Image source={{ uri: item }} style={styles.imageStyle} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <TouchableOpacity
          style={styles.buttonLeftChevronStyle}
          onPress={() => {
            console.log("pressed left");
            onPress = handlePressLeft();
          }}
        >
          <Entypo name="chevron-left" size={45} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRightChevronStyle}
          onPress={() => {
            console.log("pressed right");
            handlePressRight();
          }}
        >
          <Entypo name="chevron-right" size={45} color="white" />
        </TouchableOpacity>
        <View style={styles.infoContainer}>
          <View style={styles.priceContainer}>
            <Text category="s1">
              ${property.rentLow} - ${property.rentHigh}
            </Text>
            <Ionicons
              name={"heart-outline"}
              size={22}
              color={theme["color-primary-500"]}
            />
          </View>
          <Text category="c1">
            {property.bedroomLow} - {property.bedroomHigh} Bedrooms
          </Text>
          <Text category="c1" style={{ margin: 5 }}>
            {property.name}
          </Text>
          <Text category="c1">{property.street}</Text>
          <Text category="c1">{property.city}</Text>
          <Text category="c1">{property.state}</Text>
          <Text category="c1">{property.zip}</Text>
          <Text category="c1" style={{ margin: 5 }}>
            {property.tags.map((tag, index) =>
              index === property.tags.length - 1 ? tag : `${tag},`
            )}
          </Text>
          <View style={styles.buttonContainerStyle}>
            <Button appearance="ghost" style={styles.buttonStyle} size="small">
              Email
            </Button>
            <Button
              appearance="primary"
              style={styles.buttonStyle}
              size="small"
            >
              Call
            </Button>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageStyle: {
    marginTop: 10,
    width: WIDTH,
    height: 225,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 7,
    borderTopLeftRadius: 7,
  },
  infoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  buttonStyle: {
    borderColor: theme["color-primary-500"],
    width: "49%",
    borderRadius: 10,
  },
  buttonLeftChevronStyle: {
    position: "absolute",
    top: 95,
    left: 5,
  },
  buttonRightChevronStyle: {
    position: "absolute",
    top: 95,
    right: 5,
  },
});
