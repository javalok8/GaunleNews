import { StyleSheet, View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Platform } from "react-native";
export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const navigation = useNavigation();

  const hideSplashScreen = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    setTimeout(() => {
      hideSplashScreen();
      navigation.navigate("Onboarding");
    }, 1000);
  }, []);

  const renderSplashScreen = () => {
    return (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            source={require("../assets/splash_icon_dark.png")}
            style={{ width: 150, height: 150, resizeMode: "contain" }}
          />
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    backgroundColor: "#ffffff",
  },

  SplashScreen_RootView: {
    justifyContent: "center",
    flex: 1,
    margin: 10,
    position: "absolute",
    width: "100%",
    height: "100%",
  },

  SplashScreen_ChildView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});
