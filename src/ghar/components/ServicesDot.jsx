import { View, StyleSheet, ViewStyle } from "react-native";

export const ServicesDot = ({ style }) => <View style={[styles.dot, style]} />;

const styles = StyleSheet.create({
  dot: {
    padding: 3,
    height: 3,
    marginTop: 7,
    backgroundColor: "black",
    borderRadius: 30,
    marginRight: 10,
  },
});
