import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Loading from "../../news/components/Loading";
import Card from "../../ghar/components/Card";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HEADERHEIGHT, LISTMARGIN } from "../constants/Constants";
import { useTheme } from "@ui-kitten/components";

export default function SavedScreen() {
  const navigation = useNavigation();
  const { top: safeTop } = useSafeAreaInsets();
  const theme = useTheme();
  const [bookmarkHome, setBookmarkHome] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isFocused = useIsFocused();

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

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Favorite",
    });
    // getBookmarkNews();
  }, [isFocused]);
  const [scrollAnimation] = useState(new Animated.Value(0));

  const onPressCard = (id) => {
    navigation.navigate("HomeDetailScreen", { id });
  };

  return (
    <View style={styles.container}>
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
        contentContainerStyle={{}}
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
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: LISTMARGIN,
    marginVertical: 5,
  },
});
