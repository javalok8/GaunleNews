import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";

import Stars from "../components/Stars";
import { useTheme } from "@ui-kitten/components";
import TextMoreOrLess from "../components/TextMoreOrLess";

const getFormattedDate = (date) => {
  const dateStr = date.toDateString(); // Thu Mar 31 2022
  const dateArr = dateStr.split(" "); // ['Thu', 'Mar', '31', '2022']
  return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
};

export default function ReviewCard({ review, style }) {
  const theme = useTheme();
  return (
    <View style={[styles.container, style]}>
      <View style={[styles.row, { flexDirection: "row" }]}>
        <Stars score={review.stars} />
        <Text appearance={"hint"} category={"c1"}>
          {getFormattedDate(new Date(review.CreatedAt))}
        </Text>
      </View>
      <Text category={"s1"} style={styles.reviewTitle}>
        {review.title}
      </Text>
      <TextMoreOrLess initialLines={10}>{review.body}</TextMoreOrLess>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    borderRadius: 5,
    width: 300,
    padding: 10,
  },
  row: {
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewTitle: {
    fontWeight: "bold",
    marginBottom: 10,
    flexShrink: 1,
    textTransform: "capitalize",
  },
});
