import {
  StyleSheet,
  View,
  ImageBackground,
  StatusBar,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { Video } from "expo-av";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();

  const hideSplashScreen = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      hideSplashScreen();
      // navigation.navigate("HomeTabs");
      navigation.navigate("Onboarding");
    }, 7000);
  }, []);

  const renderSplashScreen = () => {
    return (
      <View style={styles.MainContainer}>
        <StatusBar barStyle="light-content" />
        <Video
          // source={require("../../assets/videos/splash-video.mp4")} // Replace with your video URL or local file
          source={{
            uri: "https://cdn.pixabay.com/video/2024/09/14/231479_large.mp4",
          }}
          style={styles.video}
          resizeMode="cover"
          shouldPlay
          isLooping={true}
        />
        {/* <ImageBackground
          source={require("../../assets/splash-image.jpg")}
          resizeMode="cover"
          style={styles.styleBackgroundImage}
        > */}
        <View style={styles.overlay}>
          <Animated.Text
            entering={FadeInUp.delay(2000).duration(1000)}
            style={styles.styleTitleText}
          >
            गाउँले खबर
          </Animated.Text>
          <Animated.Text
            entering={FadeInDown.delay(3000).duration(1000)}
            style={styles.styleDescriptionText}
          >
            ग्रामीण समाचार बाट तपाईंको फिडमा सीधा ताजा समाचार र व्यक्तिगत
            अद्यावधिकहरू प्राप्त गर्नुहोस्
            {/* Get breaking news and personalized updates direct to your feed from
            Gaunle News */}
          </Animated.Text>
        </View>
        {/* </ImageBackground> */}
      </View>
    );
  };

  return (
    <View style={styles.MainContainer}>
      {isVisible ? renderSplashScreen() : null}
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  styleBackgroundImage: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center", // Centers text vertically
    alignItems: "center", // Centers text horizontally
    paddingHorizontal: 30,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Adds a semi-transparent background for better text visibility
  },
  styleTextWrapper: {
    flex: 1,
    color: "white",
    justifyContent: "flex-end",
    paddingBottom: 50,
    paddingHorizontal: 30,
    gap: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  styleTitleText: {
    color: "white",
    fontSize: 24,
    fontWeight: "800",
    letterSpacing: 1.5,
    lineHeight: 250,
    textAlign: "center",
  },
  styleDescriptionText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 1.5,
    lineHeight: 40,
    textAlign: "center",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});
