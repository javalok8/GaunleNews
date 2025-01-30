import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Post from "../components/Post";

export default function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Post />
    </View>
  );
}

const styles = StyleSheet.create({});
