import { useState, useEffect } from "react";
import { Text, Divider } from "@ui-kitten/components";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { useTheme } from "@ui-kitten/components";

export default function DetailPricing({ property }) {
  const theme = useTheme();

  const [currentApartments, setCurrentApartments] = useState(
    property.apartments
  );

  useEffect(() => {
    if (property.apartments !== currentApartments) {
      setCurrentApartments(property.apartments);
    }
  }, [property]);

  return (
    <>
      <Text
        category={"h5"}
        style={[
          styles.defaultMarginVertical,
          { color: theme["color-primary-500"] },
        ]}
      >
        Pricing & Rooms
      </Text>
      {currentApartments && currentApartments.length > 0 ? (
        <>
          <Divider style={styles.divider} />
          <View
            style={[
              styles.defaultMarginVertical,
              { flexDirection: "row", marginHorizontal: 10 },
            ]}
          >
            <Text category={"c1"} style={styles.layeredText}>
              Room No.
            </Text>
            <Text category={"c1"} style={styles.layeredText}>
              Price
            </Text>
            <Text category={"c1"} style={styles.layeredText}>
              Room Type
            </Text>
            <Text category={"c1"} style={styles.availableText}>
              Availability
            </Text>
          </View>
          <View style={[styles.container, styles.defaultMarginVertical]}>
            {currentApartments.map((i) => (
              <View key={i.ID.toString()}>
                <Divider style={styles.divider} />
                <View
                  style={[
                    styles.defaultMarginVertical,
                    { flexDirection: "row" },
                  ]}
                >
                  <Text category={"c1"} style={styles.layeredText}>
                    {i.unit}:
                  </Text>
                  <Text category={"c1"} style={styles.layeredText}>
                    {i?.rent ? `Rs.${i.rent.toLocaleString("en-US")}` : "N/A"}
                  </Text>
                  <Text category={"c1"} style={styles.layeredText}>
                    {i.sqFt.toLocaleString("en-US")}
                  </Text>
                  <Text category={"c1"} style={styles.availableText}>
                    {new Date(i.availableOn).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
            ;
          </View>
        </>
      ) : (
        <Text style={styles.apartmentLogisticsTitle}>No Apartments Listed</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  defaultMarginVertical: {
    marginVertical: 10,
  },
  container: {
    padding: 10,
    width: "100%",
    borderColor: "#d3d3d3",
    borderWidth: 1,
    borderRadius: 5,
  },
  apartmentLogisticsTitle: { fontSize: 16, fontWeight: "600" },
  availableNowContainer: {
    marginTop: 15,
    justifyContent: "space-between",
  },
  divider: {
    backgroundColor: "#d3d3d3",
    marginTop: 5,
  },
  layeredText: { width: "21%" },
  availableText: { width: "37%" },
});
