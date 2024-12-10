import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function EmailValidationScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleValidate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/validate-email",
        { email }
      );
      if (response.data.success) {
        navigation.navigate("ResetPassword", { userId: response.data.userId });
      } else {
        alert("Invalid email");
      }
    } catch (error) {
      alert("Error validating email");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validate Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Validate" onPress={handleValidate} />
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
