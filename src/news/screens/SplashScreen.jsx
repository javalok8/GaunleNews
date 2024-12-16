import { StyleSheet, View, ImageBackground, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();

  const hideSplashScreen = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      hideSplashScreen();
      navigation.navigate("HomeTabs");
      // navigation.navigate("Onboarding");
    }, 1000);
  }, []);

  const renderSplashScreen = () => {
    return (
      <View style={styles.MainContainer}>
        <StatusBar barStyle="light-content" />
        <ImageBackground
          source={require("../../assets/splash-image.jpg")}
          resizeMode="cover"
          style={styles.styleBackgroundImage}
        >
          <View style={styles.styleTextWrapper}>
            <Animated.Text
              entering={FadeInUp.delay(2000).duration(1000)}
              style={styles.styleTitleText}
            >
              Gaunle News
            </Animated.Text>
            <Animated.Text
              entering={FadeInDown.delay(3000).duration(1000)}
              style={styles.styleDescriptionText}
            >
              Get breaking news and personalized updates direct to your feed
              from Gaunle News
            </Animated.Text>
          </View>
        </ImageBackground>
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
});
