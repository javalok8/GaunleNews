import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";

export default function Post() {
  const video = React.useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <Text style={styles.title}>React Native Video Player</Text>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: "https://www.w3schools.com/html/mov_bbb.mp4", // Replace with your video URL
        }}
        useNativeControls
        resizeMode="contain"
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            status.isPlaying
              ? video.current.pauseAsync()
              : video.current.playAsync()
          }
        >
          <Text style={styles.buttonText}>
            {status.isPlaying ? "Pause" : "Play"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  video: {
    width: "100%",
    height: 100,
    backgroundColor: "black",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#6200ee",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});
