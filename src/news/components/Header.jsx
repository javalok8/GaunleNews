import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.styleInfo}>
        <Image
          source={require("../../assets/namaste.png")}
          style={styles.image}
        />
        <View style={{ gab: 10, marginLeft: 10 }}>
          <Text style={styles.welcomeStyle}>Welcome</Text>
          <Text style={styles.nameStyle}>Lokendra</Text>
        </View>
      </View>
      <Ionicons
        name="notifications-outline"
        size={24}
        color="black"
        style={styles.notificationIcon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  image: {
    width: 50, // Adjust the size
    height: 50, // Must match width for a perfect circle
    borderRadius: 50, // Half of the width/height for a circle
  },
  notificationIcon: {
    position: "absolute",
    top: 0,
    right: 10,
  },
  styleInfo: {
    flexDirection: "row",
    alignItems: "center",
    gab: 10,
  },
  welcomeStyle: {
    fontWeight: "700",
    fontSize: 12,
    color: "darkgray",
  },
  nameStyle: {
    fontSize: 16,
    color: "black",
  },
});
