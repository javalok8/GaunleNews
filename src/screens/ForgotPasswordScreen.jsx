import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { RadioButton } from "react-native-paper";

export default function ForgotPasswordScreen({ navigation }) {
  const [method, setMethod] = useState("email");

  const handleNext = () => {
    if (method === "email") {
      navigation.navigate("EmailValidation");
    } else {
      navigation.navigate("PhoneValidation");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <RadioButton.Group onValueChange={setMethod} value={method}>
        <View style={styles.radioOption}>
          <RadioButton value="email" />
          <Text>Email</Text>
        </View>
        <View style={styles.radioOption}>
          <RadioButton value="phone" />
          <Text>Phone</Text>
        </View>
      </RadioButton.Group>
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
});
