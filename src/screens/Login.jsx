import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../ReduxTool/authSlice";

const Login = () => {
  const navigation = useNavigation();

  const user = useSelector((state) => state.auth);

  console.log(user, "I'm current user");

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ name: "lokendra23" }));
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lokendra Login Screen</Text>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, marginBottom: 20 },
});

export default Login;
