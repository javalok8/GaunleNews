import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";

const About = () => {
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
      newErrors.name = "Name is required";
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

  const handleSubmit = () => {
    if (validate()) {
      Alert.alert("Form Submitted Successfully", JSON.stringify(form, null, 2));
    } else {
      Alert.alert("Validation Error", "Please fix the errors in the form.");
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "" }); // Clear error for field on edit
  };

  return (
    <View style={styles.container}>
      {/* Name Input */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={[styles.input, errors.name && styles.errorBorder]}
        value={form.name}
        onChangeText={(value) => handleChange("name", value)}
        placeholder="Enter your name"
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={[styles.input, errors.email && styles.errorBorder]}
        value={form.email}
        onChangeText={(value) => handleChange("email", value)}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.input, errors.password && styles.errorBorder]}
        value={form.password}
        onChangeText={(value) => handleChange("password", value)}
        placeholder="Enter your password"
        secureTextEntry
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      {/* Phone Input */}
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={[styles.input, errors.phone && styles.errorBorder]}
        value={form.phone}
        onChangeText={(value) => handleChange("phone", value)}
        placeholder="Enter your phone number"
        keyboardType="numeric"
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      {/* Submit Button */}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontSize: 12,
  },
});

export default About;
