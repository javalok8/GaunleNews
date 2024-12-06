import React, { Component, useState, useEffect } from "react";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import IonIcons from "@expo/vector-icons/Ionicons";
import { login } from "../ReduxTool/authSlice";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
//for vibrate button
import * as Haptics from "expo-haptics";
//for api connection
import axios from "axios";
//for locally store key-value pair data
import { saveData } from "../utils/storageUtils";

const Login = () => {
  const navigation = useNavigation();

  /**
   *
   * ============================ CODE FOR VALIDATION FIELDS ===============================
   *
   */
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    // Name Validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    }

    // Password Validation
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
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Clear error for field on edit
  };
  /**
   * ============================VALIDATION CODE ENDED HERE==============================
   */

  //for toogle password eye icon
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureTextEntry = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setSecureTextEntry(!secureTextEntry);
  };

  /**
   *
   * =================================CODE FOR REDUX TOOLKIT FOR STATE MANAGMENT ================================
   *
   */
  const user = useSelector((state) => state.auth);
  console.log(user, "I'm current user");
  const dispatch = useDispatch();
  const handleLoginRedux = () => {
    dispatch(login({ name: "lokendra24" }));
    navigation.navigate("Home");
  };
  /**
   *
   * ====================== CODE FOR REDUX TOOLKIT FOR STATE MANAGMENT ENDED HERE =================
   *
   */

  /**
   *
   * =================================CODE FOR API CONNECTION================================
   *
   */
  handleLoginApi = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (validate()) {
      email = form.email;
      password = form.password;
      try {
        const response = await axios.post(
          "http://192.168.1.74:3000/api/users/login",
          {
            email,
            password,
          }
        );
        console.log("====response data====" + response.status);
        if (response.status === 201) {
          await saveData("email", email);
          await saveData("password", password);
          Alert.alert("Logged In", "Logged In Successfully!");
          navigation.navigate("Home");
        } else {
          Alert.alert("Error", "Register Failed!");
        }
      } catch (error) {
        console.error(error);
      }
    } else if (response.status === 401) {
      Alert.alert(" Error", " Invalid email or password ");
    }
  };
  /**
   *
   * =================================CODE FOR API CONNECTION ENDED================================
   *
   */

  /**
   *
   * =================================CODE FOR FORGOT PASSWORD ================================
   *
   */
  const handleForgotPassword = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert("Forgot Password", "Forgot Password!");
    navigation.navigate("ForgotPasswordModal");
  };
  /**
   *
   * =================================CODE FOR FORGOT PASSWORD ENDED ================================
   *
   */

  handleRegister = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImageStyle}
        />
      </View>
      <View style={styles.textLogoContainer}>
        <Text style={styles.textLogoStyle}>गाउँले</Text>
      </View>
      <View>
        <Text style={styles.signInTextHeader}>Sign in to Your Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <Entypo
          name="email"
          size={24}
          color="#9a9a9a"
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.inputStyle, errors.email && styles.errorBorder]}
          value={form.email}
          placeholder="Email"
          onChangeText={(value) => handleChange("email", value)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.inputPassContainer}>
        <Entypo
          name="lock"
          size={24}
          color="#9a9a9a"
          style={styles.inputIcon}
        />

        <TextInput
          style={[styles.inputStyle, errors.password && styles.errorBorder]}
          value={form.password}
          placeholder="Password"
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry={secureTextEntry}
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
      <Pressable onPress={handleForgotPassword}>
        <Text style={styles.forgotPassText}>Forgot Your Password ?</Text>
      </Pressable>
      <View style={styles.signInButtonContainer}>
        <Text style={styles.signInText}>Sign in</Text>
        <Pressable onPress={handleLoginApi}>
          <LinearGradient
            // Button Linear Gradient
            colors={["#f97794", "#623aa2"]}
            style={styles.buttonLinearGradient}
          >
            <IonIcons name="arrow-forward" size={24} color={"white"} />
          </LinearGradient>
        </Pressable>
      </View>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.signUpFooterText}>
          Don't have an account?
          <Text
            style={{
              textDecorationColor: "blue",
              textDecorationLine: "underline",
            }}
          >
            Create
          </Text>
        </Text>
      </TouchableOpacity>
      <View style={styles.footerImageContainer}>
        <ImageBackground
          source={require("../assets/buttomVector.png")}
          style={styles.bottomImageStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5f5",
    position: "relative",
  },
  imageContainer: {},
  topImageStyle: {
    width: "100%",
    height: 130,
  },
  textLogoContainer: {},
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
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: "center",
    height: 50,
  },
  inputStyle: {
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    marginRight: 5,
  },
  eyeIcon: {
    marginRight: 15,
    marginLeft: 5,
  },
  inputPassContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: "center",
    height: 50,
  },
  inputPassStyle: {
    flex: 1,
  },
  inputPassIcon: {
    marginLeft: 15,
    marginRight: 5,
  },
  forgotPassText: {
    fontSize: 15,
    textAlign: "right",
    color: "blue",
    width: "90%",
    textDecorationColor: "blue",
  },
  signInButtonContainer: {
    flexDirection: "row",
    marginTop: 120,
    width: "90%",
    justifyContent: "flex-end",
  },
  signInText: {
    color: "#262626",
    fontSize: 25,
    fontWeight: "bold",
  },
  buttonLinearGradient: {
    height: 34,
    width: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  signUpFooterText: {
    fontSize: 15,
    textAlign: "center",
    color: "#262626",
    marginTop: 120,
  },
  footerImageContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  bottomImageStyle: {
    width: "450",
    height: 150,
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginRight: 10,
    fontSize: 12,
  },
});

export default Login;
