import { View, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, useTheme } from "@ui-kitten/components";

export default function TouchableStarsContainer({
  stars,
  field,
  setStars,
  style,
}) {
  console.log("===== stars from Review Screen is: " + stars);
  console.log("===== setStars from Review Screen is: " + setStars);
  const theme = useTheme();
  const starText = ["poor", "ok", "good", "great", "excellent"];

  const starsComponent = [1, 2, 3, 4, 5].map((item, index) => {
    let name = "star-outline";
    if (index <= stars - 1) name = "star";

    return (
      <TouchableOpacity key={item} onPress={() => setStars(field, item)}>
        <MaterialCommunityIcons
          name={name}
          size={32}
          color={theme["color-primary-500"]}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={[styles.container, style]}>
      <View style={{ flexDirection: "row" }}>{starsComponent}</View>
      <Text category={"c1"}>{`This property is ${starText[stars - 1]}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: "#d3d3d3",
  },
});
