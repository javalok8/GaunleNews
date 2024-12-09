import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Loading from "./Loading";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export const NewsItem = ({ item, index }) => {
  return (
    <View key={index} style={styles.itemContainer}>
      <Image source={{ uri: item.image_url }} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.itemText}>{item.title}</Text>
        <View style={styles.itemSourceInfo}>
          <Image
            source={{ uri: item.source_icon }}
            style={styles.itemSourceIcon}
          />
          <Text style={styles.itemSourceName}>{item.source_name}</Text>
        </View>
      </View>
    </View>
  );
};

export default function NewsList({ newsList }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {newsList.length == 0 ? (
        <Loading size={"large"} />
      ) : (
        newsList.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("NewsDetail", { item })}
          >
            <NewsItem item={item} index={index} />
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 50,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
    gap: 10,
  },
  itemImage: {
    width: 90,
    height: 100,
    borderRadius: 20,
    marginRight: 10,
  },
  itemInfo: {
    flex: 1,
    gap: 10,
    justifyContent: "space-between",
  },
  category: {
    fontSize: 12,
    color: "#666",
    textTransform: "capitalize",
  },
  itemText: {
    fontSize: "12",
    fontWeight: "600",
    color: "black",
  },
  itemSourceInfo: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  itemSourceIcon: {
    width: 25,
    height: 25,
    borderRadius: 25,
  },

  itemSourceName: {
    fontSize: 10,
    fontWeight: 400,
    color: "#666",
  },
});
