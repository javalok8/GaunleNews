import React from "react";
import { createStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import SplashScreen from "../screens/SplashScreen";
import NewsDetail from "../screens/NewsDetail";
import CategoryList from "../screens/CategoryList";
import About from "../screens/About";

export default function MainStack() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SplashScreen"
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Tab" component={Tabs} />

      <Stack.Screen name="NewsDetail" component={NewsDetail} />
      <Stack.Screen name="CategoryList" component={CategoryList} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}
