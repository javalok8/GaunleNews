import React, { useState } from "react";
import {
  Image,
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
import * as Haptics from "expo-haptics";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { saveData } from "../../utils/storageUtils"; // Assuming this is the file to save data locally
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const Login = () => {
  const [fontsLoaded, fontError] = useFonts({
    outfit: require("../../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("../../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("../../assets/fonts/Outfit-Bold.ttf"),
  });

  const { top: safeTop } = useSafeAreaInsets();
  const navigation = useNavigation();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  //for toogle password eye icon
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureTextEntry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setSecureTextEntry(!secureTextEntry);
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    if (!form.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (field, value) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const handleLoginApi = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (validate()) {
      const { email, password } = form;
      try {
        const response = await axios.post(
          "http://192.168.1.74:3000/api/users/login",
          { email, password }
        );
        if (response.status === 201) {
          await saveData("email", email);
          await saveData("password", password);
          navigation.navigate("Tab");
        } else {
          Alert.alert("Error", "Login Failed!");
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleForgotPassword = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert("Forgot Password", "Forgot Password!");
    navigation.navigate("ForgotPasswordModal");
  };

  const handleRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("Register");
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.container, { paddingTop: safeTop }]}>
        {/* Top Image */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/topVector.png")}
            style={styles.topImageStyle}
          />
        </View>

        {/* Logo */}
        {/* <Text style={[styles.textLogoStyle, { fontFamily: "outfit-regular" }]}>
        गाउँले
      </Text> */}

        <Text
          style={[styles.signInTextHeader, { fontFamily: "outfit-medium" }]}
        >
          Sign in to Your Account
        </Text>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <IonIcons name="mail" size={24} color="#9a9a9a" />
          <TextInput
            style={[styles.inputStyle, errors.email && styles.errorBorder]}
            value={form.email}
            placeholder="Email"
            onChangeText={(value) => handleChange("email", value)}
            keyboardType="email-address"
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>

        <View style={styles.inputContainer}>
          <IonIcons name="lock-closed" size={24} color="#9a9a9a" />
          <TextInput
            style={[styles.inputStyle, errors.password && styles.errorBorder]}
            value={form.password}
            placeholder="Password"
            secureTextEntry={secureTextEntry}
            onChangeText={(value) => handleChange("password", value)}
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

        {/* Forgot Password */}
        <Pressable onPress={handleForgotPassword}>
          <Text style={styles.forgotPassText}>Forgot Your Password?</Text>
        </Pressable>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleLoginApi}>
          <LinearGradient
            colors={["#f97794", "#623aa2"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Register Link */}
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.signUpFooterText}>
            Don't have an account?
            <Text style={styles.createAccountText}> Create</Text>
          </Text>
        </TouchableOpacity>

        {/* Footer Image */}
        <View style={styles.footerImageContainer}>
          <Image
            source={require("../../assets/bottomVector.png")}
            style={styles.bottomImageStyle}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    // paddingHorizontal: 20,
  },
  topImageStyle: {
    width: "100%",
    height: 130,
    resizeMode: "cover",
    borderRadius: 10,
  },
  textLogoStyle: {
    fontSize: 60,
    fontWeight: "400",
    textAlign: "center",
    color: "#262626",
  },
  signInTextHeader: {
    fontSize: 20,
    textAlign: "center",
    color: "#262626",
    marginVertical: 60,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  inputStyle: { flex: 1, marginLeft: 10 },
  forgotPassText: {
    fontSize: 15,
    color: "blue",
    textAlign: "right",
    textDecorationLine: "underline",
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInButton: { alignSelf: "center", marginTop: 40 },
  signUpFooterText: {
    fontSize: 15,
    textAlign: "center",
    color: "#262626",
    marginTop: 20,
  },
  createAccountText: {
    color: "blue",
    textDecorationLine: "underline",
  },
  footerImageContainer: {
    alignItems: "center",
    marginTop: 200,
  },
  bottomImageStyle: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  errorBorder: { borderColor: "red" },
  errorText: {
    color: "red",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Login;
