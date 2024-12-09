import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

export default function CheckBox({ label, checked, onPress }) {
  const rnAnimatedContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        checked ? "rgba(239, 142, 82, 0.1)" : "transparent",
        { duration: 150 }
      ),
      borderColor: withTiming(checked ? "#FF4C4C" : "black", { duration: 150 }),
      paddingLeft: 16,
      paddingRight: checked ? 10 : 16,
    };
  }, [checked]);
  const rnTextStyle = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(checked ? "#FF4C4C" : "black", { duration: 150 }),
    };
  }, [checked]);
  return (
    <Animated.View
      style={[rnAnimatedContainerStyle, styles.container]}
      onTouchEnd={onPress}
      layout={LinearTransition.springify().mass(0.8)}
    >
      <Animated.Text style={[styles.label, rnTextStyle]}>{label}</Animated.Text>
      {checked && (
        <Animated.View
          style={styles.iconWrapper}
          entering={FadeIn.duration(300)}
          exiting={FadeOut}
        >
          <AntDesign name="checkcircle" size={14} color="#FF4C4C" />
        </Animated.View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    paddingVertical: 8,
    borderColor: "black",
    borderRadius: 32,
  },
  label: {
    fontSize: 14,
    color: "black",
  },
  iconWrapper: {
    marginLeft: 8,
    height: 14,
    width: 14,
  },
});
