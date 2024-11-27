import { StyleSheet, View, Text, Image } from "react-native";
import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

//import styles
import { styles } from "../styles/OnboardingStyles";

export default function Onboarding() {
  const navigation = useNavigation();

  const slides = [
    {
      key: 1,
      title: "Title 1",
      text: "Description.\nSay something cool",
      image: require("../assets/onboarding/doodle_reading.png"),
      backgroundColor: "#59b2ab",
    },
    {
      key: 2,
      title: "Title 2",
      text: "Other cool stuff",
      image: require("../assets/onboarding/frontal_home.png"),
      backgroundColor: "#febe29",
    },
    {
      key: 3,
      title: "Rocket guy",
      text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
      image: require("../assets/onboarding/Giant Phone.png"),
      backgroundColor: "#22bcb5",
    },
    {
      key: 4,
      title: "लोकेन्द्र फगामी",
      text: "मेरो नाम लोकेन्द्र फगामी हो र म नारच्याङमा बस्छु\n\nमेरो नाम लोकेन्द्र फगामी हो र म नारच्याङमा बस्छु",
      image: require("../assets/onboarding/stting_on_floor.png"),
      backgroundColor: "#22bcb5",
    },
  ];

  const _renderItem = ({ item }) => {
    return (
      <View style={styles().slide}>
        <View style={styles().titleContainer}>
          <Text style={styles().title}>{item.title}</Text>
        </View>

        <View style={styles().imageContainer}>
          <Image source={item.image} style={styles().image} />
        </View>

        <View style={styles().textContainer}>
          <Text style={styles().text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const _renderNextButton = () => {
    return (
      <View style={styles().buttonCircle}>
        <IonIcons
          name="arrow-forward-outline"
          color="rgba(255,255,255, .9 )"
          size={24}
        />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View style={styles().buttonCircle}>
        <IonIcons
          name="md-checkmark"
          color="rgba(255,255,255, .9 )"
          size={24}
        />
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={styles().skipView}>
        <Text style={styles().skipTextColor}>Skip</Text>
      </View>
    );
  };

  const _onEndReached = () => {
    navigation.navigate("Login");
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={_renderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      onDone={_onEndReached}
      onSkip={_onEndReached}
      dotClickEnabled={true}
      showNextButton={true}
      showDoneButton={true}
      showSkipButton={true}
    />
  );
}
