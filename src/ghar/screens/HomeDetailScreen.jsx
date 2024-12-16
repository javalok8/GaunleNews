import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";
import { Text, Button, Divider } from "@ui-kitten/components";
import React, { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageCarouselForDetail from "../components/ImageCarouselForDetail";
import DetailHeader from "../components/detailcomponents/DetailHeader";
import DetailPricing from "../components/detailcomponents/DetailPricing";
import DetailAbout from "../components/detailcomponents/DetailAbout";
import DetailFoodPrice from "../components/detailcomponents/DetailFoodPrice";
import DetailReview from "../components/detailcomponents/DetailReview";

export default function HomeDetailScreen({ route }) {
  const navigation = useNavigation();
  const { top: safeTop } = useSafeAreaInsets();
  const { id } = route.params;

  console.log("======== lokendra id in detail screen is : " + id);

  const property = [
    {
      ID: 1,
      unitType: "multiple",
      images: [
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3FID%3DOIP.P4DMJbCaao_dpIs5dCb6IgHaLH%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.iE7mcw3w2aFFDhXP9A1lggHaE8%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.sN1pVaQ7SMfmzIydnPSKcgHaH1%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Q5Eunmn9ENDDwvQPZBCRdwHaE7%26pid%3DApi&f=1",
        "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Oe74GIp-Ini-tIVYe0bH6wHaE7%26pid%3DApi&f=1",
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
      lat: 25.80913,
      lng: -80.186363,
      pets: [
        {
          type: "Dog",
          allowed: true,
          details: "Some breed restrictions",
          limit: 2,
          fee: 25,
          deposit: 100,
          rent: 50,
        },
        {
          type: "Cat",
          allowed: true,
          details: "Some breed restrictions",
          limit: 2,
          fee: 25,
          deposit: 100,
          rent: 50,
        },
      ],
      foodPrices: [
        {
          codeNo: 100,
          food: "Saada/Normal",
          details: "Rice , Daal , Curry , Chutney , 2 rotis",
          price: 150,
        },
        {
          codeNo: 101,
          food: "Rice With Mutton",
          details: "Rice ,Daal , Mutton ",
          price: 350,
        },
        {
          codeNo: 102,
          food: "Rice with Chicken",
          details: "Rice , Daal , Curry , Chicken , 2 rotis",
          price: 300,
        },
        {
          codeNo: 103,
          food: "Rice with Fish",
          details: "Rice , Daal , Curry , Fish ",
          price: 450,
        },
      ],
      apartments: [
        {
          CreatedAt: "2022-05-09T19:27:23.084252-05:00",
          DeletedAt: null,
          ID: 1,
          UpdatedAt: "2022-05-09T19:28:03.572996-05:00",
          bathrooms: 2,
          bedrooms: 2,
          images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/1/0"],
          propertyID: 1,
          rent: 4524,
          sqFt: 1404,
          unit: "0204",
        },
        {
          CreatedAt: "2022-05-09T20:26:32.877701-05:00",
          DeletedAt: null,
          ID: 2,
          UpdatedAt: "2022-05-09T20:26:38.80651-05:00",
          bathrooms: 1.5,
          bedrooms: 1,
          images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/2/0"],
          propertyID: 1,
          rent: 3750,
          sqFt: 1036,
          unit: "0201",
        },
        {
          CreatedAt: "2022-05-09T20:40:15.232309-05:00",
          DeletedAt: null,
          ID: 3,
          UpdatedAt: "2022-05-09T20:40:22.450926-05:00",
          bathrooms: 1,
          bedrooms: 0,
          images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/3/0"],
          propertyID: 1,
          rent: 3250,
          sqFt: 800,
          unit: "0100",
        },
        {
          CreatedAt: "2022-05-09T20:40:59.063726-05:00",
          DeletedAt: null,
          ID: 4,
          UpdatedAt: "2022-05-09T20:41:04.850414-05:00",
          bathrooms: 0.5,
          bedrooms: 0,
          images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/4/0"],
          propertyID: 1,
          rent: 3000,
          sqFt: 500,
          unit: "0101",
        },
        {
          CreatedAt: "2022-05-09T20:41:31.523136-05:00",
          DeletedAt: null,
          ID: 5,
          UpdatedAt: "2022-05-09T20:41:37.877753-05:00",
          bathrooms: 1.5,
          bedrooms: 3,
          images: ["https://apartmentstut.s3.us-east-2.amazonaws.com/1/5/0"],
          propertyID: 1,
          rent: 4000,
          sqFt: 1300,
          unit: "0308",
        },
      ],
      features: [
        "Studio, 1 Bedroom, and 2 Bedroom and Bathroom Apartments",
        "Amazing Views of Downtown Miami",
        "14 Private Offices",
        "40 Meeting Tables",
        "Flaming Kitchen",
        "Balcony Views Of 4th Street Se",
        "Spa",
        "Views Of The Amenities Deck",
        "Underground Parking",
      ],
      phoneNumber: "12334556757",
      website: "www.jeremypersing.com",
      scores: [
        { type: "Walk", description: "Very Walkable", score: 73 },
        { type: "Bike", description: "Very Bikeable", score: 72 },
      ],
      stars: 4.2,
      reviews: [
        {
          body: "The building itself was great. Surrounding streets, however, were constantly loud, torn up, inaccessible, dangerous, and full of construction debris essentially for the entire two plus years I lived there. Constant sirens, thumping, vibrations, jackhammers, etc. was intolerable. Weekend evenings sirens were non-stop.",
          CreatedAt: "2022-05-09T21:56:18.422866-05:00",
          ID: 1,
          propertyID: 1,
          stars: 3,
          title: "Neither here nor there",
          userID: 1,
          DeletedAt: null,
          UpdatedAt: null,
        },
        {
          body: "The building itself was great. Surrounding streets, however, were constantly loud, torn up, inaccessible, dangerous, and full of construction debris essentially for the entire two plus years I lived there. Constant sirens, thumping, vibrations, jackhammers, etc. was intolerable. Weekend evenings sirens were non-stop.",
          CreatedAt: "2022-05-09T21:56:18.422866-05:00",
          ID: 1,
          propertyID: 1,
          stars: 5,
          title: "Neither here nor there",
          userID: 1,
          DeletedAt: null,
          UpdatedAt: null,
        },
        {
          body: "The building itself was great. Surrounding streets, however, were constantly loud, torn up, inaccessible, dangerous, and full of construction debris essentially for the entire two plus years I lived there. Constant sirens, thumping, vibrations, jackhammers, etc. was intolerable. Weekend evenings sirens were non-stop.",
          CreatedAt: "2022-05-09T21:56:18.422866-05:00",
          ID: 1,
          propertyID: 1,
          stars: 5,
          title: "Neither here nor there",
          userID: 1,
          DeletedAt: null,
          UpdatedAt: null,
        },
        {
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum id venenatis a condimentum vitae sapien pellentesque. Sed ullamcorper morbi tincidunt ornare massa eget egestas. Porta non pulvinar neque laoreet. Egestas dui id ornare arcu odio ut sem. Ut eu sem integer vitae. Lorem sed risus ultricies tristique nulla. Neque viverra justo nec ultrices dui sapien eget. Tempus quam pellentesque nec nam aliquam. Mattis pellentesque id nibh tortor id aliquet. Egestas integer eget aliquet nibh praesent tristique magna. Nisl vel pretium lectus quam. Semper feugiat nibh sed pulvinar proin gravida hendrerit. Gravida quis blandit turpis cursus in hac habitasse. Et sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque. At lectus urna duis convallis convallis tellus id interdum.Lorem donec massa sapien faucibus et molestie. Enim nunc faucibus a pellentesque. Mus mauris vitae ultricies leo integer malesuada. Mi tempus imperdiet nulla malesuada pellentesque. Massa eget egestas purus viverra accumsan in nisl nisi scelerisque. Non consectetur a erat nam. Venenatis cras sed felis eget velit aliquet sagittis. Eget lorem dolor sed viverra ipsum nunc. Augue neque gravida in fermentum et sollicitudin ac orci phasellus. Sed euismod nisi porta lorem mollis aliquam ut porttitor. Dolor sit amet consectetur adipiscing elit duis tristique sollicitudin nibh. Blandit aliquam etiam erat velit. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Vel eros donec ac odio tempor orci dapibus ultrices in.",
          CreatedAt: "2022-05-21T21:56:18.422866-05:00",
          ID: 2,
          propertyID: 1,
          stars: 5,
          title: "Staff is great",
          userID: 2,
          DeletedAt: null,
          UpdatedAt: null,
        },
        {
          body: "Downtown has crime concerns, and it is expensive because of that, but it's a good place.",
          CreatedAt: "2022-06-09T21:56:18.422866-05:00",
          ID: 3,
          propertyID: 1,
          stars: 5,
          title: "Downtown has crime",
          userID: 3,
          DeletedAt: null,
          UpdatedAt: null,
        },
        {
          body: "I really appreciate the amenities and particularly how responsive maintenance is when they break down.",
          CreatedAt: "2022-07-09T21:56:18.422866-05:00",
          ID: 2,
          propertyID: 1,
          stars: 4,
          title: "I really appreciate",
          userID: 2,
          DeletedAt: null,
          UpdatedAt: null,
        },
      ],
    },
  ];

  useEffect(() => {
    // Dynamically set header options
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
      ),
      title: "",
    });
  }, []);
  return (
    <View>
      <FlatList
        data={property}
        keyExtractor={(item) => item.ID.toString()}
        renderItem={({ item }) => (
          <>
            {item.images ? (
              <ImageCarouselForDetail
                images={item.images}
                indexShown
                imageStyle={styles.image}
              />
            ) : null}
            <View style={styles.contentContainer}>
              <DetailHeader property={item} />
              <Divider style={styles.divider} />
              <DetailAbout property={item} />
              <Divider style={styles.divider} />
              <DetailPricing property={item} />
              <Divider style={styles.divider} />
              <DetailFoodPrice property={item} />
              <Divider style={styles.divider} />
              <DetailReview property={item} />
              <Divider style={styles.divider} />
              {/*
              //map also if possible
              <ReviewSection property={item} />
              <Divider style={styles.divider} /> */}
            </View>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: 250,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
  },
  contentContainer: {
    marginHorizontal: 10,
  },
  divider: {
    backgroundColor: "#d3d3d3",
    marginTop: 10,
  },
});
