import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Notification({ route }) {
  const { item } = route.params;

  console.log("===========Lokendra Item in detail : image is :" + item.image);
  console.log("===========Lokendra Item in detail : image is :" + item.title);
  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    textAlign: "center",
  },
});
