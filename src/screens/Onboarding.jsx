import { StyleSheet, View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import IonIcons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

//for locally store key-value pair data
import { saveData, getData, clearData } from "../utils/storageUtils";
//for vibrate button
import * as Haptics from "expo-haptics";

export default function Onboarding() {
  const navigation = useNavigation();

  /**
   *
   * ============================ CODE FOR CHECKING LOCAL DATA FOR SET STORAGE ===============================
   *
   */
  const [isLocalData, setIsLocalData] = useState(false);
  useEffect(() => {
    const checkLocalData = async () => {
      const email = await getData("email");
      const pass = await getData("password");
      setIsLocalData(email ? true : false);
    };
    checkLocalData();
  }, []);
  /**
   *
   * ============================ CHECKING LOCAL DATA CODE ENDED ===============================
   *
   */

  /**
   *
   * ============================ CODE FOR ONBOARDING SLIDER ===============================
   *
   */
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

  /**
   *
   * ============================ CODE FOR ONBOARDING SLIDER ENDED ===============================
   *
   */

  const _renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        <View style={styles.imageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.text}</Text>
        </View>
      </View>
    );
  };

  const _renderNextButton = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    return (
      <View style={styles.buttonCircle}>
        <IonIcons
          name="arrow-forward-outline"
          color="rgba(255,255,255, .9 )"
          size={24}
        />
      </View>
    );
  };

  const _renderDoneButton = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    return (
      <View style={styles.buttonCircle}>
        <IonIcons
          name="checkmark-circle-outline"
          color="rgba(255,255,255, .9 )"
          size={24}
        />
      </View>
    );
  };

  const _renderSkipButton = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    return (
      <View style={styles.skipView}>
        <Text style={styles.skipTextColor}>Skip</Text>
      </View>
    );
  };

  const _onEndReached = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    //get credentials from local storage
    if (isLocalData) {
      navigation.navigate("Tab");
    } else {
      navigation.navigate("Tab");
    }
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

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "flex-end",
    paddingStart: "8%",
    paddingRight: "8%",
  },
  title: {
    color: "#182952",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageContainer: {
    flex: 3,
    justifyContent: "center",
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  textContainer: {
    flex: 1,
    justifyContent: "flex-start",
    paddingStart: "8%",
    paddingRight: "8%",
  },

  text: {
    textAlign: "center",
    fontWeight: "bold",
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  skipTextColor: {
    color: "#062743",
    fontWeight: "bold",
  },
  skipView: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
