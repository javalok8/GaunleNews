import { StyleSheet, View } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import { MaterialIcons } from "@expo/vector-icons";
import ServicesList from "../ServicesList";

export default function AboutSection({ property }) {
  const theme = useTheme();
  if (property.about)
    return (
      <>
        <Text
          category={"h5"}
          style={[styles.header, { color: theme["color-primary-500"] }]}
        >
          About
        </Text>
        {property?.name ? (
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons color={"#36454f"} size={24} name="apartment" />

            <Text category={"h6"} style={styles.apartmentText}>
              {property?.name}
            </Text>
          </View>
        ) : null}
        <Text category={"c1"} style={styles.description}>
          {property.about}
        </Text>
        <>
          {/* Other services  */}
          <View style={styles.row}>
            <MaterialIcons
              name="star-outline"
              size={26}
              color={theme["color-primary-500"]}
            />
            <Text
              category={"h6"}
              style={[
                styles.otherServiceText,
                { color: theme["color-primary-500"] },
              ]}
            >
              Other Services
            </Text>
          </View>

          <View style={styles.bulletListContainer}>
            <ServicesList data={property.features} />
          </View>
        </>
      </>
    );

  return null;
}

const styles = StyleSheet.create({
  header: { marginBottom: 15, marginTop: 10 },
  apartmentText: { paddingLeft: 10, marginBottom: 10, color: "darkgray" },
  description: {
    fontSize: 14,
    color: "#555",
    letterSpacing: 0.6,
    lineHeight: 20,
  },
  otherServiceText: {
    paddingLeft: 10,
  },
  row: {
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
  },
  bulletListContainer: {
    paddingHorizontal: 5,
  },
});
