import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "@expo/vector-icons/Ionicons";
import { moderateScale } from "react-native-size-matters";
import HomeScreen from "../gtak/screens/HomeScreen";
import ProfileScreen from "../gtak/screens/ProfileScreen";
import UploadScreen from "../gtak/screens/UploadScreen";
import SearchScreen from "../gtak/screens/SearchScreen";

export default function GtakTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#062743",
        inactiveTintColor: "#9ea9b3",
        tabStyle: {
          marginVertical: moderateScale(10),
        },
        showLabels: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="home-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="people-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={UploadScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="add-circle-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
