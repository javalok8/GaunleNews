import {
  Button,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function PreviewScreen() {
  const navigation = useNavigation();
  const params = useRoute().params;

  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(params);
  }, []);

  const publishHandler = () => {};
  return (
    <KeyboardAvoidingView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView style={{ padding: 20 }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            display: "flex",
            alignItems: "center",
            marginLeft: 10,
            marginTop: 15,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={44} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text style={{ fontSize: 20, fontFamily: "#3B3B3B" }}>
            Add Details
          </Text>
          <Image
            source={{ uri: params?.thumbnailUri }}
            style={{ width: 300, height: 300, borderRadius: 25, marginTop: 15 }}
          />
          <TextInput
            numberOfLines={4}
            placeholder="Description"
            multiline
            onChangeText={(text) => setDescription(text)}
            value={description}
            style={{
              borderWidth: 1,
              width: "100%",
              height: 40,
              borderRadius: 10,
              marginTop: 25,
              borderColor: "#d3d3d3",
              paddingHorizontal: 20,
            }}
          />
          <TouchableOpacity
            onPress={() => {}}
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
              Publish
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
