import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker"; // Import Image Picker
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";

const Register = () => {
  const [fontsLoaded, fontError] = useFonts({
    outfit: require("../../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../../assets/fonts/Outfit-Bold.ttf"),
  });

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  const { top: safeTop } = useSafeAreaInsets();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [image, setImage] = useState(null); // Store selected image
  const [errors, setErrors] = useState({});

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureTextEntry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setSecureTextEntry(!secureTextEntry);
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!image) {
      newErrors.image = "Profile picture is required";
      valid = false;
    }

    if (!form.name.trim()) {
      newErrors.name = "Username is required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
      valid = false;
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!form.phone || !phoneRegex.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const pickImage = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setErrors({ ...errors, image: "" }); // Clear error if selected
    }
  };

  const handleRegister = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (validate()) {
      try {
        let formData = new FormData();
        formData.append("name", form.name);
        formData.append("email", form.email);
        formData.append("password", form.password);
        formData.append("phoneNumber", form.phone);

        if (image) {
          formData.append("profileImage", {
            uri: image,
            name: "profile.jpg",
            type: "image/jpeg",
          });
        }

        const response = await axios.post(
          "http://192.168.1.74:3000/api/users/register",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          Alert.alert("Success", "Registered Successfully!");
          navigation.navigate("Login");
        } else {
          Alert.alert("Error", "Register Failed!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { paddingTop: safeTop }]}>
        {/* Top Image */}
        <View>
          <Image
            source={require("../../assets/topVector.png")}
            style={styles.topImageStyle}
          />
        </View>

        <View style={styles.imagePickerContainer}>
          <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
            {image ? (
              <Image source={{ uri: image }} style={styles.profileImage} />
            ) : (
              <IonIcons name="camera" size={40} color="#ccc" />
            )}
          </TouchableOpacity>
          {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}
        </View>

        <Text
          style={[
            styles.registerTextHeader,
            { fontFamily: "outfit-bold", paddingBottom: 10 },
          ]}
        >
          Create Account
        </Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <IonIcons name="person" size={24} color={"#9a9a9a"} />
          <TextInput
            style={styles.inputStyle}
            value={form.name}
            placeholder="Username"
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <IonIcons name="mail" size={24} color={"#9a9a9a"} />
          <TextInput
            style={styles.inputStyle}
            value={form.email}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <IonIcons name="lock-closed" size={24} color={"#9a9a9a"} />
          <TextInput
            style={styles.inputStyle}
            value={form.password}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TouchableOpacity onPress={toggleSecureTextEntry}>
            <FontAwesome
              name={secureTextEntry ? "eye-slash" : "eye"}
              size={24}
              color="#9a9a9a"
              style={styles.eyeIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <IonIcons name="call" size={24} color={"#9a9a9a"} />
          <TextInput
            style={styles.inputStyle}
            value={form.phone}
            placeholder="Phone Number"
            keyboardType="numeric"
            onChangeText={(value) => setForm({ ...form, phone: value })}
          />
          {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
        </View>

        <View
          style={{
            flexDirection: "row",
            gap: 10,
            justifyContent: "space-between",
            borderRadius: 25,
            padding: 10,
          }}
        >
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Login")}
          >
            <LinearGradient
              colors={["#f97794", "#623aa2"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.registerButtonText}> Login</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <LinearGradient
              colors={["#f97794", "#623aa2"]}
              style={styles.buttonGradient}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Bottom Image */}
        <View style={styles.footerImageContainer}>
          <ImageBackground
            source={require("../../assets/bottomVector.png")}
            style={styles.bottomImageStyle}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow position
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur
    elevation: 5, // For Android shadow
  },
  topImageStyle: {
    width: "100%",
    height: 130,
    resizeMode: "cover", // Use 'cover' to make the image fill width and height
    borderRadius: 10, // Optional, to give rounded corners to the top image
  },
  footerImageContainer: {
    alignItems: "center",
    marginTop: 150,
  },
  bottomImageStyle: {
    width: "100%",
    height: 200, // Adjust this value based on your design
    resizeMode: "cover", // Ensure the image covers the area
    borderTopLeftRadius: 15, // Optional, for rounded corners
    borderTopRightRadius: 15, // Optional, for rounded corners
  },
  imagePickerContainer: { alignItems: "center", marginBottom: 20 },
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e1e1e1",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  profileImage: { width: "100%", height: "100%" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  inputStyle: { flex: 1, marginLeft: 10 },
  errorText: { color: "red", fontSize: 12, textAlign: "center" },
  registerButton: { marginTop: 20, alignSelf: "center" },
  buttonGradient: {
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: 200,
  },
  registerButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default Register;
