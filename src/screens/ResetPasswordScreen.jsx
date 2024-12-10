import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function ResetPasswordScreen({ route, navigation }) {
  const { userId } = route.params;
  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/reset-password",
        { userId, password }
      );
      if (response.data.success) {
        alert("Password reset successfully!");
        navigation.goBack();
      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      alert("Error resetting password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Reset Password" onPress={handleReset} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});
