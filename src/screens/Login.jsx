import React, { Component } from "react";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import IonIcons from "@expo/vector-icons/Ionicons";
import { login } from "../ReduxTool/authSlice";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";

const Login = () => {
  const navigation = useNavigation();

  const user = useSelector((state) => state.auth);

  console.log(user, "I'm current user");

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ name: "lokendra24" }));
    navigation.navigate("Home");
  };

  handleRegister = () => {
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
        <IonIcons
          name="person"
          size={24}
          color={"#9a9a9a"}
          style={styles.inputIcon}
        />
        <TextInput style={styles.inputStyle} placeholder="Email" />
      </View>
      <View style={styles.inputPassContainer}>
        <Entypo
          name="lock"
          size={24}
          color={"#9a9a9a"}
          style={styles.inputIcon}
        />

        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          secureTextEntry
        />
      </View>
      <Text style={styles.forgotPassText}>Forgot Your Password?</Text>
      <View style={styles.signInButtonContainer}>
        <Text style={styles.signInText}>Sign in</Text>
        <LinearGradient
          // Button Linear Gradient
          colors={["#f97794", "#623aa2"]}
          style={styles.buttonLinearGradient}
        >
          <IonIcons name="arrow-forward" size={24} color={"white"} />
        </LinearGradient>
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
    color: "#BEBEBE",
    width: "90%",
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
});

export default Login;
