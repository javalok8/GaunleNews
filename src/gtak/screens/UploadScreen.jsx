import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import * as ImagePicker from "expo-image-picker";
import * as VideoThumbnails from "expo-video-thumbnails";
import { useNavigation } from "@react-navigation/native";

export default function UploadScreen() {
  const navigation = useNavigation();
  /**
   *
   * used to select video file from phone
   *
   */
  const selectVideoFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      // mediaTypes: ['images', 'videos'],
      mediaTypes: ["videos"],
      // mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.log("=======Lokendra======" + result.assets[0].uri);
      generateVideoThumbnail(result.assets[0].uri);
    }
  };

  /**
   *
   * user to generate thumbnail from selected video
   *
   */
  const generateVideoThumbnail = async (videoUri) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, {
        time: 15000,
      });
      console.log("===Lokendra Thumbnail Uri is :" + uri);
      navigation.navigate("PreviewScreen", {
        videoUri: videoUri,
        thumbnailUri: uri,
      });
    } catch (e) {
      console.warn(e);
    }
  };
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        flex: 1,
        // display: "flex",
      }}
    >
      <Image
        source={require("../../assets/movie-folder.png")}
        style={{ width: 140, height: 140 }}
      />
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginTop: 20,
          fontFamily: "outfit-bold",
        }}
      >
        Start Uploading Dance for Competition
      </Text>
      <Text
        style={{ textAlign: "center", marginTop: 10, fontFamily: "outfit" }}
      >
        Lets uplodate your dance and get selected for the competition and win
        price
      </Text>

      <TouchableOpacity
        onPress={selectVideoFile}
        style={{
          backgroundColor: "#3B3B3B",
          padding: 10,
          paddingHorizontal: 25,
          borderRadius: 99,
          marginTop: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontFamily: "outfit  ",
          }}
        >
          Select Video File
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
