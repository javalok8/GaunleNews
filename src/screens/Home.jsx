import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../ReduxTool/authSlice";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.auth);

  console.log(user, "I'm current user");

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout(null));
    navigation.replace("Login");
  };

  const navigateToCounter = () => {
    navigation.navigate("AppUi");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Lokendra Main Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Counter" onPress={navigateToCounter} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, marginBottom: 20 },
});

export default Home;
