import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "@expo/vector-icons/Ionicons";
import Home from "../screens/Home";
import Favorite from "../screens/Favorite";
import Discover from "../screens/Discover";
import Account from "../screens/Account";
import { moderateScale } from "react-native-size-matters";
import NewsDashboard from "../screens/NewsDashboard";

export default function Tabs() {
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
        component={Home}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="home-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Favorite"
        component={NewsDashboard}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="heart-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="search" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={Favorite}
        options={{
          tabBarIcon: ({ size, color }) => (
            <IonIcons name="person-sharp" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
