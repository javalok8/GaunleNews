import { View, StyleSheet, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { ServicesDot } from "./ServicesDot";

export default function ServicesList({ data, heading, style }) {
  let rows = [];

  for (let i = 0; i < data.length; i++) {
    let component;
    if (data.length - i >= 2) {
      component = (
        <View style={styles.mainRow}>
          <View style={styles.secondaryRow}>
            <ServicesDot style={styles.blackDot} />
            <Text category={"c1"}>{data[i]}</Text>
          </View>
          <View style={styles.secondaryRow}>
            <ServicesDot style={styles.blackDot} />
            <Text category={"c1"}>{data[i + 1]}</Text>
          </View>
        </View>
      );
    } else {
      component = (
        <View style={styles.mainRow}>
          <View style={styles.secondaryRow}>
            <ServicesDot style={styles.blackDot} />
            <Text category={"c1"}>{data[i]}</Text>
          </View>
        </View>
      );
    }
    rows.push(component);
    i++;
  }

  return (
    <View style={[styles.container, style]}>
      {heading ? (
        <Text style={styles.heading} category={"s1"}>
          {heading}
        </Text>
      ) : null}
      {rows.map((item, index) => (
        <View key={index}>{item}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 5, paddingVertical: 10 },
  heading: { paddingVertical: 8 },
  mainRow: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  secondaryRow: {
    paddingVertical: 5,
    width: "45%",
    flexDirection: "row",
  },
  blackDot: { alignSelf: "flex-start" },
});
