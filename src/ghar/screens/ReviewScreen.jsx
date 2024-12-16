import { View, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, Input, Button } from "@ui-kitten/components";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useTheme } from "@ui-kitten/components";
import TouchableStarsContainer from "../components/TouchableStarsContainer";
import { useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ReviewScreen({ route }) {
  const { top: safeTop } = useSafeAreaInsets();
  const theme = useTheme();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} />
        </TouchableOpacity>
      ),
      title: "",
    });
  }, []);

  // Validation Schema using Yup
  const validationSchema = yup.object().shape({
    stars: yup
      .number()
      .min(1, "Stars must be at least 1")
      .max(5, "Stars cannot exceed 5")
      .required("Stars are required"),
    title: yup
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(50, "Title cannot exceed 50 characters")
      .required("Title is required"),
    body: yup
      .string()
      .min(10, "Body must be at least 10 characters")
      .required("Body is required"),
  });

  // Submit handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post(
        "http://your-backend-url/api/submit",
        values
      );
      alert("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Failed to submit form. Please try again.");
    }
  };

  return (
    <KeyboardAwareScrollView bounces={false}>
      <View style={styles.container}>
        <Text category={"s1"} style={styles.header}>
          Write a Review for {route.params.propertyName}
        </Text>
        <Formik
          initialValues={{
            title: "",
            body: "",
            stars: 5,
          }}
          validationSchema={yup.object().shape({
            title: yup.string().required("Required"),
            body: yup.string().min(50).required("Required"),
            stars: yup.number().min(1).max(5).required("Required"),
          })}
          onSubmit={(values) => {
            const createReviewObj = {
              body: values.body,
              stars: values.stars,
              title: values.title,
              userID: user.ID,
            };
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
          }) => {
            return (
              <>
                <TouchableStarsContainer
                  field="stars"
                  stars={values.stars}
                  setStars={setFieldValue}
                  style={styles.defaultMarginTop}
                />

                <Input
                  label={"Title"}
                  onChangeText={handleChange("title")}
                  onBlur={() => setFieldTouched("title")}
                  caption={
                    touched.title && errors.title ? errors.title : undefined
                  }
                  status={touched.title && errors.title ? "danger" : "basic"}
                  style={styles.defaultMarginTop}
                />

                <Input
                  value={values.body}
                  onChangeText={handleChange("body")}
                  label="Your Review"
                  multiline
                  numberOfLines={10}
                  onBlur={() => setFieldTouched("body")}
                  textAlignVertical="top"
                  caption={
                    touched.body && errors.body
                      ? errors.body
                      : values.body.length < 50
                      ? "50 character minimum"
                      : undefined
                  }
                  placeholder="Say something nice, or not ..."
                  status={touched.body && errors.body ? "danger" : "basic"}
                  style={[styles.defaultMarginTop, { height: 150 }]}
                />

                <View
                  style={[styles.buttonContainer, { flexDirection: "row" }]}
                >
                  <Button
                    appearance={"ghost"}
                    style={[styles.cancelButton, styles.button]}
                    onPress={navigation.goBack}
                  >
                    Cancel
                  </Button>
                  <Button style={styles.button} onPress={() => handleSubmit()}>
                    Submit
                  </Button>
                </View>
              </>
            );
          }}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
  },
  header: {
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    marginVertical: 20,
  },
  bodyInput: {
    height: 200, // Increase the height
    textAlignVertical: "top", // Align text to the top
    padding: 10, // Add padding for better UX
    borderWidth: 1, // Optional: Add a border for clarity
    borderRadius: 8, // Optional: Add rounded corners
    borderColor: "#d3d3d3", // Optional: Customize the border color
    backgroundColor: "#f9f9f9", // Optional: Add a subtle background color
  },
  defaultMarginTop: { marginTop: 10 },
  buttonContainer: { justifyContent: "space-between", marginTop: 25 },
  button: {
    width: "47%",
  },
  cancelButton: { borderColor: "#427B01" },
});
