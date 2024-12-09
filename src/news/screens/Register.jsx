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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IonIcons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
//for vibrate button
import * as Haptics from "expo-haptics";
//for api connection
import axios from "axios";
//for locally store key-value pair data
import { saveData } from "../../utils/storageUtils";
//for redux toolkit and userSlice
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../ReduxTool/userSlice";

const Register = () => {
  const navigation = useNavigation();

  //for backend error message
  const [msg, setMsg] = useState("");

  /**
   *
   * ======================= CODE FOR VALIDATION FIELDS ================================
   *
   */
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    // Name Validation
    if (!form.name.trim()) {
      newErrors.name = "Username is required";
      valid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email address";
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

    // Phone Number Validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!form.phone) {
      newErrors.phone = "Phone number is required";
      valid = false;
    } else if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
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

  const backToLogin = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    navigation.navigate("Login");
  };

  /**
   * ============================ CODE FOR SOCIAL MEDIA CONNECTION ==============================
   */
  const handleSocialMediaConnection = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Alert.alert("Social Media Connection", "Social Media Connection!");
  };
  /**
   *
   * ============================ CODE FOR SOCIAL MEDIA CONNECTION ENDED ==============================
   */

  /**
   *
   * =================================CODE FOR API CONNECTION================================
   *
   */
  handleRegister = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (validate()) {
      name = form.name;
      email = form.email;
      password = form.password;
      phoneNumber = form.phone;
      try {
        const response = await axios.post(
          "http://192.168.1.74:3000/api/users/register",
          {
            name,
            email,
            password,
            phoneNumber,
          }
        );
        console.log("====response data====" + response.status);
        if (response.status === 201) {
          await saveData("email", email);
          await saveData("password", password);
          Alert.alert("Success", "Registered Successfully!");
          navigation.navigate("Login");
        } else {
          Alert.alert("Error", "Register Failed!");
        }
      } catch (error) {
        console.error(error);
      }
    } else if (response.status === 401) {
      Alert.alert(" Error", " User already exists ");
    } else if (response.status === 402) {
      Alert.alert(" Error", " Invalid user data ");
    }
  };
  /**
   *
   * =================================CODE FOR API CONNECTION ENDED================================
   *
   */

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("../../assets/topVector.png")}
          style={styles.topImageStyle}
        />
      </View>

      <View>
        <Text style={styles.registerTextHeader}>Create Account</Text>
      </View>
      <View style={styles.inputContainer}>
        <IonIcons
          name="person"
          size={24}
          color={"#9a9a9a"}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.inputStyle, errors.name && styles.errorBorder]}
          value={form.name}
          placeholder="Username"
          onChangeText={(value) => handleChange("name", value)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      </View>
      <View style={styles.inputContainer}>
        <Entypo
          name="lock"
          size={24}
          color={"#9a9a9a"}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.inputStyle, errors.password && styles.errorBorder]}
          value={form.password}
          placeholder="Password"
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
          autoCapitalize="none"
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        <Entypo
          name="email"
          size={24}
          color={"#9a9a9a"}
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
      <View style={styles.inputContainer}>
        <IonIcons
          name="call"
          size={24}
          color={"#9a9a9a"}
          style={styles.inputIcon}
        />
        <TextInput
          style={[styles.inputStyle, errors.phone && styles.errorBorder]}
          value={form.phone}
          placeholder="Mobile"
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(value) => handleChange("phone", value)}
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}
      </View>

      <View style={styles.registerButtonContainer}>
        <View style={styles.backButtonContainer}>
          <Pressable onPress={backToLogin}>
            <LinearGradient
              // Button Linear Gradient
              colors={["#f97794", "#623aa2"]}
              style={styles.buttonLinearGradientBack}
            >
              <IonIcons name="arrow-back" size={24} color={"white"} />
            </LinearGradient>
          </Pressable>
          <Text style={styles.registerText}>Back</Text>
        </View>
        <View style={styles.createButtonContainer}>
          <Text style={styles.registerText}>Create</Text>
          <Pressable onPress={handleRegister}>
            <LinearGradient
              // Button Linear Gradient
              colors={["#f97794", "#623aa2"]}
              style={styles.buttonLinearGradient}
            >
              <IonIcons name="arrow-forward" size={24} color={"white"} />
            </LinearGradient>
          </Pressable>
        </View>
      </View>
      <View style={styles.footerSocialMediaContainer}>
        <Text style={styles.signUpFooterText}>
          Or create account using social media
        </Text>

        <View style={styles.socialMediaContainer}>
          <TouchableOpacity onPress={handleSocialMediaConnection}>
            <Entypo
              name="facebook-with-circle"
              size={30}
              color="#9a9a9a"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSocialMediaConnection}>
            <AntDesign
              name="google"
              size={30}
              color="#9a9a9a"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSocialMediaConnection}>
            <Entypo
              name="twitter-with-circle"
              size={30}
              color="#9a9a9a"
              style={styles.socialIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.footerImageContainer}>
        <ImageBackground
          source={require("../../assets/bottomVector.png")}
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

  registerTextHeader: {
    fontSize: 20,
    textAlign: "center",
    color: "#262626",
    marginBottom: 30,
    fontWeight: "bold",
  },
  textLogoContainer: {},
  textLogoStyle: {
    fontSize: 70,
    fontWeight: "700",
    textAlign: "center",
    color: "#262626",
  },
  createAccountText: {
    fontSize: 30,
    textAlign: "center",
    color: "#262626",
    marginButtom: 30,
    fontWeight: "bold",
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
    color: "#BEBEBE",
    width: "30%",
  },
  registerButtonContainer: {
    flexDirection: "row",
    marginTop: 40,
    width: "90%",
    justifyContent: "space-between",
  },
  registerText: {
    marginTop: 5,
    color: "#262626",
    fontSize: 20,
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
  buttonLinearGradientBack: {
    height: 34,
    width: 56,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  signUpFooterText: {
    fontSize: 16,
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
    width: "500",
    height: 150,
  },
  footerSocialMediaContainer: {
    marginTop: 5,
  },
  socialMediaContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  socialIcon: {
    backgroundColor: "white",
    elevation: 10,
    margin: 10,
    padding: 10,
    borderRadius: 50,
  },
  backButtonContainer: {
    flexDirection: "row",
    marginLeft: 30,
  },
  createButtonContainer: {
    flexDirection: "row",
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

export default Register;
