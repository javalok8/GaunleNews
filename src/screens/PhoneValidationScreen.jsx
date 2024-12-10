import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import axios from "axios";

export default function PhoneValidationScreen({ navigation }) {
  const [phone, setPhone] = useState("");

  const handleValidate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/validate-phone",
        { phone }
      );
      if (response.data.success) {
        navigation.navigate("ResetPassword", { userId: response.data.userId });
      } else {
        alert("Invalid phone number");
      }
    } catch (error) {
      alert("Error validating phone number");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Validate Phone Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your phone number"
        value={phone}
        onChangeText={setPhone}
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
