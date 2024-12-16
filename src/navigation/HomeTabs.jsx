import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "@expo/vector-icons/Ionicons";
import { moderateScale } from "react-native-size-matters";
import SearchScreen from "../ghar/screens/MainScreen";
import SavedScreen from "../ghar/screens/SavedScreen";
import AccountScreen from "../ghar/screens/AccountScreen";
import { useTheme } from "@ui-kitten/components";

export default function HomeTabs() {
  const Tab = createBottomTabNavigator();
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        activeTintColor: "#062743",
        inactiveTintColor: "#9ea9b",
        tabBarActiveTintColor: theme["color-primary-500"],
        tabStyle: {
          marginVertical: moderateScale(10),
        },
        showLabels: false,
        headerShown: false,
      }}
    >
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
        name="Saved"
        component={SavedScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="heart-sharp" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="person-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
