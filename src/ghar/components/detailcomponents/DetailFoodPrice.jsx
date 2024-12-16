import { useState, useEffect } from "react";
import { Text, Divider } from "@ui-kitten/components";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import { useTheme } from "@ui-kitten/components";

export default function DetailFoodPrice({ property }) {
  const theme = useTheme();

  const [currentFoodPrices, setCurrentFoodPrices] = useState(
    property.foodPrices
  );

  useEffect(() => {
    if (property.foodPrices !== currentFoodPrices) {
      setCurrentFoodPrices(property.foodPrices);
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
        Foods and Prices
      </Text>
      {currentFoodPrices && currentFoodPrices.length > 0 ? (
        <>
          <Divider style={styles.divider} />
          <View
            style={[
              styles.defaultMarginVertical,
              { flexDirection: "row", marginHorizontal: 10 },
            ]}
          >
            <Text category={"c1"} style={styles.layeredText}>
              SN No.
            </Text>
            <Text category={"c1"} style={styles.layeredText}>
              Food Type
            </Text>
            <Text category={"c1"} style={styles.availableText}>
              Detail
            </Text>
            <Text category={"c1"} style={styles.layeredText}>
              Price
            </Text>
          </View>
          <View style={[styles.container, styles.defaultMarginVertical]}>
            {currentFoodPrices.map((i) => (
              <View key={i.codeNo.toString()}>
                <Divider style={styles.divider} />
                <View
                  style={[
                    styles.defaultMarginVertical,
                    { flexDirection: "row" },
                  ]}
                >
                  <Text category={"c1"} style={styles.layeredText}>
                    {i.codeNo}:
                  </Text>
                  <Text category={"c1"} style={styles.layeredText}>
                    {i.food}
                  </Text>

                  <Text category={"c1"} style={styles.availableText}>
                    {i.details}
                  </Text>
                  <Text category={"c1"} style={styles.layeredText}>
                    {i?.price ? `Rs.${i.price.toLocaleString("en-US")}` : "N/A"}
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
