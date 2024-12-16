import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";

import { useTheme } from "@ui-kitten/components";
import Stars from "../components/Stars";

const getScoreText = (score) => {
  if (score >= 4) return "Great";
  if (score < 4 && score >= 3) return "Good";
  if (score < 3 && score >= 2) return "Average";
  if (score < 2 && score >= 1) return "Below Average";
  if (score === 0) return "No Reviews Yet";
  return "Bad";
};

const getRenterReviewText = (num) => {
  if (num === 0) return "";
  if (num === 1) return `${num} Renter Review`;
  return `${num} Renters Review`;
};

export default function OverallReviewScoreCard({
  score,
  numberOfReviews,
  style,
}) {
  const theme = useTheme();
  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.row,
          styles.smallMarginVertical,
          { flexDirection: "row" },
        ]}
      >
        <Text category={"s1"} style={styles.scoreText}>
          {getScoreText(score)}
        </Text>
        {/* to show stars in a row */}
        <Stars score={score} />
      </View>
      <View style={[styles.row, { flexDirection: "row" }]}>
        <Text category={"s1"}>{`${score} Blended Score`}</Text>
        <Text category={"h4"}>{score}</Text>
      </View>
      <View
        style={[
          styles.row,
          styles.smallMarginVertical,
          { flexDirection: "row" },
        ]}
      >
        <Text category={"c1"}>{getRenterReviewText(numberOfReviews)}</Text>
        {numberOfReviews === 0 ? null : <Text category={"c1"}>Out of 5</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#d3d3d3",
    width: "100%",
  },
  row: { justifyContent: "space-between", alignItems: "center" },
  scoreText: { color: "#427B01" },
  smallMarginVertical: { marginVertical: 5 },
});
