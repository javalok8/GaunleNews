import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../ReduxTool/authSlice";
//for locally store key-value pair data
import { saveData, getData, clearData } from "../../utils/storageUtils";

const Home = ({ navigation }) => {
  const user = useSelector((state) => state.auth);

  console.log(user, "I'm current user");

  const dispatch = useDispatch();

  //clearing localStorage date
  const handleClearLocalData = async () => {
    await clearData();
  };

  const handleLogout = () => {
    handleClearLocalData();
    dispatch(logout(null));
    navigation.replace("Login");
  };

  const navigateToCounter = () => {
    navigation.navigate("AppUi");
  };
  const navigateToValidation = () => {
    navigation.navigate("About");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}> Lokendra Main Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Counter Lok" onPress={navigateToCounter} />
      <Button title="Validation Test" onPress={navigateToValidation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 24, marginBottom: 20 },
});

export default Home;
