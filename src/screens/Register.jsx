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
import IonIcons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";

const Register = () => {
  const navigation = useNavigation();

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
        <TextInput style={styles.inputStyle} placeholder="Username" />
      </View>
      <View style={styles.inputContainer}>
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
      <View style={styles.inputContainer}>
        <Entypo
          name="email"
          size={24}
          color={"#9a9a9a"}
          style={styles.inputIcon}
        />
        <TextInput style={styles.inputStyle} placeholder="Email" />
      </View>
      <View style={styles.inputContainer}>
        <IonIcons
          name="call"
          size={24}
          color={"#9a9a9a"}
          style={styles.inputIcon}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Mobile"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.registerButtonContainer}>
        <Text style={styles.registerText}>Create</Text>
        <LinearGradient
          // Button Linear Gradient
          colors={["#f97794", "#623aa2"]}
          style={styles.buttonLinearGradient}
        >
          <IonIcons name="arrow-forward" size={24} color={"white"} />
        </LinearGradient>
      </View>
      <View style={styles.footerSocialMediaContainer}>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.signUpFooterText}>
            Or create account using soccial media
          </Text>

          <View style={styles.socialMediaContainer}>
            <Entypo
              name="facebook-with-circle"
              size={30}
              color={"blue"}
              style={styles.socialIcon}
            />
            <AntDesign
              name="google"
              size={30}
              color="blue"
              style={styles.socialIcon}
            />

            <Entypo
              name="twitter-with-circle"
              size={30}
              color={"blue"}
              style={styles.socialIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
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
    justifyContent: "flex-end",
  },
  registerText: {
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
});

export default Register;
