import React from "react";
import { useState } from "react";
import { Share, View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

export default function DetailHeader({ property }) {
  const theme = useTheme();
  return (
    <>
      {property.name ? (
        <Text category={"h5"} style={styles.defaultMarginTop}>
          {property.name}
        </Text>
      ) : null}
      <View style={[styles.containerRow, styles.defaultMarginTop]}>
        <View>
          <Text category={"c1"}>{property.street}</Text>
          <Text category={"c1"}>{`${property.city}, ${property.zip}`}</Text>
        </View>
        <View style={styles.iconRow}>
          <MaterialIcons
            onPress={async () => {}}
            name="call"
            size={30}
            color={theme["color-primary-500"]}
            style={styles.callAndMessageIcon}
          />
          <MaterialCommunityIcons
            onPress={() => console.log("Home liked")}
            name={"message"}
            size={30}
            color={theme["color-primary-500"]}
            style={styles.callAndMessageIcon}
          />
          <MaterialCommunityIcons
            onPress={() => console.log("Home liked")}
            name={property?.liked ? "heart" : "heart-outline"}
            size={30}
            color={theme["color-primary-500"]}
            style={styles.likeIcon}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  defaultMarginVertical: { marginVertical: 10 },
  containerRow: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  iconRow: {
    paddingRight: 5,
    flexDirection: "row",
  },
  callAndMessageIcon: {
    marginRight: 20,
    marginTop: -4,
  },
  likeIcon: {
    marginTop: -4,
  },
  defaultMarginTop: { marginTop: 10 },
});
