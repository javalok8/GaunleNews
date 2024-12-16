import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  Animated,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "./Card";
import { Button, Divider, useTheme } from "@ui-kitten/components";
import { HEADERHEIGHT, LISTMARGIN } from "../constants/Constants";
import { Text } from "@ui-kitten/components";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Loading from "../../news/components/Loading";
import { useNavigation } from "@react-navigation/native";

//get the width dimension
const WIDTH = Dimensions.get("screen").width - 10 * 2;
export default function SearchScreen() {
  const navigation = useNavigation();
  const { top: safeTop } = useSafeAreaInsets();

  const theme = useTheme();

  const properties = [
    {
      id: 1,
      images: [
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3FID%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
      ],
      about:
        "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
      rentLow: 3750,
      rentHigh: 31054,
      bedroomLow: 1,
      bedroomHigh: 5,
      name: "The Hamilton",
      street: "555 NE 34th St",
      city: "Miami",
      state: "Florida",
      zip: 33137,
      tags: ["Parking"],
    },
    {
      id: 2,
      images: [
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3FID%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
      ],
      about:
        "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
      rentLow: 3750,
      rentHigh: 31054,
      bedroomLow: 1,
      bedroomHigh: 5,
      name: "The Hamilton",
      street: "555 NE 34th St",
      city: "Miami",
      state: "Florida",
      zip: 33137,
      tags: ["Parking"],
    },
    {
      id: 3,
      images: [
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3FID%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
      ],
      about:
        "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
      rentLow: 3750,
      rentHigh: 31054,
      bedroomLow: 1,
      bedroomHigh: 5,
      name: "The Hamilton",
      street: "555 NE 34th St",
      city: "Miami",
      state: "Florida",
      zip: 33137,
      tags: ["Parking"],
    },
    {
      id: 4,
      images: [
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Q5Eunmn9ENDDwvQPZBCRdwHaE7%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.sN1pVaQ7SMfmzIydnPSKcgHaH1%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Oe74GIp-Ini-tIVYe0bH6wHaE7%26pid%3DApi&f=1",
      ],
      about:
        "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
      rentLow: 3750,
      rentHigh: 31054,
      bedroomLow: 1,
      bedroomHigh: 5,
      name: "Riverhouse at 11th",
      street: "1170 NW 11th St",
      city: "Miami",
      state: "Florida",
      zip: 33136,
      tags: ["Parking"],
    },
    {
      id: 5,
      images: [
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Q5Eunmn9ENDDwvQPZBCRdwHaE7%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.sN1pVaQ7SMfmzIydnPSKcgHaH1%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Oe74GIp-Ini-tIVYe0bH6wHaE7%26pid%3DApi&f=1",
      ],
      about:
        "At 7 West, urban apartment-life decadence extends beyond your front door. Elevate your lifestyle with gracious concierge services including packages and dry cleaning delivered straight to your door. Enjoy the fun and frequent resident activities like our weekly “Wake Up with Weidner” that includes a free breakfast and “Pizza Night.” Grab a slice, get to know your neighbors and make new friends. Get healthy in our state-of-the-art fitness center and achieve enlightenment in our calming yoga studio. Take advantage of the gorgeous resident lounge complete with kitchen and free wifi to relax, work and study. Challenge your neighbor to a billiards match in the game room, and entertain friends and family on the rooftop terrace or reserve the clubhouse for special occasions. You can also rest assured with controlled access to the building, an underground heated parking garage and a courtesy security patrol. We have furnished apartments available, and we’re a pet-friendly apartment community, complete with a “Yappy Hour” for residents and their dogs to mingle and make friends.",
      rentLow: 3750,
      rentHigh: 31054,
      bedroomLow: 1,
      bedroomHigh: 5,
      name: "Riverhouse at 11th",
      street: "1170 NW 11th St",
      city: "Miami",
      state: "Florida",
      zip: 33136,
      tags: ["Parking"],
    },
  ];

  //bookmark home-stay
  const [isLoading, setIsLoading] = useState(true);
  const [bookmark, setBookmarkHome] = useState(false);

  const [scrollAnimation] = useState(new Animated.Value(0));
  const [offsetAnimation] = useState(new Animated.Value(0));
  const [clampedScroll, setClampedScroll] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: "clamp",
        }),
        offsetAnimation
      ),
      0,
      1
    )
  );

  const navbarTranslate = clampedScroll.interpolate({
    inputRange: [0, HEADERHEIGHT],
    outputRange: [0, -HEADERHEIGHT],
    extrapolate: "clamp",
  });

  const filterButtons = [
    {
      iconName: "filter-variant",
      onPress: () => console.log("Filter Button Pressed"),
    },
    {
      label: "Price",
      onPress: () => console.log("Price Button Pressed"),
    },
    {
      label: "Move-In Date",
      onPress: () => console.log("FiMove-In Date Button Pressed"),
    },
    {
      label: "Pets",
      onPress: () => console.log("Pets Button Pressed"),
    },
  ];

  const onLayout = (event) => {
    let { height } = event.nativeEvent.layout;
    setClampedScroll(
      Animated.diffClamp(
        Animated.add(
          scrollAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: "clamp",
          }),
          offsetAnimation
        ),
        0,
        height
      )
    );
  };

  const onPressCard = (id) => {
    navigation.navigate("HomeDetailScreen", { id });
  };
  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.headerContainer,
          { transform: [{ translateY: navbarTranslate }] },
        ]}
        onLayout={onLayout}
      >
        <View style={{ marginHorizontal: 10 }}>
          <FlatList
            data={filterButtons}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 10 }}
            renderItem={({ item, index }) => {
              if (item.iconName) {
                return (
                  <Button
                    appearance={"ghost"}
                    style={{
                      borderRadius: 30,
                      borderColor: theme["color-gray"],
                      width: 48,
                      marginHorizontal: 3,
                    }}
                    onPress={item.onPress}
                    accessoryLeft={
                      <MaterialCommunityIcons
                        name={item.iconName}
                        size={20}
                        color={theme["color-primary-500"]}
                      />
                    }
                  ></Button>
                );
              }
              return (
                <Button
                  appearance={"ghost"}
                  style={{
                    borderRadius: 30,
                    borderColor: theme["color-gray"],
                    marginHorizontal: 3,
                  }}
                  onPress={item.onPress}
                >
                  <Text>{item.label}</Text>
                </Button>
              );
            }}
          />
        </View>
      </Animated.View>

      {/* this is for animated card flat list */}
      <Animated.FlatList
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{ paddingTop: HEADERHEIGHT - 20 }}
        bounces={false}
        scrollEventThrottle={16}
        data={properties}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card property={item} onPressCard={onPressCard} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 1000,
    height: HEADERHEIGHT,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: LISTMARGIN,
    marginVertical: 5,
  },
  row: {
    alignItems: "center",
  },
  logisticsButtonText: {
    color: "#6BADF6",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
